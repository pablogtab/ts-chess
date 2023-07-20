import { createContext, useContext } from 'react'

import { Square } from "../models/square"
import { SquareActions } from "../hooks/useSquares"


type ChessContextType = {
    chessTableRef: React.RefObject<HTMLDivElement>
    squares: Square[]
    turn: 'white' | 'black'
    moveIfDrops: { x: number, y: number } | null
    posibleMoves: ({ x: number, y: number })[],
    lastTouchedSquare: Square | null,
    lastMove: { from: ({ x: number, y: number }), to: ({ x: number, y: number }) } | null
    kingInCheck: 'white' | 'black' | null
} | undefined

type ChessDispatchContextType = {
    dispatch: React.Dispatch<SquareActions>,
    setTurn: React.Dispatch<'white' | 'black'>
    setMoveIfDrops: React.Dispatch<{ x: number, y: number } | null>
    setKingInCheck: React.Dispatch<'white' | 'black' | null>
    setPosibleMoves: React.Dispatch<({ x: number, y: number })[]>
    setLastMove: React.Dispatch<{ from: ({ x: number, y: number }), to: ({ x: number, y: number }) } | null>
    setLastTouchedSquare: React.Dispatch<Square | null>
    handleMove: ((value: Square) => void)
} | undefined

export const ChessContext = createContext<ChessContextType>(undefined)
export const ChessDispatchContext = createContext<ChessDispatchContextType>(undefined)

export const useChessContext = () => {
    const context = useContext(ChessContext)
    if (context === undefined) {
        throw new Error("useChessContext must be within ChessContextProvider")
    }
    return context
}

export const useChessDispatchContext = () => {
    const context = useContext(ChessDispatchContext)
    if (context === undefined) {
        throw new Error("useChessDispatchContext must be within ChessContextProvider")
    }
    return context
}
