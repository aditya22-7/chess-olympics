class PlayerDto {
  #primary_id;
  #playerid;
  #update_column_name;
  #update_column_value;
  #update_player_id;
  #first_name;
  #last_name;
  #username;
  #password;
  #mobile_number;
  #email;
  #country;
  #organization;
  #matches_played; //int
  #tournaments_played; //int
  #theme_mode;
  #gametheme_mode;
  #game_subscription;
  #login_time;

  get primary_id() {
    return this.#primary_id;
  }

  set primary_id(value) {
    this.#primary_id = value;
  }

  get playerid() {
    return this.#playerid;
  }

  set playerid(value) {
    this.#playerid = value;
  }

  get first_name() {
    return this.#first_name;
  }

  set first_name(value) {
    this.#first_name = value;
  }

  get last_name() {
    return this.#last_name;
  }

  set last_name(value) {
    this.#last_name = value;
  }

  get username() {
    return this.#username;
  }

  set username(value) {
    this.#username = value;
  }

  get password() {
    return this.#password;
  }

  set password(value) {
    this.#password = value;
  }

  get mobile_number() {
    return this.#mobile_number;
  }

  set mobile_number(value) {
    this.#mobile_number = value;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    this.#email = value;
  }

  get country() {
    return this.#country;
  }

  set country(value) {
    this.#country = value;
  }

  get organization() {
    return this.#organization;
  }

  set organization(value) {
    this.#organization = value;
  }

  get matches_played() {
    return this.#matches_played;
  }

  set matches_played(value) {
    this.#matches_played = value;
  }

  get tournaments_played() {
    return this.#tournaments_played;
  }

  set tournaments_played(value) {
    this.#tournaments_played = value;
  }

  get theme_mode() {
    return this.#theme_mode;
  }

  set theme_mode(value) {
    this.#theme_mode = value;
  }

  get gametheme_mode() {
    return this.#gametheme_mode;
  }

  set gametheme_mode(value) {
    this.#gametheme_mode = value;
  }

  get game_subscription() {
    return this.#game_subscription;
  }

  set game_subscription(value) {
    this.#game_subscription = value;
  }

  get login_time() {
    return this.#login_time;
  }

  set login_time(value) {
    this.#login_time = value;
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

module.exports = PlayerDto;
