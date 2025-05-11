import { renderchess, init, socket } from "./render-board.js";

export class Controller {
	static #movestarted = false;
	static #from;
	static #rowcheck;
	static #colcheck;
	static #to;
	static #permittedTiles = [];
	static #permittedLocations = [];
	static #status = null;
	static #turn = true;
	static #side = null;
	static #freeze = true;

	static init(socket) {
		socket.on("startposition", renderchess);
		socket.on("black", (data) => init("black", data));
		socket.on("white", (data) => init("white", data));
		socket.on("move", (data) => {
			this.processTo(data);
			this.unfreeze();
		});
		socket.on("to", (data) => {
			this.processTo(data);
			Controller.freeze();
		});
		socket.on("from", (data) => {
			if (data === "invalid") return;
			this.#permittedTiles = data;
			Controller.#movestarted = true;
			Controller.#permittedLocations.length = 0;
			Controller.#permittedTiles.forEach((e) => {
				let row = e.row;
				let col = e.col;
				let side = this.getSide();
				let td = document.querySelector(
					'[data-row ="' +
						row +
						'"][data-col = "' +
						col +
						'"][data-side ="' +
						side +
						'"]'
				);
				Controller.#permittedLocations.push(td);
				td.setAttribute("class", "selected");
			});
		});
	}

	static async dispatch(e) {
		if (Controller.#freeze) return;
		if (!Controller.#movestarted) {
			if (e.target.innerHTML === " ") return;
			Controller.#from = {
				row: e.target.dataset["row"],
				col: e.target.dataset["col"],
			};
			Controller.#rowcheck = Controller.#from.row;
			Controller.#colcheck = Controller.#from.col;
			socket.emit("pt", this.#from);
		} else {
			Controller.#movestarted = false;

			Controller.#to = {
				row: e.target.dataset["row"],
				col: e.target.dataset["col"],
			};
			Controller.#permittedLocations.forEach((e) => {
				if ((parseInt(e.dataset["row"]) + parseInt(e.dataset["col"])) % 2 == 0)
					e.setAttribute("class", "black");
				else e.setAttribute("class", "white");
			});
			if (Controller.#permittedLocations.indexOf(e.target) != -1)
				socket.emit("to", this.#to);
			if (Controller.#permittedLocations.indexOf(e.target) == -1) {
				if (
					e.target.dataset["row"] != Controller.#rowcheck ||
					e.target.dataset["col"] != Controller.#colcheck
				) {
					Controller.dispatch(e);
				}
			}
			Controller.#from = null;
			Controller.#to = null;
			Controller.#permittedTiles.length = 0;
		}
	}

	static processTo(b) {
		if (b === "Black" || b === "White") {
			Controller.#status = b;
			Controller.cleanup();
		} else if (b) {
			renderchess(b);
		} else {
			alert("There was some server error!");
			console.log(b);
			Controller.cleanup();
		}
	}

	static cleanup() {
		let c = document.getElementById("chess");
		c.removeChild(document.getElementById("chessboard"));
		if (Controller.#status) {
			let h = document.createElement("h1");
			h.innerHTML = `${Controller.#status} has Won!`;
			c.appendChild(h);
		}
	}

	static getSide() {
		return this.isBlack() ? "false" : "true";
	}

	static setSide(side) {
		Controller.#side = side;
	}

	static isWhite() {
		return Controller.#side === "white";
	}

	static isBlack() {
		return Controller.#side === "black";
	}

	static freeze() {
		Controller.#freeze = true;
	}

	static unfreeze() {
		Controller.#freeze = false;
	}
}
