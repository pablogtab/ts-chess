import { ChessTable } from "./models/chess-table";
import "./styles.css"

let chessDiv = document.createElement('div')
document.body.appendChild(chessDiv);


let chessTable = new ChessTable(chessDiv)

chessTable.draw()

