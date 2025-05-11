// Promisified approach for OpenPlayMatches

// class OpenPlayMatches {
//     #socket_object;
//     #tt_participate;
//     #tt_player;
//     #teammatch;
//     #player_match;
//     #current_playerid;
//     #current_tourid;
//     #current_teamid;
//     #current_tourteamid;
//     #current_ttsid;

//     constructor(socket_object) {
//         this.#socket_object = socket_object;
//     }

//     get current_playerid() {
//         return this.#current_playerid;
//     }
//     set current_playerid(playerid) {
//         this.#current_playerid = playerid;
//     }

//     get current_teamid() {
//         return this.#current_teamid;
//     }
//     set current_teamid(teamid) {
//         this.#current_teamid = teamid;
//     }

//     get current_tourteamid() {
//         return this.#current_tourteamid;
//     }
//     set current_tourteamid(tourteamid) {
//         this.#current_tourteamid = tourteamid;
//     }

//     get current_ttsid() {
//         return this.#current_ttsid;
//     }
//     set current_ttsid(ttsid) {
//         this.#current_ttsid = ttsid;
//     }

//     get current_tourid() {
//         return this.#current_tourid;
//     }
//     set current_tourid(tourid) {
//         this.#current_tourid = tourid;
//     }

//     get ttParticipate() {
//         return this.#tt_participate;
//     }

//     set ttParticipate(value) {
//         this.#tt_participate = value;
//     }

//     get ttPlayer() {
//         return this.#tt_player;
//     }

//     set ttPlayer(value) {
//         this.#tt_player = value;
//     }

//     async makeTourTeam() {
//         try {
//             let tt_participate = new team_p.TournamentTeamParticipation();
//             this.ttParticipate = tt_participate;
//             tt_participate.current_team_id = this.current_teamid;
//             tt_participate.current_tour_id = this.current_tourid;

//             // Wait for the team to be added
//             const tourteamid = await tt_participate.addTeam();
//             this.#current_tourteamid = tourteamid;

//             // Proceed to create the team state
//             await this.makeTourTeamState();

//             let tt_player = new team_p.TournamentTeamPlayers();
//             this.ttPlayer = tt_player;
//             tt_player.tourteam_id = tourteamid;
//             tt_player.team_players_array = [this.#socket_object.player_id];
//         } catch (error) {
//             console.error("Error in makeTourTeam:", error);
//         }
//     }

//     async makeTourTeamState() {
//         try {
//             // Wait for the team state to be added
//             const tts_array = await this.ttPlayer.addTourTeamPlayers();
//             this.current_ttsid = tts_array[0][0];

//             // Add to the waiting list
//             this.addToWaitingList();

//             // Attempt to make a match
//             let match_object = this.makeMatch();
//             if (match_object) {
//                 await this.makeTourTeamMatch(match_object);
//             }
//         } catch (error) {
//             console.error("Error in makeTourTeamState:", error);
//         }
//     }

//     addToWaitingList() {
//         waiting_list.push({
//             playerid: this.#socket_object.player_id,
//             tourteamid: this.current_tourteamid,
//             tourteamstateid: this.current_ttsid,
//             tourid: this.current_tourid,
//         });
//         console.log("Printing waiting list....\n", waiting_list);
//     }

//     removeFromWaitingList(match_object) {
//         let new_waiting_list = waiting_list.filter(
//             (obj) =>
//                 obj.playerid !== match_object.player1 &&
//                 obj.playerid !== match_object.player2
//         );
//         waiting_list = new_waiting_list;
//     }

//     makeMatch() {
//         let match_object = null;
//         let waiting_list_len = waiting_list.length;
//         if (waiting_list_len > 1) {
//             let match_making_wl = waiting_list.filter(
//                 (obj) => obj.playerid !== this.#socket_object.player_id
//             );

//             const randomIndex = Math.floor(Math.random() * match_making_wl.length);

//             match_object = {
//                 player1: this.#socket_object.player_id,
//                 player2: match_making_wl[randomIndex].playerid,
//                 tourteam1: this.current_tourteamid,
//                 tourteam2: match_making_wl[randomIndex].tourteamid,
//                 tourteamstate1: this.current_ttsid,
//                 tourteamstate2: match_making_wl[randomIndex].tourteamstateid,
//             };
//             this.removeFromWaitingList(match_object);
//         }
//         return match_object;
//     }

//     async makeTourTeamMatch(match_object) {
//         try {
//             let teammatch = new team_p.TournamentTeamMatch();
//             teammatch.tourid = this.current_tourid;
//             teammatch.tourteam1 = match_object.tourteam1;
//             teammatch.tourteam2 = match_object.tourteam2;

//             // Wait for the team match to be scheduled
//             const matchid = await teammatch.scheduleTeamMatch();
//             await this.makeTourTeamPlayerMatch(match_object, matchid);

//             console.log("Team Match scheduled !!!!!");
//         } catch (error) {
//             console.error("Error in makeTourTeamMatch:", error);
//         }
//     }

//     async makeTourTeamPlayerMatch(match_object, matchid) {
//         try {
//             let player_match = new team_p.TournamentPlayerMatch();
//             player_match.match_id = matchid;
//             player_match.tourteamstate1 = match_object.tourteamstate1;
//             player_match.tourteamstate2 = match_object.tourteamstate2;

//             // Wait for the player match to be scheduled
//             await player_match.schedulePlayerMatch();
//         } catch (error) {
//             console.error("Error in makeTourTeamPlayerMatch:", error);
//         }
//     }

//     async getTourTeamState() {
//         try {
//             let tourteamstate_retrieve = new team_p.TournamentTeamPlayers();
//             tourteamstate_retrieve.tourteam_id = this.current_tourteamid;
//             tourteamstate_retrieve.tt_player = this.#socket_object.player_id;

//             // Wait for the team state ID to be retrieved
//             const tts_id = await tourteamstate_retrieve.getTourTeamStateId();
//             this.current_ttsid = tts_id[0].TourTeamState_id;

//             this.addToWaitingList();

//             let match_object = this.makeMatch();
//             if (match_object) {
//                 await this.makeTourTeamMatch(match_object);
//             }
//         } catch (error) {
//             console.error("Error in getTourTeamState:", error);
//         }
//     }

//     async checkTourTeamPresence() {
//         try {
//             let tourteam_check = new team_p.TournamentTeamParticipation();
//             tourteam_check.current_player_id = this.#socket_object.player_id;
//             tourteam_check.current_tour_id = this.current_tourid;

//             // Wait for the team presence check
//             const tourteamid = await tourteam_check.checkTourTeamPresence();
//             if (tourteamid.length > 0) {
//                 this.current_tourteamid = tourteamid[0].TourTeams_id;
//                 await this.getTourTeamState();
//             } else {
//                 await this.makeTourTeam();
//             }
//         } catch (error) {
//             console.error("Error in checkTourTeamPresence:", error);
//         }
//     }

//     async checkTeamPresence() {
//         try {
//             let team = new team_p.Teams();

//             // Wait for the team presence check
//             const teamid = await team.getTeamId(this.#socket_object.player_id);
//             if (teamid.length > 0) {
//                 this.current_teamid = teamid[0].team_id;
//                 console.log("teamid ---- ", teamid);
//             } else {
//                 console.log("No such team exists !!!");
//             }
//         } catch (error) {
//             console.error("Error in checkTeamPresence:", error);
//         }
//     }

//     playService() {
//         this.#socket_object.on("play-service", async (playerid, teamid) => {
//             this.current_playerid = playerid;
//             this.current_teamid = teamid;

//             await this.checkTourTeamPresence();
//         });
//     }
// }
