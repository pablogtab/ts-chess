import { Square } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Rook extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'ROOK'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
}