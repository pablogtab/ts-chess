import { Square } from '../square';
import { chessSquaresAfterMove, isAnyKingInCheck } from './chess';

export class Piece {
    type: PieceType
    color: 'white' | 'black'
    constructor(type: PieceType, color: 'white' | 'black') {
        this.color = color
        this.type = type
    }
    movePosibilities: (all64squares: Square[], origin: Square, checkAnalisys?: boolean) => Square[] = (all64squares: Square[], origin: Square, checkAnalisys: boolean = true) => {
        if (!origin.piece) return []
        let posibleMoves = all64squares.filter(sq => !(sq.x === origin.x && sq.y === origin.y) && origin.piece?.isValidMove(all64squares.filter(sq => sq.piece), [origin.x, origin.y], [sq.x, sq.y]))
        if (checkAnalisys) {
            posibleMoves = posibleMoves.filter(posibleMove => {
                let chessSquares = chessSquaresAfterMove(all64squares, [origin.x, origin.y], [posibleMove.x, posibleMove.y])
                let anyKingInCheck = isAnyKingInCheck(chessSquares)
                if(!anyKingInCheck[this.color]) return true
            })
        }
        return posibleMoves
    }
}

export interface PieceMethods {
    movePosibilities: (squares: Square[], origin: Square, checkAnalisys?: boolean) => ({ x: number, y: number })[]
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