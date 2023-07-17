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
}

export const ChessTableContext = createContext<ChessContext>({ chessTableRef: undefined, squares: [], dispatch: undefined })


export const ChessTable = () => {

    const chessTableRef = createRef<HTMLDivElement>()
    const { squares, dispatch } = useChess()

    const SquareRender = ({ value }: { value: Square }) => {
        return (
            <div className='square' style={{
                backgroundColor: value.color,
                top: (SQUARE_SIZE * value.y) + 'px', width: SQUARE_SIZE + 'px', height: SQUARE_SIZE + 'px',
                left: (SQUARE_SIZE * value.x) + 'px'
            }}>
            </div>
        )
    }

    return (
        <ChessTableContext.Provider value={{
            chessTableRef,
            squares,
            dispatch
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
            </div>
        </ChessTableContext.Provider>
    )
}

