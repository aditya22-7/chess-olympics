var express = require("express");
const { Server } = require("socket.io");
const con_pool = require("./DataAccessObject/database-connection");
const Manager = require("./GameBackend/manager");
let team_p = require("./Service/services");
let { waiting_list } = require("./GameBackend/waiting-list");
const EventEmitter = require("events");

var app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http");
const { clearTimeout } = require("timers");
const s = http.createServer(app);
const io = new Server(s);

// io.on("connection", (socket) => {
// 	socket.on("board_first_render", () => {});
// 	Manager.init(socket);
// });

s.listen(8081, function () {
	console.log("ExpressJS is running on port 8081");
});

con_pool.ConnectionPool.setConnectionPool();

class IOServerSetup {
	#io;
	constructor(io) {
		this.#io = io;
	}
	get io() {
		return this.#io;
	}
	connectionEvent() {
		this.io.on("connection", (socket) => {
			Manager.init(socket);
			// Should be the instance corresponding game created and stored in LiveGame Datastructure
			socket.player_id = arr[c++];
			giveValues(socket);
			let opm = new OpenPlayMatches(socket);
			opm.current_tourid = "c7b5a26f-18bf-4328-8294-7bdb880f189d";
			opm.checkTeamPresence();
			opm.playService(socket);
		});
	}
}
let c = 0;
let arr = ["3030", "4040", "1010", "2020"];
let arr1 = ["3030teams", "4040teams", "1010teams", "2020teams"];
let count1 = 0;
let count2 = 0;
function giveValues(socket) {
	socket.on("give_me_values", () => {
		socket.emit("Server_giving_values", arr[count1++], arr1[count2++]);
		// socket.player_id = arr[count1];
		// count1++;
		// count2++;
		// socket.player_id = arr[count1];
	});
}

class OpenPlayMatches {
	#socket_object;
	#tt_participate;
	#tt_player;
	#teammatch;
	#player_match;
	#current_playerid;
	#current_tourid;
	#current_teamid;
	#current_tourteamid;
	#current_ttsid;

	constructor(socket_object) {
		this.#socket_object = socket_object;
	}

	get current_playerid() {
		return this.#current_playerid;
	}
	set current_playerid(playerid) {
		this.#current_playerid = playerid;
	}

	get current_teamid() {
		return this.#current_teamid;
	}
	set current_teamid(teamid) {
		this.#current_teamid = teamid;
	}

	get current_tourteamid() {
		return this.#current_tourteamid;
	}
	set current_tourteamid(tourteamid) {
		this.#current_tourteamid = tourteamid;
	}

	get current_ttsid() {
		return this.#current_ttsid;
	}
	set current_ttsid(ttsid) {
		this.#current_ttsid = ttsid;
	}

	get current_tourid() {
		return this.#current_tourid;
	}
	set current_tourid(tourid) {
		this.#current_tourid = tourid;
	}
	
	get ttParticipate() {
		return this.#tt_participate;
	}
	set ttParticipate(value) {
		this.#tt_participate = value;
	}

	get ttPlayer() {
		return this.#tt_player;
	}
	set ttPlayer(value) {
		this.#tt_player = value;
	}

	get teamMatch() {
		return this.#teammatch;
	}
	set teamMatch(value) {
		this.#teammatch = value;
	}

	get playerMatch() {
		return this.#player_match;
	}
	set playerMatch(value) {
		this.#player_match = value;
	}

