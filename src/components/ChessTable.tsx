import './component-styles/ChessTable.css';

import { createContext, createRef, useContext, useEffect, useRef, useState } from 'react';

import { SquareActions, useChess } from '../hooks/useSquares';
import { Square } from '../models/square';
import { DraggablePiece } from './DraggablePiece';
import { ChessContext, ChessDispatchContext } from '../context/ChessContext';

export const SQUARE_SIZE = 80


export const ChessTable = () => {

    const chessTableRef = createRef<HTMLDivElement>()
    const { squares, dispatch } = useChess()
    const [turn, setTurn] = useState<'white' | 'black'>('white')
    const [moveIfDrops, setMoveIfDrops] = useState<{ x: number, y: number } | null>(null)
    const [posibleMoves, setPosibleMoves] = useState<{ x: number, y: number }[]>([])
    const [lastTouchedSquare, setLastTouchedSquare] = useState<Square | null>(null)
    const [lastMove, setLastMove] = useState<{ from: ({ x: number, y: number }), to: ({ x: number, y: number }) } | null>(null)

    const handleMove = (value: Square) => {
        if (lastTouchedSquare && lastTouchedSquare.piece) {
            if (lastTouchedSquare.piece.isValidMove(squares.filter(sq => sq.piece), [lastTouchedSquare.x, lastTouchedSquare.y], [value.x, value.y])) {
                if (dispatch !== undefined && lastTouchedSquare) {
                    let tmp = Square.fromPiecedSquare(JSON.parse(JSON.stringify(lastTouchedSquare)) as Square)
                    dispatch({ type: 'piece_delete', payload: lastTouchedSquare })
                    tmp.x = value.x
                    tmp.y = value.y
                    setTimeout(() => {
                        dispatch({ type: 'piece_reset', payload: tmp })
                    }, 5)
                }
                setTurn(turn === 'black' ? 'white' : 'black')
                if (setPosibleMoves) setPosibleMoves([])
                if (setLastTouchedSquare) setLastTouchedSquare(null)
            }
            else {
                setLastTouchedSquare(null)
                setPosibleMoves([])
            }
        }
    }

    const SquareRender = ({ value }: { value: Square }) => {

        const returnContextBackgroundColor = (): string => {
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
            moveIfDrops, posibleMoves, lastTouchedSquare, lastMove
        }}>
            <ChessDispatchContext.Provider value={{
                dispatch, setTurn, setMoveIfDrops, setPosibleMoves,
                setLastTouchedSquare, handleMove, setLastMove,
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
            </ChessDispatchContext.Provider>
        </ChessContext.Provider>

    )
}

