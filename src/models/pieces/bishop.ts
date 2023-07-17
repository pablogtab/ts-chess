import { Square, getAllPiecedSquares } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Bishop extends Piece implements PieceMethods {

    constructor(color: 'white' | 'black') {
        super('BISHOP', color)
    }

    movePosibilities: (squareMap: Square[]) => Square[] = () => []
    isValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
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
                    if (squares.filter(sq => sq.x === (toX + i) && sq.y === (toY + i)).length > 0) return false;
                    break;;
                case "upright":
                    if (squares.filter(sq => sq.x === toX - i && sq.y === (toY + i)).length > 0) return false;
                    break;
                case "downleft":
                    if (squares.filter(sq => sq.x === (fromX - i) && sq.y === (fromY + i)).length > 0) return false;
                    break;
                case "downright":
                    if (squares.filter(sq => sq.x === (fromX + i) && sq.y === (fromY + i)).length > 0) return false;
                    break;
            }
        }

        if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === this.color).length > 0) return false

        return true
    }
}