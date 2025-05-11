import { Controller } from "./controller.js";

export class SocketKeeper {
	#socket;
	constructor(socket) {
		this.#socket = socket;
	}
	get socket() {
		return this.#socket;
	}
}

export const init = (side, flag) => {
	console.log("Executing init of render-board.js");
	Controller.setSide(side);
	if (flag) Controller.unfreeze();
	const chess = document.getElementById("chess");
	const board = document.createElement("div");
	board.setAttribute("id", "chessboard");
	// board.style.borderColor = "brown";
	board.setAttribute("data-side", side);
	chess.appendChild(board);
	socket.emit("startposition");
};

function nextChar(c) {
	return String.fromCharCode(c.charCodeAt(0) + 1);
}
function prevChar(c) {
	return String.fromCharCode(c.charCodeAt(0) - 1);
}

function createFilesHeader(side) {
	let thead = document.createElement("thead");
	if (side === "white") {
		thead.appendChild(document.createElement("th"));
		for (var colname = "a"; colname <= "h"; colname = nextChar(colname)) {
			let th = document.createElement("th");
			thead.appendChild(th);
			th.innerHTML = colname;
			th.setAttribute("class", "edge");
		}
		thead.appendChild(document.createElement("th"));
	} else {
		thead.appendChild(document.createElement("th"));
		for (var colname = "h"; colname >= "a"; colname = prevChar(colname)) {
			let th = document.createElement("th");
			thead.appendChild(th);
			th.innerHTML = colname;
			th.setAttribute("class", "edge");
		}
		thead.appendChild(document.createElement("th"));
	}
	return thead;
}

function createBoard(table, boardposition, side) {
	if (side === "white") {
		for (var row = 7; row >= 0; row--) {
			var tr = document.createElement("TR");
			table.appendChild(tr);
			tr.id = "tr" + (row + 1);
			var td = document.createElement("TD");
			tr.appendChild(td);
			td.innerHTML = row + 1;
			td.className = "displayrow";
			for (var col = 0; col <= 7; col++) {
				td = document.createElement("TD");
				td.style.fontSize = "2em";
				td.innerHTML = boardposition[7 - row][col];
				td.addEventListener("click", (e) => {
					Controller.dispatch(e);
				});
				td.setAttribute("data-row", row);
				td.setAttribute("data-col", col);
				td.setAttribute("data-side", true);
				if ((row + col) % 2 == 0) {
					td.setAttribute("class", "black");
				} else {
					td.setAttribute("class", "white");
				}
				tr.appendChild(td);
			}
			td = document.createElement("TD");
			tr.appendChild(td);
			td.innerHTML = row + 1;
			td.className = "displayrow";
		}
	} else {
		for (var row = 0; row <= 7; row++) {
			var tr = document.createElement("TR");
			table.appendChild(tr);
			tr.id = "tr" + (row + 1);
			var td = document.createElement("TD");
			tr.appendChild(td);
			td.innerHTML = row + 1;
			td.className = "displayrow";
			for (var col = 7; col >= 0; col--) {
				td = document.createElement("TD");
				td.style.fontSize = "2em";
				td.innerHTML = boardposition[7 - row][col];
				td.addEventListener("click", (e) => {
					Controller.dispatch(e);
				});
				td.setAttribute("data-row", row);
				td.setAttribute("data-col", col);
				td.setAttribute("data-side", false);
				if ((row + col) % 2 == 0) {
					td.setAttribute("class", "black");
				} else {
					td.setAttribute("class", "white");
				}
				tr.appendChild(td);
			}
			td = document.createElement("TD");
			tr.appendChild(td);
			td.innerHTML = row + 1;
			td.className = "displayrow";
		}
	}
}

function renderBoard(root, boardposition) {
	// Table will be at the root of rpiChessDOM
	let table = document.createElement("table");
	table.setAttribute("id", "chess-board-table");
	let side = root.dataset["side"];
	// Attach table to root
	root.appendChild(table);
	// Create header-file for board
	table.appendChild(createFilesHeader(side));
	createBoard(table, boardposition, side);
	// Create footer-file for board
	table.appendChild(createFilesHeader(side));
}

export function renderchess(b) {
	let c = document.getElementById("chessboard");
	if (c.firstChild) c.removeChild(c.firstChild);
	renderBoard(c, b);
}

// First check correct transfer of values independently
export function firstBoard() {
	// socket.emit("board_first_render");

	socket.emit("give_me_values");

	socket.on("Server_giving_values", (playerid, teamid) => {
		socket.emit("play-service", playerid, teamid);
	});

	// socket.emit("play-service", arr[count1++], arr1[count2++]);
}

export let socket = io();
Controller.init(socket);
