import { Bishop } from './bishop';
import { King } from './king';
import { Knight } from './knight';
import { Pawn } from './pawn';
import { Queen } from './queen';
import { Rook } from './rook';




export type Pieces = Queen | King | Pawn | Knight | Bishop | Rook

export const PIECES = {
    PAWN: { name: 'Pawn', value: 1 },
    ROOK: { name: 'Rook', value: 5, },
    KNIGHT: { name: 'Knight', value: 3, },
    BISHOP: { name: 'Bishop', value: 3, },
    KING: { name: 'King', value: 100, },
    QUEEN: { name: 'Queen', value: 9, },
} as const




export type PieceType = keyof typeof PIECES



export class Piece {
    type: PieceType
    color: 'white' | 'black'
    constructor(type: PieceType, color: 'white' | 'black') {
        this.color = color
        this.type = type
    }
}
