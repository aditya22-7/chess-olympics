class TeamsDto {
  #primary_id;
  #teamsid;
  #team_playerid;
  #update_column_name;
  #update_column_value;
  #update_player_id;
  #unique_name;
  #team_name;
  #no_of_players;
  #no_of_tournaments;
  #minimum_ranking;
  #maximum_ranking;
  #minimum_players_number;
  #maximum_players_number;
  #team_state;

  get primary_id() {
    return this.#primary_id;
  }
  set primary_id(value) {
    this.#primary_id = value;
  }

  // Getter and Setter for teamsid
  get teamsid() {
    return this.#teamsid;
  }
  set teamsid(value) {
    this.#teamsid = value;
  }

  // Getter and Setter for teams_playerid
  get team_playerid() {
    return this.#team_playerid;
  }
  set team_playerid(value) {
    this.#team_playerid = value;
  }

  // Getter and Setter for unique_name
  get unique_name() {
    return this.#unique_name;
  }
  set unique_name(value) {
    this.#unique_name = value;
  }

  // Getter and Setter for team_name
  get team_name() {
    return this.#team_name;
  }
  set team_name(value) {
    this.#team_name = value;
  }

  // Getter and Setter for no_of_players
  get no_of_players() {
    return this.#no_of_players;
  }
  set no_of_players(value) {
    this.#no_of_players = value;
  }

  // Getter and Setter for no_of_tournaments
  get no_of_tournaments() {
    return this.#no_of_tournaments;
  }
  set no_of_tournaments(value) {
    this.#no_of_tournaments = value;
  }

  // Getter and Setter for minimum_ranking
  get minimum_ranking() {
    return this.#minimum_ranking;
  }
  set minimum_ranking(value) {
    this.#minimum_ranking = value;
  }

  // Getter and Setter for maximum_ranking
  get maximum_ranking() {
    return this.#maximum_ranking;
  }
  set maximum_ranking(value) {
    this.#maximum_ranking = value;
  }

  // Getter and Setter for minimum_players_number
  get minimum_players_number() {
    return this.#minimum_players_number;
  }
  set minimum_players_number(value) {
    this.#minimum_players_number = value;
  }

  // Getter and Setter for maximum_players_number
  get maximum_players_number() {
    return this.#maximum_players_number;
  }
  set maximum_players_number(value) {
    this.#maximum_players_number = value;
  }

  // Getter and Setter for team_state
  // team_state is an array with arrays of users
  get team_state() {
    return this.#team_state;
  }
  set team_state(value) {
    this.#team_state = value;
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

  get update_player_id() {
    return this.#update_player_id;
  }

  set update_player_id(value) {
    this.#update_player_id = value;
  }
}

module.exports = TeamsDto;
