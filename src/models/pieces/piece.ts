import { Square } from "../square"

export class Piece {
    type: PieceType
    color: 'white' | 'black'
}

export abstract class PieceMethods {
    movePosibilities: (squareMap: Square[]) => Square[]
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