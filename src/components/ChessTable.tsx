import './component-styles/ChessTable.css';

import { createContext, createRef, useEffect, useRef, useState } from 'react';

import { SquareActions, useChess } from '../hooks/useSquares';
import { Square } from '../models/square';
import { DraggablePiece } from './DraggablePiece';

const SQUARE_SIZE = 80

type ChessContext = {
    chessTableRef: React.RefObject<HTMLDivElement> | undefined
    squares: Square[]
    dispatch: React.Dispatch<SquareActions> | undefined,
    turn: 'white' | 'black'
    setTurn: React.Dispatch<'white' | 'black'> | undefined
    moveIfDrops: { x: number, y: number } | null
    setMoveIfDrops: React.Dispatch<{ x: number, y: number } | null> | undefined
}

export const ChessTableContext = createContext<ChessContext>({
    chessTableRef: undefined, squares: [],
    dispatch: undefined,
    turn: 'white',
    setTurn: undefined,
    moveIfDrops: null,
    setMoveIfDrops: undefined
})


export const ChessTable = () => {

    const chessTableRef = createRef<HTMLDivElement>()
    const { squares, dispatch } = useChess()
    const [turn, setTurn] = useState<'white' | 'black'>('white')
    const [moveIfDrops, setMoveIfDrops] = useState<{ x: number, y: number } | null>(null)


    const SquareRender = ({ value }: { value: Square }) => {
        return (
            <div className={'square' + ((moveIfDrops?.x === value.x && moveIfDrops?.y === value.y) ? ' dropping' : '')} style={{
                backgroundColor: value.color === 'white' ? '#769656' : '#EEEED2',
                top: (SQUARE_SIZE * value.y) + 'px', width: SQUARE_SIZE + 'px', height: SQUARE_SIZE + 'px',
                left: (SQUARE_SIZE * value.x) + 'px'
            }}>
                {
                    value.x === 0 &&
                    <p style={{ userSelect: 'none', position: 'absolute', fontWeight: 600, color: value.color === 'black' ? '#769656' : '#EEEED2', marginTop: 1, marginLeft: 5, fontSize: '18px' }}>{value.y + 1}</p>
                }
                {
                    value.y === 7 &&
                    <p style={{ userSelect: 'none', position: 'absolute', fontWeight: 600, color: value.color === 'black' ? '#769656' : '#EEEED2', bottom: '-18px', right: 5 }}>{String.fromCharCode('a'.charCodeAt(0) + value.x)}</p>
                }
            </div>
        )
    }

    return (
        <ChessTableContext.Provider value={{
            chessTableRef,
            squares,
            dispatch,
            turn,
            setTurn,
            moveIfDrops,
            setMoveIfDrops
        }}>
            <div className='container' >
                <div className='chess-container'>
                    <div className='chess-table' ref={chessTableRef}>
                        {
                            squares.length > 1 &&
                            squares.map((square, index) => <SquareRender value={square} key={index} />)
                        }
                        {
                            squares.length > 1 &&
                            squares.map((square, index) =>
                                square.piece && <DraggablePiece piece={square.piece} initialXPosition={square.x} initialYPosition={square.y} key={index} />
                            )
                        }
                    </div>
                </div>
                <p>Turno:{JSON.stringify(turn)}</p>
            </div>
        </ChessTableContext.Provider>
    )
}

