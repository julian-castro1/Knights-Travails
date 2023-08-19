import "./style.css";
import { chessBoard, drawDialog, setOutput } from "./display_controller";
import { solve } from "./solution.js";

let board = new chessBoard();

document.getElementById("action_button").addEventListener("click", actionBut);


export let state = "SET_START";

export function nextState() {
  // handle event based on game state 'state'
  if (state == "SET_START") {
    state = "SET_END";
  } else if (state == "SET_END") {
    state = "SOLVED";
  } else if (state = "SOLVED"){
    state = "SET_START"
  }
}
function verifyInput(){
  // ensure the begin or end were drawn (depending on the state)
  return (
    (state == "SET_START" && board.start_chosen) ||
    (state == "SET_END" && board.end_chosen) ||
    (state == "SOLVED")
  );
}
function actionBut() {
  if(!verifyInput()){
    alert("Make your selection before proceeding");
    return;
  }
  
  nextState();
  
  if (state == "SET_START") {
    // user just hit reset
    board.clearBoard();
    setOutput(1, false);
    drawDialog(state);
  } else if (state == "SET_END") {
    // user just hit 'next' button after setting start
    drawDialog(state);
  } else if (state == "SOLVED") {
    // user just hit 'solve' button after setting end
    solve(board.startLoc, board.endLoc, [board.ROWS, board.COLUMNS])
      .then((solution) => {
        console.log("SOLUTION: " + solution);
        drawDialog(state);
        board.drawPath(solution);
        setOutput(solution, true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    
  }
}