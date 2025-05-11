let uuid_generator = require("./uuid-generator");
let err_handler = require("./error-handling.js");
const con_pool = require("./database-connection.js");
const EventEmitter = require("events");

class MatchWaitingList {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}
	getWaitingList(caller_object) {
		let q = "select * from game.match_waiting_list";
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				if (err) throw err;
				if (result) {
					caller_object.emitter.emit("waiting_list", result);
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
	insertWaitingPlayer(caller_object) {
		let q = `insert into game.match_waiting_list values(?,?,?,?,?)`;
		let a_waiting_player = [
			this.#relationsdto.primary_id,
			this.#relationsdto.tour_id,
			this.#relationsdto.tourteam_id,
			this.#relationsdto.player_id,
			this.#relationsdto.allot_status,
		];
		try {
			con_pool.ConnectionPool.pool.query(q, a_waiting_player, (err, result) => {
				console.log(err);

				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#relationsdto,
						recall_method: "insertWaitingPlayer",
						table_name: "match_waiting_list",
						unique_key: [],
						unique_id: ["playerID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
					caller_object.emitter.emit("player_waiting");
				}
			});
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			// console.log(err);
		}
	}
	deleteWaitingPlayerRow() {
		let playerid = this.#relationsdto.player_id;
		let q = `delete from game.match_waiting_list where playerID = '${playerid}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				if (err) throw err;
				console.log(result);
			});
		} catch (err) {
			console.log(err);
		}
	}
}

class Games {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}
	getGame() {}
	insertGame() {}
	updateGame() {}
}
class TournamentTeams {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}
	tourTeamChecker(caller_object) {
		// let q = `select "true" from game.tourteams where tourID = "c7b5a26f-18bf-4328-8294-7bdb880f189d" and teamID = '2';`;
		let q = `select TourTeams_id from game.tourteams where tourID = "${
			this.#relationsdto.tour_id
		}" and teamID = (select team_id from game.teams where unique_name = (select username from game.player where player_id = '${
			this.#relationsdto.player_id
		}'));`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				if (err) throw err;
				// console.log(result);
				caller_object.emitter.emit("return_tourteamID", result);
			});
		} catch (err) {
			console.log(err);
		}
	}
	insertTournamentTeams(caller_object) {
		let q = "insert into game.tourteams values(?,?,?)";
		let a_tour_team = [
			this.#relationsdto.primary_id,
			this.#relationsdto.tour_id,
			this.#relationsdto.teams_id,
		];
		try {
			con_pool.ConnectionPool.pool.query(q, a_tour_team, (err, result) => {
				console.log(err);

				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#relationsdto,
						recall_method: "insertTournamentTeams",
						table_name: "tourteams",
						unique_key: [],
						unique_id: [],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
				caller_object.emitter.emit(
					"tour_team_inserted",
					this.#relationsdto.primary_id
				);
			});
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			// console.log(err);
		}
	}

	updateTournamentTeams() {
		let q = `update game.tourteams set ${
			this.#relationsdto.update_column_name
		} = '${this.#relationsdto.update_column_value}' where TourTeams_id = '${
			this.#relationsdto.update_id
		}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class TournamentTeamState {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}

	getPlayeridAndInsertTourTeamPlayer(team_id) {
		// let q = `select player_id from game.player where username = (select unique_name from game.teams where team_id = '${team_id}')`;
		q = `select playerID from game.teamstate where teamsID = '${team_id}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				if (err) throw err;
				console.log(result);
				this.#relationsdto.player_id = result[0].player_id;

				this.emitter.emit("insert_tourTeamPlayer");
			});
		} catch (err) {
			console.log(err);
		}
	}

	getTourTeamStateID(caller_object) {
		let q = `select TourTeamState_id from game.tourteamstate where tourteamID = "${
			this.#relationsdto.tourteam_id
		}" and playerID = "${this.#relationsdto.player_id}"`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				if (err) throw err;
				console.log("result ---- ", result);
				caller_object.emitter.emit("return_tourteamstateID", result);
			});
		} catch (err) {
			console.log(err);
		}
	}
	insertTournamentTeamPlayer(caller_object) {
		// reply_object belongs to TournamentTeamPlayers class in service layer.
		// let q = "insert into game.tourteamstate values(?,?,?)";
		let q =
			"insert into game.tourteamstate (TourTeamState_id, tourteamID, playerID) values ?";
		// let a_tour_team_player = [
		// 	this.#relationsdto.primary_id,
		// 	this.#relationsdto.tourteam_id,
		// 	this.#relationsdto.player_id,
		// ];
		console.log("tourteamstateid --- ", this.#relationsdto.primary_id);
		console.log("tourteam_id --- ", this.#relationsdto.tourteam_id);
		console.log("array ----- ", this.#relationsdto.tourteamstate_rows_array);
		try {
			con_pool.ConnectionPool.pool.query(
				q,
				[this.#relationsdto.tourteamstate_rows_array],
				(err, result) => {
					console.log(err);

					if (err) {
						let dboperation_data = {
							dao_instance: this,
							dto_object: this.#relationsdto,
							recall_method: "insertTournamentTeamPlayer",
							table_name: "tourteamstate",
							unique_key: [],
							unique_id: [],
						};
						new err_handler.ErrorManager(
							err,
							dboperation_data
						).errorIdentifier();
					}
					console.log("result aaaaayyyyaaaaa ------- ", result);
					if (result) {
						// this.#con.end();
						caller_object.emitter.emit(
							"tour_team_state_inserted",
							this.#relationsdto.tourteamstate_rows_array
						);
					}
				}
			);
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			// console.log(err);
		}
	}

	updateTournamentTeamPlayer() {
		let q = `update game.tourteamstate set ${
			this.#relationsdto.update_column_name
		} = '${this.#relationsdto.update_column_value}' where TourTeamState_id = '${
			this.#relationsdto.update_id
		}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class TournamentTeamMatches {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}
	getTourTeamAndInsertTourTeamMatch() {}
	insertTournamentTeamMatch(caller_object) {
		let q = "insert into game.tourteam_matches values(?,?,?,?,?,?)";
		let a_tour_team_match = [
			this.#relationsdto.primary_id,
			this.#relationsdto.tour_id,
			this.#relationsdto.tourteam1,
			this.#relationsdto.tourteam2,
			this.#relationsdto.start_time,
			this.#relationsdto.end_time,
		];
		try {
			con_pool.ConnectionPool.pool.query(
				q,
				a_tour_team_match,
				(err, result) => {
					console.log(err);

					if (err) {
						let dboperation_data = {
							dao_instance: this,
							dto_object: this.#relationsdto,
							recall_method: "insertTournamentTeamMatch",
							table_name: "tourteam_matches",
							unique_key: [],
							unique_id: [],
						};
						new err_handler.ErrorManager(
							err,
							dboperation_data
						).errorIdentifier();
					}
					console.log("result aaaaayyyyaaaaa ------- ", result);
					if (result) {
						// this.#con.end();
					}
					caller_object.emitter.emit(
						"tour_team_match_inserted",
						this.#relationsdto.primary_id
					);
				}
			);
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			// console.log(err);
		}
	}

	updateTournamentTeamMatch() {
		let q = `update game.tourteam_matches set ${
			this.#relationsdto.update_column_name
		} = '${
			this.#relationsdto.update_column_value
		}' where TourTeamMatches_id = '${this.#relationsdto.update_id}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class TournamentTeamMatchDetails {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}
	insertTournamentTeamMatchDetails() {
		let q = "insert into game.tourteam_match_details values(?,?,?,?,?)";
		let a_tour_team = [
			this.#relationsdto.primary_id,
			this.#relationsdto.tourteam_match_id,
			this.#relationsdto.draw,
			this.#relationsdto.winner_team,
			this.#relationsdto.losing_team,
		];
		try {
			con_pool.ConnectionPool.pool.query(q, a_tour_team, (err, result) => {
				console.log(err);

				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#relationsdto,
						recall_method: "insertTournamentTeamMatchDetails",
						table_name: "tourteam_match_details",
						unique_key: [],
						unique_id: ["tourteam_matchID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			// console.log(err);
		}
	}

	updateTournamentTeamMatchDetails() {
		let q = `update game.tourteam_match_details set ${
			this.#relationsdto.update_column_name
		} = '${
			this.#relationsdto.update_column_value
		}' where tourteam_match_details_id = '${this.#relationsdto.update_id}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				// console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}

class SocketMatch {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}
	insertSocketMatch() {
		let q = "insert into game.socket_matches values(?,?,?,?)";
		let a_socket_match = [
			this.#relationsdto.primary_id,
			this.#relationsdto.tourTeamState_player1,
			this.#relationsdto.tourTeamState_player2,
			this.#relationsdto.start_time,
		];
		try {
			con_pool.ConnectionPool.pool.query(q, a_socket_match, (err, result) => {
				console.log(err);

				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#relationsdto,
						recall_method: "insertSocketMatch",
						table_name: "socket_matches",
						unique_key: [],
						unique_id: [],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			// console.log(err);
		}
	}
	updateSocketMatch() {
		let q = `update game.socket_matches set ${
			this.#relationsdto.update_column_name
		} = '${this.#relationsdto.update_column_value}' where socket_match_id = '${
			this.#relationsdto.update_id
		}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}

class TournamentTeamPlayerMatches {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}

	insertTournamentTeamPlayerMatch() {
		let q = "insert into game.tourteam_player_matches values(?,?,?,?,?,?)";
		let a_tour_team_player_match = [
			this.#relationsdto.primary_id,
			this.#relationsdto.tourteam_match_id,
			this.#relationsdto.tourTeamState_player1,
			this.#relationsdto.tourTeamState_player2,
			this.#relationsdto.start_time,
			this.#relationsdto.time_period,
		];
		try {
			con_pool.ConnectionPool.pool.query(
				q,
				a_tour_team_player_match,
				(err, result) => {
					console.log(err);

					if (err) {
						let dboperation_data = {
							dao_instance: this,
							dto_object: this.#relationsdto,
							recall_method: "insertTournamentTeamPlayerMatch",
							table_name: "tourteam_player_matches",
							unique_key: [],
							unique_id: [],
						};
						new err_handler.ErrorManager(
							err,
							dboperation_data
						).errorIdentifier();
					}
					console.log("result aaaaayyyyaaaaa ------- ", result);
					if (result) {
						// this.#con.end();
					}
				}
			);
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			console.log(err);
		}
	}

	updateTournamentTeamPlayerMatch() {
		let q = `update game.tourteam_player_matches set ${
			this.#relationsdto.update_column_name
		} = '${
			this.#relationsdto.update_column_value
		}' where tourteam_player_matches_id = '${this.#relationsdto.update_id}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class TournamentTeamPlayerMatchDetails {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}
	insertTournamentTeamPlayerMatchDetails() {
		let q =
			"insert into game.tourteam_player_match_details values(?,?,?,?,?,?,?,?,?)";
		let a_tour_team_player_match_details = [
			this.#relationsdto.primary_id,
			this.#relationsdto.tourteam_player_match_id,
			this.#relationsdto.white_pieces_player,
			this.#relationsdto.black_pieces_player,
			this.#relationsdto.draw,
			this.#relationsdto.winning_player,
			this.#relationsdto.losing_player,
			this.#relationsdto.playing_start_time,
			this.#relationsdto.playing_end_time,
		];
		try {
			con_pool.ConnectionPool.pool.query(
				q,
				a_tour_team_player_match_details,
				(err, result) => {
					console.log(err);

					if (err) {
						let dboperation_data = {
							dao_instance: this,
							dto_object: this.#relationsdto,
							recall_method: "insertTournamentTeamPlayerMatchDetails",
							table_name: "tourteam_player_match_details",
							unique_key: [],
							unique_id: ["tourteam_player_matchID"],
						};
						new err_handler.ErrorManager(
							err,
							dboperation_data
						).errorIdentifier();
					}
					console.log("result aaaaayyyyaaaaa ------- ", result);
					if (result) {
						// this.#con.end();
					}
				}
			);
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			// console.log(err);
		}
	}

	updateTournamentTeamPlayerMatch() {
		let q = `update game.tourteam_player_match_details set ${
			this.#relationsdto.update_column_name
		} = '${
			this.#relationsdto.update_column_value
		}' where tourteam_player_matchID = '${this.#relationsdto.update_id}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class TournamentMatchMoves {
	#relationsdto;
	constructor(relationsdto_object) {
		this.#relationsdto = relationsdto_object;
	}
	insertTournamentMatchMove() {
		let q = "insert into game.tournament_match_moves values(?,?,?,?,?,?,?)";
		let a_tour_match_move = [
			this.#relationsdto.primary_id,
			this.#relationsdto.tourteam_player_match_id,
			this.#relationsdto.tourTeamState_id,
			this.#relationsdto.piece_color,
			this.#relationsdto.piece_name,
			this.#relationsdto.tile_file,
			this.#relationsdto.tile_rank,
		];
		console.log("a_tour_match_move ---- ", a_tour_match_move);

		try {
			con_pool.ConnectionPool.pool.query(
				q,
				a_tour_match_move,
				(err, result) => {
					console.log(err);

					if (err) {
						let dboperation_data = {
							dao_instance: this,
							dto_object: this.#relationsdto,
							recall_method: "insertTournamentMatchMove",
							table_name: "tournament_match_moves",
							unique_key: [],
							unique_id: [],
						};
						new err_handler.ErrorManager(
							err,
							dboperation_data
						).errorIdentifier();
					}
					console.log("result aaaaayyyyaaaaa ------- ", result);
					if (result) {
						return true;
						// this.#con.end();
					}
				}
			);
		} catch (err) {
			console.log(`Erroorrr haiiiii`);
			console.log(err);
		}
	}

	updateTournamentMatchMove() {
		let q = `update game.tournament_match_moves set ${
			this.#relationsdto.update_column_name
		} = '${
			this.#relationsdto.update_column_value
		}' where tournament_match_moves_id = '${this.#relationsdto.update_id}'`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					// this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = {
	MatchWaitingList,
	TournamentTeams,
	TournamentTeamState,
	TournamentTeamMatches,
	TournamentTeamMatchDetails,
	TournamentTeamPlayerMatches,
	TournamentTeamPlayerMatchDetails,
	TournamentMatchMoves,
};
