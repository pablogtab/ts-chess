import { Square } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Bishop extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'BISHOP'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
}