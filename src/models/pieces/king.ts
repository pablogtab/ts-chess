import { Square } from '../square';
import { Piece, PieceMethods } from './piece';

export class King extends Piece implements PieceMethods {
    constructor(color: 'white' | 'black') {
        super('KING',color)
    }

    isValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {

        let difX = Math.abs(toX - fromX)
        let difY = Math.abs(toY - fromY)
        if (difX > 1 || difY > 1) return false

        if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === this.color).length > 0) return false

        return true
    }
}