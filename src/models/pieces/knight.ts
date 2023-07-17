import { Square, getAllPiecedSquares } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Knight extends Piece implements PieceMethods {

    constructor(color: 'white' | 'black') {
        super('KNIGHT', color)
    }


    movePosibilities: (squareMap: Square[]) => Square[] = () => []
    isValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {

        let xDif = Math.abs(fromX - toX)
        let yDif = Math.abs(fromY - toY)

        if ((xDif === 1 && yDif === 2) || (xDif === 2 && yDif === 1)) {
            if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === this.color).length > 0) return false
            return true
        }

        return false
    }
}