class RelationsDto {
	#primary_id;
	#allot_status; // Column in match_waiting_list
	#tour_id;
	#teams_id;
	#tourteam_id;
	#player_id;
	#tourteamstate_rows_array = [];
	#update_column_name;
	#update_column_value;
	#update_id;
	#tourteam1;
	#tourteam2;
	#start_time; //For both tourteam_matches and tourteam_player_matches
	#end_time;
	#tourteam_match_id;
	#draw;
	#winner_team;
	#losing_team;
	#tourTeamState_player1;
	#tourTeamState_player2;
	#time_period;
	#tourteam_player_match_id;
	#white_pieces_player;
	#black_pieces_player;
	#winning_player;
	#losing_player;
	#playing_start_time;
	#playing_end_time;
	#tourTeamState_id;
	#piece_color;
	#piece_name;
	#tile_file;
	#tile_rank;

	get primary_id() {
		return this.#primary_id;
	}
	set primary_id(value) {
		this.#primary_id = value;
	}

	get allot_status() {
		return this.#allot_status;
	}
	set allot_status(value) {
		this.#allot_status = value;
	}

	get tour_id() {
		return this.#tour_id;
	}
	set tour_id(value) {
		this.#tour_id = value;
	}

	get teams_id() {
		return this.#teams_id;
	}
	set teams_id(value) {
		this.#teams_id = value;
	}

	get tourteam_id() {
		return this.#tourteam_id;
	}
	set tourteam_id(value) {
		this.#tourteam_id = value;
	}

	get player_id() {
		return this.#player_id;
	}
	set player_id(value) {
		this.#player_id = value;
	}

	get tourteamstate_rows_array() {
		return this.#tourteamstate_rows_array;
	}
	set tourteamstate_rows_array(value) {
		this.#tourteamstate_rows_array = value;
	}

	get tourteam1() {
		return this.#tourteam1;
	}
	set tourteam1(value) {
		this.#tourteam1 = value;
	}

	get tourteam2() {
		return this.#tourteam2;
	}
	set tourteam2(value) {
		this.#tourteam2 = value;
	}

	get start_time() {
		return this.#start_time;
	}
	set start_time(value) {
		this.#start_time = value;
	}

	get end_time() {
		return this.#end_time;
	}
	set end_time(value) {
		this.#end_time = value;
	}

	get tourteam_match_id() {
		return this.#tourteam_match_id;
	}
	set tourteam_match_id(value) {
		this.#tourteam_match_id = value;
	}

	get draw() {
		return this.#draw;
	}
	set draw(value) {
		this.#draw = value;
	}

	get winner_team() {
		return this.#winner_team;
	}
	set winner_team(value) {
		this.#winner_team = value;
	}

	get losing_team() {
		return this.#losing_team;
	}
	set losing_team(value) {
		this.#losing_team = value;
	}

	get tourTeamState_player1() {
		return this.#tourTeamState_player1;
	}
	set tourTeamState_player1(value) {
		this.#tourTeamState_player1 = value;
	}

	get tourTeamState_player2() {
		return this.#tourTeamState_player2;
	}
	set tourTeamState_player2(value) {
		this.#tourTeamState_player2 = value;
	}

	get time_period() {
		return this.#time_period;
	}
	set time_period(value) {
		this.#time_period = value;
	}

	get tourteam_player_match_id() {
		return this.#tourteam_player_match_id;
	}
	set tourteam_player_match_id(value) {
		this.#tourteam_player_match_id = value;
	}

	get white_pieces_player() {
		return this.#white_pieces_player;
	}
	set white_pieces_player(value) {
		this.#white_pieces_player = value;
	}

	get black_pieces_player() {
		return this.#black_pieces_player;
	}
	set black_pieces_player(value) {
		this.#black_pieces_player = value;
	}

	get winning_player() {
		return this.#winning_player;
	}
	set winning_player(value) {
		this.#winning_player = value;
	}

	get losing_player() {
		return this.#losing_player;
	}
	set losing_player(value) {
		this.#losing_player = value;
	}

	get playing_start_time() {
		return this.#playing_start_time;
	}
	set playing_start_time(value) {
		this.#playing_start_time = value;
	}

	get playing_end_time() {
		return this.#playing_end_time;
	}
	set playing_end_time(value) {
		this.#playing_end_time = value;
	}

	get tourTeamState_id() {
		return this.#tourTeamState_id;
	}
	set tourTeamState_id(value) {
		this.#tourTeamState_id = value;
	}

	get piece_color() {
		return this.#piece_color;
	}
	set piece_color(value) {
		this.#piece_color = value;
	}

	get piece_name() {
		return this.#piece_name;
	}
	set piece_name(value) {
		this.#piece_name = value;
	}

	get tile_file() {
		return this.#tile_file;
	}
	set tile_file(value) {
		this.#tile_file = value;
	}
	get tile_rank() {
		return this.#tile_rank;
	}
	set tile_rank(value) {
		this.#tile_rank = value;
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

module.exports = RelationsDto;
