import { useReducer } from "react"
import { Square } from "../models/square"
import { Rook } from "../models/pieces/rook"
import { Knight } from "../models/pieces/knight"
import { Bishop } from "../models/pieces/bishop"
import { Queen } from "../models/pieces/queen"
import { King } from "../models/pieces/king"
import { Pawn } from "../models/pieces/pawn"

export type SquareActions =
    | { type: 'test' }
    | { type: 'piece_move', payload: { from: Square, to: Square } }
    | { type: 'piece_reset', payload: Square }
    | { type: 'piece_delete', payload: Square }

const getInitialState: () => Square[] = () => {
    let sqrs: Square[] = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let sqr = new Square(j, i)
            if (i === 0) {
                switch (j) {
                    case 0: sqr.piece = new Rook('black'); break;
                    case 1: sqr.piece = new Knight('black'); break;
                    case 2: sqr.piece = new Bishop('black'); break;
                    case 3: sqr.piece = new Queen('black'); break;
                    case 4: sqr.piece = new King('black'); break;
                    case 5: sqr.piece = new Bishop('black'); break;
                    case 6: sqr.piece = new Knight('black'); break;
                    case 7: sqr.piece = new Rook('black'); break;
                }
            } else if (i === 1) { sqr.piece = new Pawn('black') }
            else if (i === 6) { sqr.piece = new Pawn('white') }
            else if (i === 7) {
                switch (j) {
                    case 0: sqr.piece = new Rook('white'); break;
                    case 1: sqr.piece = new Knight('white'); break;
                    case 2: sqr.piece = new Bishop('white'); break;
                    case 3: sqr.piece = new Queen('white'); break;
                    case 4: sqr.piece = new King('white'); break;
                    case 5: sqr.piece = new Bishop('white'); break;
                    case 6: sqr.piece = new Knight('white'); break;
                    case 7: sqr.piece = new Rook('white'); break;
                }
            }
            sqrs.push(sqr)
        }
    }

    return sqrs
}


const reducer = (state: Square[], action: SquareActions) => {
    switch (action.type) {
        case 'piece_move': return pieceMove(state, action.payload.from, action.payload.to);
        case 'piece_reset': return pieceReset(state, action.payload);
        case 'piece_delete': return pieceDelete(state, action.payload);
        default: return state
    }
}

const pieceMove = (squares: Square[], from: Square, to: Square): Square[] => {
    let fromSquareIndex = squares.findIndex(sq => sq.x === from.x && sq.y === from.y)
    let toSquareIndex = squares.findIndex(sq => sq.x === to.x && sq.y === to.y)

    squares[fromSquareIndex].piece = null
    squares[toSquareIndex].piece = from.piece

    return squares
}

const pieceReset = (squares: Square[], reset: Square): Square[] => {
    let sq = squares.find(sq => sq.x === reset.x && sq.y === reset.y)
    if (sq) sq.piece = reset.piece
    return [...squares]
}

const pieceDelete = (squares: Square[], reset: Square): Square[] => {
    let sq = squares.find(sq => sq.x === reset.x && sq.y === reset.y)
    if (sq) sq.piece = null
    return [...squares]
}


export const useChess = () => {

    const [squares, dispatch] = useReducer(reducer, getInitialState())

    return {
        squares,
        dispatch,
    }
}