	makeTourTeam() {
		let tt_participate = new team_p.TournamentTeamParticipation();
		this.ttParticipate = tt_participate;
		tt_participate.emitter = new EventEmitter();
		const tourTeamInsertHandler = (tourteamid) => {
			this.#current_tourteamid = tourteamid;
			this.makeTourTeamState();
			tt_participate.emitter.off("tour_team_inserted", tourTeamInsertHandler);
		};
		tt_participate.emitter.on("tour_team_inserted", tourTeamInsertHandler);
		tt_participate.current_team_id = this.current_teamid;
		tt_participate.current_tour_id = this.current_tourid;
		tt_participate.addTeam();
		let tt_player = new team_p.TournamentTeamPlayers();
		this.ttPlayer = tt_player;
		tt_player.tourteam_id = tt_participate.current_tourteam_id;
		this.current_tourteamid = tt_participate.current_tourteam_id;
		tt_player.team_players_array = [this.#socket_object.player_id];
	}
	makeTourTeamState() {
		this.ttPlayer.emitter = new EventEmitter();
		const tourTeamStateInsertHandler = (tts_array) => {
			this.current_ttsid = tts_array[0][0];
			this.ttPlayer.tt_player = this.#socket_object.player_id;
			this.addToWaitingList();
			let match_object = this.makeMatch();
			if (match_object) {
				this.makeTourTeamMatch(match_object);
			}
			this.ttPlayer.emitter.off(
				"tour_team_state_inserted",
				tourTeamStateInsertHandler
			);
		};
		this.ttPlayer.emitter.on(
			"tour_team_state_inserted",
			tourTeamStateInsertHandler
		);
		this.ttPlayer.addTourTeamPlayers();
	}

	addToWaitingList() {
		waiting_list.push({
			playerid: this.#socket_object.player_id,
			tourteamid: this.current_tourteamid,
			tourteamstateid: this.current_ttsid,
			tourid: this.current_tourid,
		});
		console.log("Printing waiting list....\n", waiting_list);
	}
	removeFromWaitingList(match_object) {
		let new_waiting_list = waiting_list.filter(
			(obj) =>
				obj.playerid !== match_object.player1 &&
				obj.playerid !== match_object.player2
		);
		waiting_list = new_waiting_list;
	}
	makeMatch() {
		let match_object = null;
		let waiting_list_len = waiting_list.length;
		if (waiting_list_len > 1) {
			let match_making_wl = waiting_list.filter(
				(obj) => obj.playerid !== this.#socket_object.player_id
			);

			const randomIndex = Math.floor(Math.random() * match_making_wl.length);

			match_object = {
				player1: this.#socket_object.player_id,
				player2: match_making_wl[randomIndex].playerid,
				tourteam1: this.current_tourteamid,
				tourteam2: match_making_wl[randomIndex].tourteamid,
				tourteamstate1: this.current_ttsid,
				tourteamstate2: match_making_wl[randomIndex].tourteamstateid,
			};
			this.removeFromWaitingList(match_object);
		}
		return match_object;
	}

	makeTourTeamMatch(match_object) {
		let teammatch = new team_p.TournamentTeamMatch();
		teammatch.emitter = new EventEmitter();
		const tourTeamMatchInsertHandler = (matchid) => {
			this.makeTourTeamPlayerMatch(match_object, matchid);
			console.log("Team Match scheduled !!!!!");
			teammatch.emitter.off(
				"tour_team_match_inserted",
				tourTeamMatchInsertHandler
			);
		};
		teammatch.emitter.on(
			"tour_team_match_inserted",
			tourTeamMatchInsertHandler
		);
		teammatch.tourid = this.current_tourid;
		teammatch.tourteam1 = match_object.tourteam1;
		teammatch.tourteam2 = match_object.tourteam2;
		teammatch.scheduleTeamMatch();
	}
	makeTourTeamPlayerMatch(match_object, matchid) {
		let player_match = new team_p.TournamentPlayerMatch();
		player_match.match_id = matchid;
		player_match.tourteamstate1 = match_object.tourteamstate1;
		player_match.tourteamstate2 = match_object.tourteamstate2;
		player_match.schedulePlayerMatch();
	}
	getTourTeamState() {
		let tourteamstate_retrieve = new team_p.TournamentTeamPlayers();
		tourteamstate_retrieve.emitter = new EventEmitter();
		const getTourTeamStateId = (tts_id) => {
			console.log("tts_id ---- ", tts_id);
			this.current_ttsid = tts_id[0].TourTeamState_id;
			this.addToWaitingList();
			let match_object = this.makeMatch();
			if (match_object) {
				this.makeTourTeamMatch(match_object);
			}
		};
		tourteamstate_retrieve.emitter.on(
			"return_tourteamstateID",
			getTourTeamStateId
		);
		tourteamstate_retrieve.tourteam_id = this.current_tourteamid;
		tourteamstate_retrieve.tt_player = this.#socket_object.player_id;
		tourteamstate_retrieve.getTourTeamStateId();
	}
	checkTourTeamPresence() {
		let tourteam_check = new team_p.TournamentTeamParticipation();
		tourteam_check.emitter = new EventEmitter();
		const getTourTeamId = (tourteamid) => {
			console.log("tourteamid ---- ", tourteamid);
			if (tourteamid.length > 0) {
				this.current_tourteamid = tourteamid[0].TourTeams_id;
				this.getTourTeamState();
			} else {
				this.makeTourTeam();
			}
		};
		tourteam_check.emitter.on("return_tourteamID", getTourTeamId);
		tourteam_check.current_player_id = this.#socket_object.player_id;
		tourteam_check.current_tour_id = this.current_tourid;
		tourteam_check.checkTourTeamPresence();
	}
	checkTeamPresence() {
		let team = new team_p.Teams();
		team.t_emitter = new EventEmitter();
		const getTeamId = (teamid) => {
			if (teamid.length > 0) {
				this.current_teamid = teamid[0].team_id;
				console.log("teamid ---- ", teamid);
			} else {
				console.log("No such team exists !!!");
			}
		};
		team.t_emitter.on("return_teamID", getTeamId);
		team.getTeamId(this.#socket_object.player_id);
	}
	playService() {
		this.#socket_object.on("play-service", (playerid, teamid) => {
			this.current_playerid = playerid;
			this.current_teamid = teamid;

			this.checkTourTeamPresence();
			// this.makeTourTeam();
			// let teammatch = new team_p.TournamentTeamMatch();
			// teammatch.emitter = new EventEmitter();
			// const tourTeamMatchInsertHandler = () => {
			// 	player_match.schedulePlayerMatch();
			// 	teammatch.emitter.off(
			// 		"tour_team_match_inserted",
			// 		tourTeamMatchInsertHandler
			// 	);
			// };
			// teammatch.emitter.on(
			// 	"tour_team_match_inserted",
			// 	tourTeamMatchInsertHandler
			// );
			// teammatch.tourteam1 = "34173869-0c79-4d1d-b64a-06baf7c66f9f";
			// teammatch.tourteam2 = "32a6783c-ad41-4900-980a-1da2493d4ace";
			// teammatch.scheduleTeamMatch();
			// let player_match = new team_p.TournamentPlayerMatch();
			// player_match.match_id = teammatch.current_matchid;
			// player_match.tourteamstate1 = "1da5a130-defa-4e32-b24d-ec575a146d2a";
			// player_match.tourteamstate2 = "7ff72e1f-d94a-4349-aa16-470780325d5c";
		});
	}
}

class MatchMaker {}

new IOServerSetup(io).connectionEvent();
