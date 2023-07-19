import { SQUARE_SIZE } from "../chess-table";
import { Square } from "../square"

export class Piece {
    type: PieceType
    color: 'white' | 'black'
    constructor(type: PieceType, color: 'white' | 'black') {
        this.color = color
        this.type = type
    }
    movePosibilities: (squares: Square[], origin: Square) => Square[] = (squares: Square[], origin: Square) => {
        if (!origin.piece) return []
        let posibleMoves = squares.filter(sq => !(sq.x === origin.x && sq.y === origin.y) && origin.piece?.isValidMove(squares.filter(sq => sq.piece), [origin.x, origin.y], [sq.x, sq.y]))
        return posibleMoves
    }
}

export interface PieceMethods {
    movePosibilities: (squares: Square[], origin: Square) => ({ x: number, y: number })[]
    isValidMove: (squares: Square[], from: [number, number], to: [number, number]) => boolean
}



export const PIECES = {
    PAWN: { name: 'Pawn', value: 1 },
    ROOK: { name: 'Rook', value: 5 },
    KNIGHT: { name: 'Knight', value: 3 },
    BISHOP: { name: 'Bishop', value: 3 },
    KING: { name: 'King', value: 0 },
    QUEEN: { name: 'Queen', value: 9 },
} as const

export type PieceType = keyof typeof PIECES