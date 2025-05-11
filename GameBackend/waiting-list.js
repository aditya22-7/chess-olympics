class PlayerWaitingList {
	static #waiting_list = [];

	static get waitingList() {
		return this.#waiting_list;
	}
	// static set waitingList(list){}
}
let waiting_list = PlayerWaitingList.waitingList;
module.exports = { waiting_list };
