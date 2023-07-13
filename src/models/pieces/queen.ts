import { Square } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Queen extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'QUEEN'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
}