import { Square, getAllPiecedSquares } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Knight extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'KNIGHT'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
    isValidMove = ([fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {

        let xDif = Math.abs(fromX - toX)
        let yDif = Math.abs(fromY - toY)

        if (xDif === 1 && yDif === 2 || xDif === 2 && yDif === 1) {
            if (getAllPiecedSquares().filter(sq => sq.x === toX && sq.y === toY && sq.piece.color === this.color).length > 1) return false
            return true
        }

        return false
    }
}