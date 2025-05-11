let relationsdb = require("../DataAccessObject/relations-db");
let teamsdb = require("../DataAccessObject/teams-db");
let uuid_generator = require("../DataAccessObject/uuid-generator");
let relations_dto_class = require("../DataTransferObject/relationsDTO");
let teams_dto_class = require("../DataTransferObject/teamsDTO");
const con_pool = require("../DataAccessObject/database-connection");
const db_connection = con_pool.DatabaseConnection;
const EventEmitter = require("events");

class MakeMove {
	insertMove(piece_color, piece_id, file, rank) {
		if (piece_color == true) {
			piece_color = "white";
		} else {
			piece_color = "black";
		}

		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tourteam_player_match_id =
			"40fbd946-1841-4f25-a744-c9d2b86d2587";
		relation_dto.tourTeamState_id = "4c36a5cc-2861-4f4c-9674-b2bd6d4f4611";
		relation_dto.piece_color = piece_color;
		relation_dto.piece_name = piece_id;
		relation_dto.tile_file = file;
		relation_dto.tile_rank = rank;

		let move_insert_result = new relationsdb.TournamentMatchMoves(
			relation_dto
		).insertTournamentMatchMove();

		if (move_insert_result) {
			return true;
		} else {
			return false;
		}

		console.log(`Values Inserted thru TournamentMatchMoves !!!!`);
	}
}

class MatchWaitingListService {
	#tourid;
	#tourteamid;
	#playerid;
	#allot_status;
	get tourid() {
		return this.#tourid;
	}

	set tourteamid(value) {
		this.#tourteamid = value;
	}

	get tourteamid() {
		return this.#tourteamid;
	}

	set tourid(value) {
		this.#tourid = value;
	}

	// Getter and Setter for playerid
	get playerid() {
		return this.#playerid;
	}

	set playerid(value) {
		this.#playerid = value;
	}

	// Getter and Setter for allot_status
	get allot_status() {
		return this.#allot_status;
	}

	set allot_status(value) {
		this.#allot_status = value;
	}

	getWaitingList() {
		// let q = "select * from game.match_waiting_list";
		new relationsdb.MatchWaitingList().getWaitingList(this);
	}
	waitPlayer() {
		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tour_id = this.tourid;
		relation_dto.tourteam_id = this.tourteamid;
		relation_dto.player_id = this.playerid;
		relation_dto.allot_status = this.allot_status;

		new relationsdb.MatchWaitingList(relation_dto).insertWaitingPlayer(this);
	}
	deleteWaitingListRow() {
		let relation_dto = new relations_dto_class();
		relation_dto.player_id = this.playerid;
		new relationsdb.MatchWaitingList(relation_dto).deleteWaitingPlayerRow();
	}
}
class Teams {
	getTeamId(playerid) {
		let teams_dto = new teams_dto_class();
		teams_dto.team_playerid = playerid;
		new teamsdb.TeamsDb(teams_dto).getTeam(this);
	}
}
class TournamentTeamParticipation {
	#current_tourteam_id;
	#current_team_id;
	#current_player_id;
	#current_tour_id;

	get current_tourteam_id() {
		return this.#current_tourteam_id;
	}
	set current_tourteam_id(tourteam_id) {
		this.#current_tourteam_id = tourteam_id;
	}
	get current_team_id() {
		return this.#current_team_id;
	}
	set current_team_id(team_id) {
		this.#current_team_id = team_id;
	}
	get current_player_id() {
		return this.#current_player_id;
	}
	set current_player_id(player_id) {
		this.#current_player_id = player_id;
	}
	get current_tour_id() {
		return this.#current_tour_id;
	}
	set current_tour_id(tour_id) {
		this.#current_tour_id = tour_id;
	}
	CallToAddOpenTourTeamPlayer() {
		// Purpose : add tourteamstate when it is one player open tournament game.
		// this player's team name is equal to username.
		let tt_player = new TournamentTeamPlayers();
		tt_player.tourteam_id = this.current_tourteam_id;
		tt_player.team_id = this.current_team_id;
		tt_player.getPlayeridAndInsertTTPlayer();
	}
	addTeam() {
		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tour_id = this.current_tour_id;
		relation_dto.teams_id = this.current_team_id;

		this.current_tourteam_id = relation_dto.primary_id;
		this.current_team_id = relation_dto.teams_id;

		let insert_reply = new relationsdb.TournamentTeams(
			relation_dto
		).insertTournamentTeams(this);
	}
	get current_team_id() {
		return this.#current_team_id;
	}
	set current_team_id(team_id) {
		this.#current_team_id = team_id;
	}
	checkTourTeamPresence() {
		let relation_dto = new relations_dto_class();
		relation_dto.tour_id = this.current_tour_id;
		relation_dto.player_id = this.current_player_id;
		new relationsdb.TournamentTeams(relation_dto).tourTeamChecker(this);
	}
}
class TournamentTeamPlayers {
	#team_players_array;
	#team_id;
	#tourteam_id;
	#tt_player;

	set tt_player(tt_player) {
		this.#tt_player = tt_player;
	}
	get tt_player() {
		return this.#tt_player;
	}
	set team_id(team_id) {
		this.#team_id = team_id;
	}
	get team_id() {
		return this.#team_id;
	}

	set tourteam_id(tourteam_id) {
		this.#tourteam_id = tourteam_id;
	}
	get tourteam_id() {
		return this.#tourteam_id;
	}

	set team_players_array(team_players_array) {
		this.#team_players_array = team_players_array;
	}
	get team_players_array() {
		return this.#team_players_array;
	}

