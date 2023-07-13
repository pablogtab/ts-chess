import { Square } from "../square";
import { Piece, PieceMethods } from "./piece";

export class King extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'KING'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
}