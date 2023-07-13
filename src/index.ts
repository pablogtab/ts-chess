import { ChessTable } from "./models/chess-table";
import "./styles.css"

function chess() {
  let canvas = document.createElement('div')
  return canvas;
}

let chessDiv = chess()
document.body.appendChild(chessDiv);


let chessTable = new ChessTable(chessDiv)

chessTable.draw()