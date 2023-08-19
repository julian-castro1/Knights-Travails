import { drawLoc } from "./display_controller";

export async function solve(startLoc, endLoc, d){
  // input is the start location of the knight, and the goal end location
  let dict = {};    // dictionary to store loc:parent
  let q = [[parseLoc(startLoc), 0]];       // queue to determine flow (BFS) elements are [loc, moves]
  let t = [[-2,1],[-2,-1],[-1,2],[-1,-2],[1,2],[1,-2],[2,1],[2,-1]]  // all possible movement from 1 location

  dict[startLoc] = "start";

  let debug = 0;
  console.log("length: " + q.length)
  while(q.length){
    // add all possible moves
    let cur = q.shift();
    let curLoc = cur[0];
    let curMove = cur[1];

    console.log("cur: " + curLoc + " " + curMove)
    console.log("curLoc type: " + typeof(curLoc) + ", curMove type: " + typeof(curMove))
    for(let i = 0; i < t.length; i++){
      let tLoc = [curLoc[0] + t[i][0], curLoc[1] + t[i][1]];

      if(isValid(tLoc, d) && !(toString(tLoc) in dict)){
        await new Promise(resolve => setTimeout(resolve, 100)); // Add delay here
        drawLoc(tLoc, curMove + 1);
        dict[toString(tLoc)] = toString(curLoc);
        q.push([tLoc, curMove + 1]);
        if (toString(tLoc) == endLoc) {
          drawLoc(tLoc, "final");
          return trace(dict, endLoc);
        }
      }
    }
  }
}

// checks if location array is valid
function isValid(locArr, d){
  let validRow = locArr[0] >= 0 && locArr[0] < d[0];
  let validCol = locArr[1] >= 0 && locArr[1] < d[1];

  return validRow && validCol;
}
// changes location string to array
function parseLoc(locString){
  let row = parseInt(locString[0]);
  let col = parseInt(locString[2]);

  return [row, col];
}
// changes location array to string
function toString(locArr) {
  let row = locArr[0];
  let col = locArr[1];

  return `${row},${col}`;
}
// traces the endLoc to startLoc
function trace(dict, endLoc){
  console.log("end: " + endLoc)
  let path = [];
  let curLoc = endLoc;
  while(dict[curLoc] != "start"){
    path.push(parseLoc(curLoc));
    curLoc = dict[curLoc];
  }
  path.push(parseLoc(curLoc));

  return path;
}
/*

Notes on solution:

Structures:
1. Dictionary of <loc> : <parentLoc>
2. Queue (implemented as Array with enqueue -> push, dequeque -> pop)

Algorithm:
1. find all possibnle moves from current location (starting at startLoc)
  1. if found in dictionary, ignore
  2. else, add to dictionary and add to queue
2. if location is the 'endLoc'
  1. return trace(dict.endLoc)

*/