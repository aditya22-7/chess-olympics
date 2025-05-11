class TournamentDto {
  #primary_id;
  #tourid;
  #tour_typeid;
  #rulesetid;
  #tour_rulesid;
  #update_column_name;
  #update_column_value;
  #update_id;
  #formation_date;
  #rule_consideration_date;
  #_name;
  #_description; // ruleset description + tour type _description
  #tour_name;
  #tour_version;
  #number_of_teams;
  #number_of_players;
  #tour_start_day;
  #tour_end_day;
  #winner_team;
  #MinimumRanking;
  #MaximumRanking;

  // Getter and Setter for primary_id
  get primary_id() {
    return this.#primary_id;
  }
  set primary_id(value) {
    this.#primary_id = value;
  }

  // Getter and Setter for tour_typeid
  get tour_typeid() {
    return this.#tour_typeid;
  }
  set tour_typeid(value) {
    this.#tour_typeid = value;
  }

  // Getter and Setter for tourid
  get tourid() {
    return this.#tourid;
  }
  set tourid(value) {
    this.#tourid = value;
  }

  // Getter and Setter for tourid
  get rulesetid() {
    return this.#rulesetid;
  }
  set rulesetid(value) {
    this.#rulesetid = value;
  }

  // Getter and Setter for tourid
  get tour_rulesid() {
    return this.#tour_rulesid;
  }
  set tour_rulesid(value) {
    this.#tour_rulesid = value;
  }

  // Getter and Setter for ruleset formation_date
  get formation_date() {
    return this.#formation_date;
  }
  set formation_date(value) {
    this.#formation_date = value;
  }

  // Getter and Setter for ruleset rule_consideration_date
  get rule_consideration_date() {
    return this.#rule_consideration_date;
  }
  set rule_consideration_date(value) {
    this.#rule_consideration_date = value;
  }

  // Getter and Setter for tour_type name
  get _name() {
    return this.#_name;
  }
  set _name(value) {
    this.#_name = value;
  }

  // Getter and Setter for tour_type and ruleset description
  get _description() {
    return this.#_description;
  }
  set _description(value) {
    this.#_description = value;
  }

  // Getter and Setter for tour_name
  get tour_name() {
    return this.#tour_name;
  }
  set tour_name(value) {
    this.#tour_name = value;
  }

  // Getter and Setter for tour_version
  get tour_version() {
    return this.#tour_version;
  }
  set tour_version(value) {
    this.#tour_version = value;
  }

  // Getter and Setter for number_of_teams
  get number_of_teams() {
    return this.#number_of_teams;
  }
  set number_of_teams(value) {
    this.#number_of_teams = value;
  }

  // Getter and Setter for number_of_players
  get number_of_players() {
    return this.#number_of_players;
  }
  set number_of_players(value) {
    this.#number_of_players = value;
  }

  // Getter and Setter for tour_start_day
  get tour_start_day() {
    return this.#tour_start_day;
  }
  set tour_start_day(value) {
    this.#tour_start_day = value;
  }

  // Getter and Setter for tour_end_day
  get tour_end_day() {
    return this.#tour_end_day;
  }
  set tour_end_day(value) {
    this.#tour_end_day = value;
  }

  // Getter and Setter for winner_team
  get winner_team() {
    return this.#winner_team;
  }
  set winner_team(value) {
    this.#winner_team = value;
  }

  // Getter and Setter for MinimumRanking
  get MinimumRanking() {
    return this.#MinimumRanking;
  }
  set MinimumRanking(value) {
    this.#MinimumRanking = value;
  }

  // Getter and Setter for MaximumRanking
  get MaximumRanking() {
    return this.#MaximumRanking;
  }
  set MaximumRanking(value) {
    this.#MaximumRanking = value;
  }

  get update_column_name() {
    return this.#update_column_name;
  }

  set update_column_name(value) {
    this.#update_column_name = value;
  }

  get update_column_value() {
    return this.#update_column_value;
  }

  set update_column_value(value) {
    this.#update_column_value = value;
  }

  get update_id() {
    return this.#update_id;
  }

  set update_id(value) {
    this.#update_id = value;
  }
}

module.exports = TournamentDto;
