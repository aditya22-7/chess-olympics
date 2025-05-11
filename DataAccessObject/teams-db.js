let uuid_generator = require("./uuid-generator");
let err_handler = require("./error-handling.js");
const con_pool = require("./database-connection.js");

class TeamsDb {
	#teamsdto;
	constructor(teamsdto_object) {
		this.#teamsdto = teamsdto_object;
	}
	getTeam(caller_object) {
		let q = `select team_id from game.teams where unique_name = (select username from game.player where player_id = '${
			this.#teamsdto.team_playerid
		}')`;
		try {
			con_pool.ConnectionPool.pool.query(q, (err, result) => {
				if (err) throw err;
				// console.log(result);
				caller_object.t_emitter.emit("return_teamID", result);
			});
		} catch (err) {
			console.log(err);
		}
	}
	insertTeams() {
		let q = "insert into game.teams values(?,?,?,?)";
		let a_team = [
			this.#teamsdto.primary_id,
			this.#teamsdto.unique_name,
			this.#teamsdto.team_name,
			this.#teamsdto.no_of_players,
		];
		try {
			con_pool.ConnectionPool.pool.query(q, a_team, (err, result) => {
				console.log(err);
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#teamsdto, // If reference of private variable is passed like this, it can be accessed
						// recall_method: this.insertTeams, // Outside guy can call insertTeams as this.insertTeams is the reference
						recall_method: "insertTeams", // Outside guy can call insertTeams as this["insertTeams"]
						table_name: "teams",
						unique_key: ["unique_name"],
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

	updateTeams() {
		let q = `update game.teams set ${this.#teamsdto.update_column_name} = '${
			this.#teamsdto.update_column_value
		}' where team_id = '${this.#teamsdto.update_player_id}'`;
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
class TeamHistoryDb {
	#teamsdto;
	constructor(con, teamsdto_object) {
		this.#teamsdto = teamsdto_object;
	}
	insertTeamHistory() {
		let q = "insert into game.team_history values(?,?,?)";
		let a_team_history = [
			this.#teamsdto.primary_id,
			this.#teamsdto.teamsid,
			this.#teamsdto.no_of_tournaments,
		];
		try {
			con_pool.ConnectionPool.pool.query(q, a_team_history, (err, result) => {
				// console.log(err);
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#teamsdto,
						recall_method: "insertTeamHistory",
						table_name: "team_history",
						unique_key: [],
						unique_id: ["teamID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
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

	updateTeamHistory() {
		let q = `update game.team_history set ${
			this.#teamsdto.update_column_name
		} = '${this.#teamsdto.update_column_value}' where teamID = '${
			this.#teamsdto.update_player_id
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
class TeamCriteriaDb {
	#teamsdto;
	constructor(con, teamsdto_object) {
		this.#teamsdto = teamsdto_object;
	}
	insertTeamCriteria() {
		let q = "insert into game.team_criteria values(?,?,?,?,?,?)";
		let a_team_criteria = [
			this.#teamsdto.primary_id,
			this.#teamsdto.teamsid,
			this.#teamsdto.minimum_ranking,
			this.#teamsdto.maximum_ranking,
			this.#teamsdto.minimum_players_number,
			this.#teamsdto.maximum_players_number,
		];
		try {
			con_pool.ConnectionPool.pool.query(q, a_team_criteria, (err, result) => {
				// console.log(err);
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#teamsdto,
						recall_method: "insertTeamCriteria",
						table_name: "team_criteria",
						unique_key: [],
						unique_id: ["teamID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
					// if (err.code === "ER_DUP_ENTRY") {
					//   const match = err.sqlMessage.match(/'([^']+)'$/);

					//   if (match[1] === "team_criteria.PRIMARY") {
					//     let new_uuid = new uuid_generator().get_uuid;
					//     this.#teamsdto.primary_id = new_uuid;
					//     this.insertTeamHistory();
					//   }
					//   if (match[1] === "team_criteria.teamID_UNIQUE") {
					//     console.log(
					//       `Criteria of teamsid ${this.#teamsdto.teamsid} aldready exists`
					//     );
					//   }
					// }
					// if (
					//   err.code === "ER_NO_REFERENCED_ROW_2" ||
					//   err.code === "ER_NO_REFERENCED_ROW"
					// ) {
					//   console.log(`teamsid ${this.#teamsdto.teamsid} doesn't exist`);
					// }
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

	updateTeamCriteria() {
		let q = `update game.team_criteria set ${
			this.#teamsdto.update_column_name
		} = '${this.#teamsdto.update_column_value}' where teamID = '${
			this.#teamsdto.update_player_id
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
class TeamStateDb {
	#teamsdto;
	constructor(con, teamsdto_object) {
		this.#teamsdto = teamsdto_object;
	}
	insertTeamState() {
		let q = "insert into game.teamstate values ?";
		// Here, I am telling service layer to give me ready made array with no. of arrays same as no. of players of team
		let a_team_state = this.#teamsdto.team_state;
		try {
			con_pool.ConnectionPool.pool.query(q, [a_team_state], (err, result) => {
				// console.log(err);
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#teamsdto,
						recall_method: "insertTeamState",
						table_name: "teamstate",
						unique_key: [],
						unique_id: [],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
					// if (err.code === "ER_DUP_ENTRY") {
					//   const match = err.sqlMessage.match(/'([^']+)'$/);

					//   if (match[1] === "teamstate.PRIMARY") {
					//     let new_uuid = new uuid_generator().get_uuid;
					//     this.#teamsdto.primary_id = new_uuid;
					//     this.insertTeamHistory();
					//   }
					//   if (match[1] === "teamstate.teamID_UNIQUE") {
					//     console.log(
					//       `Criteria of teamsid ${this.#teamsdto.teamsid} aldready exists`
					//     );
					//   }
					// }
					// if (
					//   err.code === "ER_NO_REFERENCED_ROW_2" ||
					//   err.code === "ER_NO_REFERENCED_ROW"
					// ) {
					//   console.log(`Player or team does not exist`);
					// }
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

	updateTeamState() {
		let q = `update game.teamstate set ${
			this.#teamsdto.update_column_name
		} = '${this.#teamsdto.update_column_value}' where teamState_id = '${
			this.#teamsdto.update_player_id
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

module.exports = {
	TeamsDb,
	TeamHistoryDb,
	TeamCriteriaDb,
	TeamStateDb,
};
