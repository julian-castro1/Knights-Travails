import { state } from "./index.js";
import knightImg from "./knight.png";
import endImg from "./end.png";


// define dialogs
const inst_dialog = {
  SET_START: "Click a spot on the chess board to place the knight",
  SET_END: "Now click the target location, then click 'Solve'",
  SOLVED: "Solved! Click 'Reset' to try another scenario",
};
const butt_dialog = { SET_START: "Next", SET_END: "Solve", SOLVED: "Reset" };

export function drawDialog(state){
  let instructions = document.getElementById("curr_instruction").innerHTML = inst_dialog[state];
  let actionBut = document.getElementById("action_button").innerHTML = butt_dialog[state];
}
export function setOutput(sol, toggle){
  if (toggle){
    document.getElementById("res_out").innerHTML = `${sol.length-1} moves required to reach target`;
  } else {
    document.getElementById("res_out").innerHTML = "-";
  }

}

const hslUpper = 330;
const hslLower = 0;
const hslStep = (hslUpper - hslLower) / 5;
export function drawLoc(loc, moves) {
  let id = `${loc[0]},${loc[1]}`;
  let ele = document.getElementById(id);

  let cir = document.createElement("div");
  cir.classList.add("circle");
  cir.style.backgroundColor = `hsl(${hslLower + moves * hslStep}, 80%, 50%)`;
  cir.innerHTML = moves;

  if (moves == "final") {
    // change everything from whole backgroudn to just border
    document.querySelectorAll(".circle").forEach((item) => {
      let color = item.style.backgroundColor;
      item.style.border = `3px solid ${color}`;
      item.style.backgroundColor = "transparent";
    });

    // draw the end location
    cir.style.backgroundColor = "red";
    cir.innerHTML = "END";
    ele.innerHTML = "";
    cir.classList.add("end");
    ele.appendChild(cir);

    return;
  } else if (moves == "trace"){
    // get div within ele and set background to green
    // get div within ele and set background to green
    let existingCircle = ele.querySelector(".circle");
    if (existingCircle) {
      existingCircle.classList.add("trace");
      existingCircle.style.border = "0";
      existingCircle.style.backgroundColor = "hsl(122,88%,42%)";
    }
    return;
  } else {
    ele.appendChild(cir);
  }
}

export class chessBoard {
  ROWS = 8;
  COLUMNS = 8;

  startLoc = "-1,-1";
  endLoc = "-1,-1";
  start_chosen = false;
  end_chosen = false;

  constructor() {
    this.createBoard();
  }

  createBoard() {
    // set dimensions of grid
    let boardParent = document.getElementById("board");
    boardParent.style.display = "grid";
    boardParent.style.gridTemplateRows = "repeat(8, 4.5vw)"; // 8 rows, each taking an equal fraction of the height
    boardParent.style.gridTemplateColumns = "repeat(8, 4.5vw)"; // 8 columns each of 12.5% of the parent width

    // create each tile
    let color = ["white", "black"];
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLUMNS; j++) {
        let ele = document.createElement("div");
        ele.classList.add("tile");
        ele.classList.add(color[(i + j) % 2]); // alternate between white and black based on row and column
        ele.setAttribute("id", `${i},${j}`); // set the id as [row, column]
        ele.addEventListener("click", this.boardClicked.bind(this));

        boardParent.appendChild(ele);
      }
    }
  }

  boardClicked() {
    // handle event based on game state 'state'
    if (state == "SET_START") {
      this.drawKnight(event.currentTarget);
    } else if (state == "SET_END") {
      this.drawEnd(event.currentTarget);
    }
  }
  drawKnight(ele) {
    if (this.start_chosen) {
      // the knight needs to be cleared before drawn in new loc
      this.clearTile(this.startLoc);
    }

    // draw new knight
    this.startLoc = ele.getAttribute("id");
    let imgEle = document.createElement("img");
    imgEle.src = knightImg;
    imgEle.classList = "knight";
    ele.appendChild(imgEle);
    this.start_chosen = true;
  }
  drawEnd(ele){
    if (this.end_chosen) {
      // the end loc needs to be cleared before drawn in new loc
      this.clearTile(this.endLoc);
    }

    // draw new end loc
    this.endLoc = ele.getAttribute("id");
    let imgEle = document.createElement("img");
    imgEle.src = endImg;
    imgEle.classList = "end";
    ele.appendChild(imgEle);
    this.end_chosen = true;
  }
  drawPath(solution) {
    // reverse solution to get path from start to end
    solution.reverse();

    // draw the path
    for (let i = 0; i < solution.length; i++) {
      let loc = solution[i];
      if (i != solution.length - 1){
        drawLoc(loc, "trace");
      }
    }
  }
  clearTile(loc) {
    console.log(loc);
    document.getElementById(loc).innerHTML = "";
  }
  clearBoard() {
    document.getElementById("board").innerHTML = "";
    this.createBoard();
    this.start_chosen = false;
    this.end_chosen = false;
  }
}