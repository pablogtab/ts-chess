import { Square, getAllPiecedSquares } from "../square";
import { Piece, PieceMethods } from "./piece";

export class Bishop extends Piece implements PieceMethods {
    color: 'white' | 'black'

    constructor(color: 'white' | 'black') {
        super()
        this.type = 'BISHOP'
        this.color = color
    }

    movePosibilities: (squareMap: Square[]) => Square[];
    isValidMove = ([fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
        if (Math.abs(fromX - toX) - Math.abs(fromY - toY) !== 0) return false
        let moves = Math.abs(toX - fromX)
        let direction: 'upleft' | 'upright' | 'downleft' | 'downright'
        if (toX > fromX) {
            direction = toY > fromY ? 'downright' : 'upright'
        } else {
            direction = toY > fromY ? 'downleft' : 'upleft'
        }
        let squares = getAllPiecedSquares()

        for (let i = 1; i < moves; i++) {
            switch (direction) {
                case "upleft":
                    if (squares.filter(sq => sq.x === (toX + i) && sq.y === (toY + i)).length > 0) return false
                case "upright":
                    if (squares.filter(sq => sq.x === toX - i && sq.y === (toY + i)).length > 0) return false
                case "downleft":
                    if (squares.filter(sq => sq.x === (fromX - i) && sq.y === (fromY + i)).length > 0) return false
                case "downright":
                    if (squares.filter(sq => sq.x === (fromX + i) && sq.y === (fromY + i)).length > 0) return false
            }
        }

        if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece.color === this.color).length > 1) return false

        return true
    }
}