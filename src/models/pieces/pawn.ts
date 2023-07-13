import { Square } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Pawn extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'PAWN'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
}