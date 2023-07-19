import { Square } from '../square';
import { Piece, PieceMethods } from './piece';

export class Rook extends Piece implements PieceMethods {

    constructor(color: 'white' | 'black') {
        super('ROOK', color)
    }


    isValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
        if (fromX !== toX && toY !== fromY) return false

        let moves = Math.abs(toX !== fromX ? (fromX - toX) : (fromY - toY))

        for (let i = 1; i < moves; i++) { //collition between
            if (toX !== fromX) {
                if (toX > fromX) {
                    if (squares.filter(sq => sq.x === fromX + i && sq.y === toY).length > 0) return false
                } else {
                    if (squares.filter(sq => sq.x === toX + i && sq.y === toY).length > 0) return false
                }
            } else {
                if (toY > fromY) {
                    if (squares.filter(sq => sq.y === fromY + i && sq.x === toX).length > 0) return false
                } else {
                    if (squares.filter(sq => sq.y === toY + i && sq.x === toX).length > 0) return false
                }
            }
        }

        if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === this.color).length > 0) return false

        return true
    }

}