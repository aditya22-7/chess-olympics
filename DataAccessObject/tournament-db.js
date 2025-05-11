let uuid_generator = require("./uuid-generator");
let err_handler = require("./error-handling.js");

class RuleSetDb {
  #con;
  #tourdto;
  constructor(con, tourdto_object) {
    this.#con = con;
    this.#tourdto = tourdto_object;
  }
  insertRuleSet() {
    let q = "insert into game.ruleset values(?,?,?)";
    let a_ruleset_rule = [
      this.#tourdto.primary_id,
      this.#tourdto.formation_date,
      this.#tourdto._description,
    ];
    try {
      this.#con.query(q, a_ruleset_rule, (err, result) => {
        console.log(err);

        if (err) {
          let dboperation_data = {
            dao_instance: this,
            dto_object: this.#tourdto,
            recall_method: "insertRuleSet",
            table_name: "ruleset",
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
      console.log(`Erroorrr haiiiii`);
      // console.log(err);
    }
  }
  updateRuleSet() {
    let q = `update game.ruleset set ${this.#tourdto.update_column_name} = '${
      this.#tourdto.update_column_value
    }' where ruleset_id = '${this.#tourdto.update_id}'`;
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

class TournamentRulesDb {
  #con;
  #tourdto;
  constructor(con, tourdto_object) {
    this.#con = con;
    this.#tourdto = tourdto_object;
  }
  insertTourRules() {
    let q = "insert into game.tournament_rules values(?,?,?)";
    let a_tour_rule = [
      this.#tourdto.primary_id,
      this.#tourdto.rulesetid,
      this.#tourdto.rule_consideration_date,
    ];
    try {
      this.#con.query(q, a_tour_rule, (err, result) => {
        // console.log(err);

        if (err) {
          let dboperation_data = {
            dao_instance: this,
            dto_object: this.#tourdto,
            recall_method: "insertTourRules",
            table_name: "tournament_rules",
            unique_key: [],
            unique_id: ["rulesetID"],
          };
          new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
        }
        console.log("result aaaaayyyyaaaaa ------- ", result);
        if (result) {
          this.#con.end();
        }
      });
    } catch (err) {
      console.log(`Erroorrr haiiiii`);
      // console.log(err);
    }
  }

  updateTourRules() {
    let q = `update game.tournament_rules set ${
      this.#tourdto.update_column_name
    } = '${this.#tourdto.update_column_value}' where tournament_rules_id = '${
      this.#tourdto.update_id
    }'`;
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

class TournamentThisRulesDb {
  #con;
  #tourdto;
  constructor(con, tourdto_object) {
    this.#con = con;
    this.#tourdto = tourdto_object;
  }
  insertThisTourRules() {
    let q = "insert into game.this_tournament_rules values(?,?,?)";
    let a_this_tour_rule = [
      this.#tourdto.primary_id,
      this.#tourdto.tourid,
      this.#tourdto.tour_rulesid,
    ];
    try {
      this.#con.query(q, a_this_tour_rule, (err, result) => {
        console.log(err);

        if (err) {
          let dboperation_data = {
            dao_instance: this,
            dto_object: this.#tourdto,
            recall_method: "insertThisTourRules ",
            table_name: "this_tournament_rules",
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
      console.log(`Erroorrr haiiiii`);
      // console.log(err);
    }
  }

  updateThisTourRules() {
    let q = `update game.this_tournament_rules set ${
      this.#tourdto.update_column_name
    } = '${
      this.#tourdto.update_column_value
    }' where this_tournament_rules_id = '${this.#tourdto.update_id}'`;
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

class TournamentTypeDb {
  #con;
  #tourdto;
  constructor(con, tourdto_object) {
    this.#con = con;
    this.#tourdto = tourdto_object;
  }
  insertTourType() {
    let q = "insert into game.tourtype values(?,?,?)";
    let a_tour_type = [
      this.#tourdto.primary_id,
      this.#tourdto._name,
      this.#tourdto._description,
    ];
    try {
      this.#con.query(q, a_tour_type, (err, result) => {
        console.log(err);

        if (err) {
          let dboperation_data = {
            dao_instance: this,
            dto_object: this.#tourdto,
            recall_method: "insertTourType",
            table_name: "tourtype",
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
      console.log(`Erroorrr haiiiii`);
      // console.log(err);
    }
  }

  updateTourType() {
    let q = `update game.tourtype set ${this.#tourdto.update_column_name} = '${
      this.#tourdto.update_column_value
    }' where tourType_id = '${this.#tourdto.update_id}'`;
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

class TournamentDb {
  #con;
  #tourdto;
  constructor(con, tourdto_object) {
    this.#con = con;
    this.#tourdto = tourdto_object;
  }
  insertTour() {
    let q =
      "insert into game.tournament(tournament_id,tourtypeID,tour_name,tour_version,number_of_teams,number_of_players) values(?,?,?,?,?,?)";
    let a_tour = [
      this.#tourdto.primary_id,
      this.#tourdto.tour_typeid,
      this.#tourdto.tour_name,
      this.#tourdto.tour_version,
      this.#tourdto.number_of_teams,
      this.#tourdto.number_of_players,
      // this.#tourdto.tour_start_day,
      // this.#tourdto.tour_end_day,
    ];
    try {
      this.#con.query(q, a_tour, (err, result) => {
        // console.log(err);

        if (err) {
          let dboperation_data = {
            dao_instance: this,
            dto_object: this.#tourdto,
            recall_method: "insertTour",
            table_name: "tournament",
            unique_key: ["tour_version"],
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
      console.log(`Erroorrr haiiiii`);
      // console.log(err);
    }
  }

  updateTour() {
    let q = `update game.tournament set ${
      this.#tourdto.update_column_name
    } = '${this.#tourdto.update_column_value}' where tournament_id = '${
      this.#tourdto.update_id
    }'`;
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

class TournamentDetailsDb {
  #con;
  #tourdto;
  constructor(con, tourdto_object) {
    this.#con = con;
    this.#tourdto = tourdto_object;
  }
  insertTourDetails() {
    let q = "insert into game.tournament_details values(?,?,?)";
    let a_tour_details = [
      this.#tourdto.primary_id,
      this.#tourdto.tourid,
      this.#tourdto.winner_team,
    ];
    try {
      this.#con.query(q, a_tour_details, (err, result) => {
        // console.log(err);

        if (err) {
          let dboperation_data = {
            dao_instance: this,
            dto_object: this.#tourdto,
            recall_method: "insertTourDetails",
            table_name: "tournament_details",
            unique_key: [],
            unique_id: ["tourID"],
          };
          new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
        }
        console.log("result aaaaayyyyaaaaa ------- ", result);
        if (result) {
          this.#con.end();
        }
      });
    } catch (err) {
      console.log(`Erroorrr haiiiii`);
      // console.log(err);
    }
  }

  updateTourDetails() {
    let q = `update game.tournament_details set ${
      this.#tourdto.update_column_name
    } = '${this.#tourdto.update_column_value}' where tournament_details_id = '${
      this.#tourdto.update_id
    }'`;
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

class TournamentCriteriaDb {
  #con;
  #tourdto;
  constructor(con, tourdto_object) {
    this.#con = con;
    this.#tourdto = tourdto_object;
  }
  insertTourCriteria() {
    let q = "insert into game.tour_criteria values(?,?,?,?)";
    let a_tour_criteria = [
      this.#tourdto.primary_id,
      this.#tourdto.tourid,
      this.#tourdto.MinimumRanking,
      this.#tourdto.MaximumRanking,
    ];
    try {
      this.#con.query(q, a_tour_criteria, (err, result) => {
        // console.log(err);
        if (err) {
          let dboperation_data = {
            dao_instance: this,
            dto_object: this.#tourdto,
            recall_method: "insertTourCriteria",
            table_name: "tour_criteria",
            unique_key: [],
            unique_id: ["tourID"],
          };
          new err_handler.ErrorManager(err, dboperation_data).errorIdentifier();
        }
        console.log("result aaaaayyyyaaaaa ------- ", result);
        if (result) {
          this.#con.end();
        }
      });
    } catch (err) {
      console.log(`Erroorrr haiiiii`);
      // console.log(err);
    }
  }

  updateTourCriteria() {
    let q = `update game.tour_criteria set ${
      this.#tourdto.update_column_name
    } = '${this.#tourdto.update_column_value}' where tour_criteria_id = '${
      this.#tourdto.update_id
    }'`;
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

module.exports = {
  RuleSetDb,
  TournamentRulesDb,
  TournamentThisRulesDb,
  TournamentDetailsDb,
  TournamentTypeDb,
  TournamentDb,
  TournamentDetailsDb,
  TournamentCriteriaDb,
};
