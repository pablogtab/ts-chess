import { Square, getAllPiecedSquares } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Pawn extends Piece implements PieceMethods {

    constructor(color: 'white' | 'black') {
        super('ROOK', color)
    }



    movePosibilities: (squareMap: Square[]) => Square[] = () => []

    isValidMove = ([fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
        if (Math.abs(fromX - toX) > 1) return false
        if (this.color === 'black' && fromY >= toY) return false
        if (this.color === 'white' && fromY <= toY) return false

        let squares = getAllPiecedSquares()
        let rivalPiecedSquares = squares.filter(sq => sq.piece?.color !== this.color)

        if (Math.abs(fromY - toY) === 1) {
            if (Math.abs(fromX - toX) === 0) {
                if (squares.filter(sq => sq.x === toX && sq.y === toY).length > 1) return false
                return true
            } else {
                if (rivalPiecedSquares.filter(sq => sq.x === toX && sq.y === toY).length > 0) return true
                else return false
            }
        } if (Math.abs(fromY - toY) === 2 && Math.abs(fromX - toX) === 0) {
            if (this.color === 'black' && fromY !== 1 || this.color === 'white' && fromY !== 6) return false
            if (squares.filter(sq => sq.x === toX && sq.y === toY).length > 1) return false
            if (squares.filter(sq => sq.x === toX && sq.y === (this.color === 'white' ? 5 : 2)).length > 0) return false
            return true
        }

        return false
    };
}