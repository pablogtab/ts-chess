import { Square } from '../square';
import { Piece, PieceMethods } from './piece';

export class Queen extends Piece implements PieceMethods {
    constructor(color: 'white' | 'black') {
        super('QUEEN', color)
    }
    isValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
        if (!(fromX !== toX && toY !== fromY)) { // ROOK MOVES
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

        if (Math.abs(fromX - toX) - Math.abs(fromY - toY) !== 0) return false
        let moves = Math.abs(toX - fromX)
        let direction: 'upleft' | 'upright' | 'downleft' | 'downright'
        if (toX > fromX) {
            direction = toY > fromY ? 'downright' : 'upright'
        } else {
            direction = toY > fromY ? 'downleft' : 'upleft'
        }

        for (let i = 1; i < moves; i++) {
            switch (direction) {
                case "upleft":
                    if (squares.filter(sq => sq.x === (toX + i) && sq.y === (toY + i)).length > 0) return false
                    break;
                case "upright":
                    if (squares.filter(sq => sq.x === toX - i && sq.y === (toY + i)).length > 0) return false
                    break;
                case "downleft":
                    if (squares.filter(sq => sq.x === (fromX - i) && sq.y === (fromY + i)).length > 0) return false
                    break;
                case "downright":
                    if (squares.filter(sq => sq.x === (fromX + i) && sq.y === (fromY + i)).length > 0) return false
                    break;
            }
        }

        if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === this.color).length > 0) return false

        return true

    }
}