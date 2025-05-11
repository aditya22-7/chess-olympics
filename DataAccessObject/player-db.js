let uuid_generator = require("./uuid-generator");
let err_handler = require("./error-handling.js");

class PlayerDb {
	#con;
	#playerdto;
	constructor(con, playerdto_object) {
		this.#con = con;
		this.#playerdto = playerdto_object;
	}

	insertPlayer() {
		let q = "insert into game.player values (?,?,?,?,?)";
		let a_player = [
			this.#playerdto.primary_id,
			this.#playerdto.first_name,
			this.#playerdto.last_name,
			this.#playerdto.username,
			this.#playerdto.password,
		];
		try {
			this.#con.query(q, a_player, (err, result) => {
				// console.log(err);
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#playerdto,
						recall_method: "insertPlayer",
						table_name: "player",
						unique_key: ["username"],
						unique_id: [],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	updatePlayer() {
		let q = `update game.player set ${this.#playerdto.update_column_name} = '${
			this.#playerdto.update_column_value
		}' where player_id = '${this.#playerdto.update_player_id}'`;
		try {
			this.#con.query(q, (err, result) => {
				console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class PlayerContactDb {
	#con;
	#playerdto;
	constructor(con, playerdto_object) {
		this.#con = con;
		this.#playerdto = playerdto_object;
	}
	insertPlayerContact() {
		let q = "insert into game.player_contact values(?,?,?,?)";
		let a_playerContact = [
			this.#playerdto.primary_id,
			this.#playerdto.playerid,
			this.#playerdto.mobile_number,
			this.#playerdto.email,
		];

		try {
			this.#con.query(q, a_playerContact, (err, result) => {
				// console.log(err);
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#playerdto,
						recall_method: "insertPlayerContact",
						table_name: "player_contact",
						unique_key: ["mobile_number", "email"],
						unique_id: ["playerID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	updatePlayerContact() {
		// Validations required :
		// # Validation for correct email.
		// # also think of validation for correct phone number(maybe otp system required).

		let q = `update game.player_affiliation set ${
			this.#playerdto.update_column_name
		} = '${this.#playerdto.update_column_value}' where playerID = '${
			this.#playerdto.update_player_id
		}'`;

		try {
			this.#con.query(q, (err, result) => {
				console.log(err);
				if (err) {
					// let dboperation_data = {};
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class PlayerAffiliationDb {
	#con;
	#playerdto;
	constructor(con, p1) {
		this.#con = con;
		this.#playerdto = p1;
	}

	insertPlayerAffiliation() {
		let q = "insert into game.player_affiliation values(?,?,?,?)";
		let a_playerAffiliation = [
			this.#playerdto.primary_id,
			this.#playerdto.playerid,
			this.#playerdto.country,
			this.#playerdto.organization,
		];

		try {
			this.#con.query(q, a_playerAffiliation, (err, result) => {
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#playerdto,
						recall_method: "insertPlayerAffiliation",
						table_name: "player_affiliation",
						unique_key: [],
						unique_id: ["playerID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	updatePlayerAffiliation() {
		let q = `update game.player_affiliation set ${
			this.#playerdto.update_column_name
		} = '${this.#playerdto.update_column_value}' where playerID = '${
			this.#playerdto.update_player_id
		}'`;
		try {
			this.#con.query(q, (err, result) => {
				// console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class PlayerHistoryDb {
	#con;
	#playerdto;
	constructor(con, p1) {
		this.#con = con;
		this.#playerdto = p1;
	}
	insertPlayerHistory() {
		let q = "insert into game.player_history values(?,?,?,?)";
		let a_playerHistory = [
			this.#playerdto.primary_id,
			this.#playerdto.playerid,
			this.#playerdto.matches_played,
			this.#playerdto.tournaments_played,
		];

		try {
			this.#con.query(q, a_playerHistory, (err, result) => {
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#playerdto,
						recall_method: "insertPlayerHistory",
						table_name: "player_history",
						unique_key: [],
						unique_id: ["playerID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	updatePlayerHistory() {
		let q = `update game.player_history set ${
			this.#playerdto.update_column_name
		} = '${this.#playerdto.update_column_value}' where playerID = '${
			this.#playerdto.update_player_id
		}'`;
		try {
			this.#con.query(q, (err, result) => {
				// console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class PlayerUIthemeDb {
	#con;
	#playerdto;
	constructor(con, p1) {
		this.#con = con;
		this.#playerdto = p1;
	}
	insertPlayerUItheme() {
		let q = "insert into game.player_uitheme values(?,?,?)";
		let a_playerUItheme = [
			this.#playerdto.primary_id,
			this.#playerdto.playerid,
			this.#playerdto.theme_mode,
		];

		try {
			this.#con.query(q, a_playerUItheme, (err, result) => {
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#playerdto,
						recall_method: "insertPlayerUItheme",
						table_name: "player_uitheme",
						unique_key: [],
						unique_id: ["playerID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	updatePlayerUItheme() {
		let q = `update game.player_uitheme set ${
			this.#playerdto.update_column_name
		} = '${this.#playerdto.update_column_value}' where playerID = '${
			this.#playerdto.update_player_id
		}'`;
		try {
			this.#con.query(q, (err, result) => {
				// console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class PlayerGameThemeDb {
	#con;
	#playerdto;
	constructor(con, p1) {
		this.#con = con;
		this.#playerdto = p1;
	}
	insertPlayerGameTheme() {
		let q = "insert into game.player_gametheme values(?,?,?)";
		let a_playerGametheme = [
			this.#playerdto.primary_id,
			this.#playerdto.playerid,
			this.#playerdto.gametheme_mode,
		];

		try {
			this.#con.query(q, a_playerGametheme, (err, result) => {
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#playerdto,
						recall_method: "insertPlayerGameTheme",
						table_name: "player_gametheme",
						unique_key: [],
						unique_id: ["playerID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	updatePlayerGameTheme() {
		let q = `update game.player_gametheme set ${
			this.#playerdto.update_column_name
		} = '${this.#playerdto.update_column_value}' where playerID = '${
			this.#playerdto.update_player_id
		}'`;
		try {
			this.#con.query(q, (err, result) => {
				// console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class PlayerSubscriptionDb {
	#con;
	#playerdto;
	constructor(con, p1) {
		this.#con = con;
		this.#playerdto = p1;
	}
	insertPlayerSubscription() {
		let q = "insert into game.player_subscription values(?,?,?)";
		let a_playerSubscription = [
			this.#playerdto.primary_id,
			this.#playerdto.playerid,
			this.#playerdto.game_subscription,
		];

		try {
			this.#con.query(q, a_playerSubscription, (err, result) => {
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#playerdto,
						recall_method: "insertPlayerSubscription",
						table_name: "player_subscription",
						unique_key: [],
						unique_id: ["playerID"],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	updatePlayerSubscription() {
		let q = `update game.player_subscription set ${
			this.#playerdto.update_column_name
		} = '${this.#playerdto.update_column_value}' where playerID = '${
			this.#playerdto.update_player_id
		}'`;
		try {
			this.#con.query(q, (err, result) => {
				// console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}
class PlayerAccessLogsDb {
	#con;
	#playerdto;
	constructor(con, p1) {
		this.#con = con;
		this.#playerdto = p1;
	}
	insertPlayerAccessLogs() {
		let q = "insert into game.player_accesslog values(?,?,?)";
		let a_playerAccessLogs = [
			this.#playerdto.primary_id,
			this.#playerdto.playerid,
			this.#playerdto.login_time,
		];

		try {
			this.#con.query(q, a_playerAccessLogs, (err, result) => {
				if (err) {
					let dboperation_data = {
						dao_instance: this,
						dto_object: this.#playerdto,
						recall_method: "insertPlayerContact",
						table_name: "player_contact",
						unique_key: [],
						unique_id: [],
					};
					new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	updatePlayerAccessLogs() {
		let q = `update game.player_accesslog set ${
			this.#playerdto.update_column_name
		} = '${this.#playerdto.update_column_value}' where playerID = '${
			this.#playerdto.update_player_id
		}'`;
		try {
			this.#con.query(q, (err, result) => {
				// console.log(err);
				if (err) {
					new err_handler.ErrorManager(err).updateErrorIdentifier();
				}
				console.log("result aaaaayyyyaaaaa ------- ", result);
				if (result) {
					this.#con.end();
				}
			});
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = {
	PlayerDb,
	PlayerContactDb,
	PlayerAffiliationDb,
	PlayerHistoryDb,
	PlayerUIthemeDb,
	PlayerGameThemeDb,
	PlayerSubscriptionDb,
	PlayerAccessLogsDb,
};
