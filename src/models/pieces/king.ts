import { Square, getAllPiecedSquares } from "../square";
import { Piece, PieceMethods } from "./piece";

export class King extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'KING'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
    isValidMove = ([fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {

        let difX = Math.abs(toX - fromX)
        let difY = Math.abs(toY - fromY)
        if (difX > 1 || difY > 1) return false

        if (getAllPiecedSquares().filter(sq => sq.x === toX && sq.y === toY && sq.piece.color === this.color).length > 1) return false

        return true
    }
}