let { game, createNewGame } = require("./game");
let service = require("../Service/services");

class Manager {
	static #waitingQueue = [];
	static #turn = true;
	static #whitePlayer = null;
	static #blackPlayer = null;
	static #from;
	static #to;

	static {
		createNewGame();
	}

	static isBlack() {
		return this.#whitePlayer;
	}

	static isWhite() {
		return !this.#whitePlayer;
	}

	static isGameReady() {
		return this.#whitePlayer && this.#blackPlayer;
	}

	static noOneReady() {
		return !(this.#blackPlayer || this.#whitePlayer);
	}

	static getBoard() {
		return game.getBoard();
	}

	static sendMove(data) {
		if (!this.#turn) this.#whitePlayer.emit("move", data);
		else this.#blackPlayer.emit("move", data);
	}

	static initSocket(socket) {
		if (Manager.isBlack()) this.emitSideSaveSocket(socket, "black");
		else if (Manager.isWhite()) this.emitSideSaveSocket(socket, "white");
	}

	static emitSideSaveSocket(socket, side) {
		socket.inUse = true;
		socket.side = side;
		socket.emit(side, this.toUnFreeze(side));
		this.write(side, socket);
	}

	static toUnFreeze(side) {
		if (side === "black" && !this.#turn) return true;
		else if (side === "white" && this.#turn) return true;
		return false;
	}

	static write(side, val) {
		if (side === "black") this.#blackPlayer = val;
		else this.#whitePlayer = val;
	}

	static decrement(socket) {
		if (this.someoneWaiting()) {
			const new_socket = this.dequeue();
			if (!game.isOver()) this.emitSideSaveSocket(new_socket, socket.side);
			else this.initSocket(socket);
		} else {
			this.write(socket.side, null);
			if (this.noOneReady()) {
				this.createNewGame();
			}
		}
	}

	static someoneWaiting() {
		return this.#waitingQueue.length > 0;
	}

	static dequeue() {
		const socket = this.#waitingQueue.shift();
		return socket;
	}

	static createNewGame() {
		this.#blackPlayer = null;
		this.#whitePlayer = null;
		let count = 0;
		let socket = null;
		this.#turn = true;
		createNewGame();
		while (count < 2 && this.someoneWaiting()) {
			++count;
			socket = this.dequeue();
			this.initSocket(socket);
		}
	}

	static init(socket) {
		socket.on("startposition", () => {
			socket.emit("startposition", this.getBoard());
		});

		socket.on("pt", (data) => {
			if (!this.isGameReady()) return socket.emit("from", "invalid");
			this.#from = game.board.getTile(data.row, data.col);
			if (!this.#from.piece) return socket.emit("from", "invalid");
			if (this.#from.piece.color !== this.#turn)
				return socket.emit("from", "invalid");
			let permittedTiles = this.#from.piece.permittedTiles;
			permittedTiles = permittedTiles.map((element) => {
				return {
					row: element.row,
					col: element.col,
				};
			});
			socket.emit("from", permittedTiles);
		});

		socket.on("to", (data) => {
			this.#to = game.board.getTile(data.row, data.col);
			const ret = game.move(this.#from, this.#to);
			this.#to = null;
			this.#from = null;
			socket.emit("to", ret);
			this.sendMove(ret);
			this.#turn = !this.#turn;
			if (game.isOver()) {
				this.#blackPlayer.inUse = false;
				this.#whitePlayer.inUse = false;
				this.createNewGame();
			}
		});

		socket.on("disconnect", () => {
			console.log("Player disconnected");
			if (socket.inUse) this.decrement(socket);
		});

		if (Manager.isGameReady()) {
			this.#waitingQueue.push(socket);
		} else {
			this.initSocket(socket);
		}
	}
}

let player_waiting_list = [];
class MatchMaker {
	#p1_socket;
	#p2_socket;
	get p1_socket() {
		return this.#p1_socket;
	}
	set p1_socket(socket) {
		this.#p1_socket = socket;
	}
	get p1_socket() {
		return this.#p2_socket;
	}
	set p1_socket(socket) {
		this.#p2_socket = socket;
	}
	pair_making(socket) {
		if (player_waiting_list.length > 0) {
			this.#p1_socket = socket;
			this.#p2_socket = player_waiting_list[0];
			// new service.TournamentPlayerMatch().schedulePlayerMatch();
			new service.SocketMatch().scheduleSocketMatch();
		} else {
			player_waiting_list.push(socket);
		}
	}
}

module.exports = Manager;
