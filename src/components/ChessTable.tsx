import './component-styles/ChessTable.css';

import { createContext, createRef, useContext, useEffect, useRef, useState } from 'react';

import { ChessContext, ChessDispatchContext } from '../context/ChessContext';
import { useChess } from '../hooks/useSquares';
import { bestNextMove, chessSquaresAfterMove, isAnyKingInCheck, valorateCurrentPosition } from '../models/chess';
import { Square } from '../models/square';
import { DraggablePiece } from './DraggablePiece';
import { isValidMove } from '../models/pieces/moves';

export const SQUARE_SIZE = 80


export const ChessTable = () => {

    const chessTableRef = createRef<HTMLDivElement>()
    const { squares, dispatch } = useChess()
    const [turn, setTurn] = useState<'white' | 'black'>('white')
    const [moveIfDrops, setMoveIfDrops] = useState<{ x: number, y: number } | null>(null)
    const [posibleMoves, setPosibleMoves] = useState<{ x: number, y: number }[]>([])
    const [lastTouchedSquare, setLastTouchedSquare] = useState<Square | null>(null)
    const [lastMove, setLastMove] = useState<{ from: ({ x: number, y: number }), to: ({ x: number, y: number }) } | null>(null)
    const [kingInCheck, setKingInCheck] = useState<'white' | 'black' | null>(null)
    let interval: any

    useEffect(() => {

        if (turn === 'black') {
            setTimeout(() => {

                let move = bestNextMove(squares, turn, 3)
                if (move) {
                    let sqFrom = squares.find(sq => sq.x === move?.fromX && sq.y === move?.fromY)
                    let sqTo = squares.find(sq => sq.x === move?.toX && sq.y === move?.toY)
                    if (sqFrom && sqTo && sqFrom.piece) {
                        let tmp = structuredClone(sqFrom)
                        dispatch({ type: 'piece_delete', payload: sqFrom })
                        tmp.x = sqTo.x
                        tmp.y = sqTo.y
                        dispatch({ type: 'piece_reset', payload: tmp })
                        setTurn(turn === 'black' ? 'white' : 'black')

                        setLastMove({ from: { x: sqFrom.x, y: sqFrom.y }, to: { x: tmp.x, y: tmp.y } })
        }
    }
            }, 400)
        }

valorateCurrentPosition(squares)
    }, [turn])




const handleMove = (value: Square) => {
    if (lastTouchedSquare && lastTouchedSquare.piece) {
        let type = lastTouchedSquare.piece.type
        let color = lastTouchedSquare.color
        if (isValidMove(type)(squares.filter(sq => sq.piece), [lastTouchedSquare.x, lastTouchedSquare.y], [value.x, value.y], color)) {

            //isKingInCheck
            let squaresIfMoved = chessSquaresAfterMove(squares, [lastTouchedSquare.x, lastTouchedSquare.y], [value.x, value.y])
            let check = isAnyKingInCheck(squaresIfMoved)

            if (turn === 'black' && check.black) return
            if (turn === 'white' && check.white) return

            if (check.black) setKingInCheck('black')
            else if (check.white) setKingInCheck('white')
            else setKingInCheck(null)

            if (lastTouchedSquare) {
                let tmp = structuredClone(lastTouchedSquare)
                dispatch({ type: 'piece_delete', payload: lastTouchedSquare })
                tmp.x = value.x
                tmp.y = value.y
                dispatch({ type: 'piece_reset', payload: tmp })
            }
            if (setPosibleMoves) setPosibleMoves([])
            if (setLastTouchedSquare) setLastTouchedSquare(null)

            setTurn(turn === 'black' ? 'white' : 'black')
        }
        else {
            setLastTouchedSquare(null)
            setPosibleMoves([])
        }
    }
}

const SquareRender = ({ value }: { value: Square }) => {

    const returnContextBackgroundColor = (): string => {
        if (kingInCheck && value.piece && value.piece.type === 'KING' && kingInCheck === value.piece.color) return '#EC7E6D'
        if (lastMove?.from.x === value.x && lastMove.from.y === value.y) return value.color === 'white' ? '#F7F681' : '#BACB3E'
        if (lastMove?.to.x === value.x && lastMove.to.y === value.y) return value.color === 'white' ? '#F7F681' : '#BACB3E'
        if (lastTouchedSquare?.x === value.x && lastTouchedSquare.y === value.y) return value.color === 'white' ? '#F7F681' : '#BACB3E'
        return value.color === 'white' ? '#EEEED2' : '#769656'
    }

    return (
        <div className={'square' + ((moveIfDrops?.x === value.x && moveIfDrops?.y === value.y) ? ' dropping' : '')} style={{
            backgroundColor: returnContextBackgroundColor(),
            top: (SQUARE_SIZE * value.y) + 'px', width: SQUARE_SIZE + 'px', height: SQUARE_SIZE + 'px',
            left: (SQUARE_SIZE * value.x) + 'px'
        }}
            onClick={() => handleMove(value)}
        >
            {
                value.x === 0 &&
                <p style={{ userSelect: 'none', position: 'absolute', fontWeight: 600, color: value.color === 'black' ? '#EEEED2' : '#769656', marginTop: 1, marginLeft: 5, fontSize: '18px' }}>{value.y + 1}</p>
            }
            {
                value.y === 7 &&
                <p style={{ userSelect: 'none', position: 'absolute', fontWeight: 600, color: value.color === 'black' ? '#EEEED2' : '#769656', bottom: '-18px', right: 5 }}>{String.fromCharCode('a'.charCodeAt(0) + value.x)}</p>
            }
            {
                posibleMoves.length > 0 && posibleMoves.find(pm => pm.x === value.x && pm.y === value.y) && <div className='posible-move'></div>
            }
        </div>
    )
}

return (
    <ChessContext.Provider value={{
        chessTableRef, squares, turn,
        moveIfDrops, posibleMoves, lastTouchedSquare, lastMove, kingInCheck
    }}>
        <ChessDispatchContext.Provider value={{
            dispatch, setTurn, setMoveIfDrops, setPosibleMoves,
            setLastTouchedSquare, handleMove, setLastMove, setKingInCheck
        }}>
            <div className='container' >
                <div className='chess-container'>
                    <div className='chess-table' ref={chessTableRef}>
                        {
                            squares.length > 0 && squares.map((square, index) => <SquareRender value={square} key={index} />)
                        }
                        {
                            squares.length > 0 &&
                            squares.map((square, index) =>
                                square.piece && <DraggablePiece piece={square.piece} initialXPosition={square.x} initialYPosition={square.y} key={index} />
                            )
                        }
                    </div>
                </div>
            </div>
            <div>{JSON.stringify(kingInCheck)}</div>
        </ChessDispatchContext.Provider>
    </ChessContext.Provider>

)
}