	getPlayeridAndInsertTTPlayer() {
		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tourteam_id = this.tourteam_id;
		// relation_dto.teams_id = this.team_id;

		let player_insert = new relationsdb.TournamentTeamState(relation_dto);
		player_insert.emitter = new EventEmitter();
		const insert_handler = () => {
			player_insert.insertTournamentTeamPlayer(this);
			player_insert.emitter.off("insert_tourTeamPlayer", insert_handler);
		};
		player_insert.emitter.on("insert_tourTeamPlayer", insert_handler);
		player_insert.getPlayeridAndInsertTourTeamPlayer(this.team_id);
	}
	getTourTeamStateId() {
		let relation_dto = new relations_dto_class();
		relation_dto.tourteam_id = this.tourteam_id;
		relation_dto.player_id = this.tt_player;
		new relationsdb.TournamentTeamState(relation_dto).getTourTeamStateID(this);
	}
	addOpenTourTeamPlayer() {
		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tourteam_id = this.tourteam_id;
		relation_dto.player_id = this.getTourTeam_player(this.team_id);

		new relationsdb.TournamentTeamState(
			relation_dto
		).insertTournamentTeamPlayer();
	}
	addTourTeamPlayers() {
		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tourteam_id = this.tourteam_id;
		for (let v of this.team_players_array) {
			// relation_dto.player_id = i;
			relation_dto.tourteamstate_rows_array.push([
				relation_dto.primary_id,
				relation_dto.tourteam_id,
				v,
			]);
		}
		new relationsdb.TournamentTeamState(
			relation_dto
		).insertTournamentTeamPlayer(this);
	}
}
class TournamentTeamMatch {
	#current_relations_dto;
	#current_matchid;
	#tourteam1;
	#tourteam2;
	#tourid;

	set current_relations_dto(current_relations_dto) {
		this.#current_relations_dto = current_relations_dto;
	}
	get current_relations_dto() {
		return this.#current_relations_dto;
	}

	set current_matchid(current_matchid) {
		this.#current_matchid = current_matchid;
	}
	get current_matchid() {
		return this.#current_matchid;
	}

	set tourteam1(tourteam1) {
		this.#tourteam1 = tourteam1;
	}
	get tourteam1() {
		return this.#tourteam1;
	}

	set tourteam2(tourteam2) {
		this.#tourteam2 = tourteam2;
	}
	get tourteam2() {
		return this.#tourteam2;
	}

	set tourid(tourid) {
		this.#tourid = tourid;
	}
	get tourid() {
		return this.#tourid;
	}
	// teamMatchInserted() {
	// 	this.#insert_flag = true;
	// }
	// callToAddPlayerMatch() {
	// 	let player_match = new TournamentPlayerMatch();
	// 	player_match.match_id = this.current_relations_dto.primary_id;
	// 	player_match.tourteam1 = this.current_relations_dto.tourteam1;
	// 	player_match.tourteam2 = this.current_relations_dto.tourteam2;
	// 	player_match.callForSchedulePlayerMatch();
	// }
	scheduleTeamMatch() {
		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tour_id = this.tourid;
		relation_dto.tourteam1 = this.tourteam1;
		relation_dto.tourteam2 = this.tourteam2;
		relation_dto.start_time = "2025-01-25 14:30:00";
		relation_dto.end_time = "2025-01-25 15:30:00";

		this.current_matchid = relation_dto.primary_id;

		new relationsdb.TournamentTeamMatches(
			relation_dto
		).insertTournamentTeamMatch(this);
	}
}

class TournamentPlayerMatch {
	#match_id;
	#tourteamstate1;
	#tourteamstate2;

	get match_id() {
		return this.#match_id;
	}
	set match_id(matchid) {
		this.#match_id = matchid;
	}

	get tourteamstate1() {
		return this.#tourteamstate1;
	}
	set tourteamstate1(tourteamstate1) {
		this.#tourteamstate1 = tourteamstate1;
	}
	get tourteamstate2() {
		return this.#tourteamstate2;
	}
	set tourteamstate2(tourteamstate2) {
		this.#tourteamstate2 = tourteamstate2;
	}

	getTourTeamState() {}
	// callForSchedulePlayerMatch() {
	// 	this.schedulePlayerMatch();
	// }
	schedulePlayerMatch() {
		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tourteam_match_id = this.match_id;
		relation_dto.tourTeamState_player1 = this.tourteamstate1;
		relation_dto.tourTeamState_player2 = this.tourteamstate2;
		relation_dto.start_time = "2025-04-03 14:30:00";
		relation_dto.time_period = 10;

		new relationsdb.TournamentTeamPlayerMatches(
			relation_dto
		).insertTournamentTeamPlayerMatch();
	}
}

class SocketMatch {
	scheduleSocketMatch() {
		let relation_dto = new relations_dto_class();
		relation_dto.primary_id = new uuid_generator().get_uuid;
		relation_dto.tourTeamState_player1 = "4c36a5cc-2861-4f4c-9674-b2bd6d4f4611";
		relation_dto.tourTeamState_player2 = "eafdfbe5-25ff-4b97-a448-d167422c828a";
		relation_dto.start_time = "2025-01-25 14:30:00";

		new relationsdb.SocketMatch(relation_dto).insertSocketMatch();
	}
}

class CurrentTime {
	getCurrentTime() {}
}

module.exports = {
	MakeMove,
	MatchWaitingListService,
	Teams,
	TournamentTeamMatch,
	TournamentPlayerMatch,
	SocketMatch,
	TournamentTeamParticipation,
	TournamentTeamPlayers,
};
