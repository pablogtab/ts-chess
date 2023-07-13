import { Square } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Knight extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'KNIGHT'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
}