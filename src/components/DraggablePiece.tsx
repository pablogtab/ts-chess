import Draggable from "react-draggable"
import { Piece, PieceMethods } from "../models/pieces/piece"
import { useContext, useRef } from "react"
import { ChessTableContext } from "./ChessTable"
import { Pieces, Square } from "../models/square"
import { SQUARE_SIZE } from "../models/chess-table"







export const DraggablePiece = ({ piece, initialXPosition, initialYPosition }: { piece: Pieces, initialXPosition: number, initialYPosition: number }) => {

    const nodeRef = useRef(null)
    const { chessTableRef, squares, dispatch } = useContext(ChessTableContext)

    const onPieceDrop = (event: any) => {
        let y = Math.floor((event.y - (chessTableRef?.current?.offsetTop ?? 0)) / 80)
        let x = Math.floor((event.x - (chessTableRef?.current?.clientLeft ?? 0)) / 80)
        let sq = squares.find(sq => sq.x === initialXPosition && sq.y === initialYPosition)
        let toSquare = squares.find(sq => sq.x === x && sq.y === y)

        if (!sq || !sq.piece || !dispatch) return

        if (!toSquare || !sq.piece.isValidMove(squares.filter(sq => sq.piece), [initialXPosition, initialYPosition], [x, y])) return resetPiece(sq)

        movePiece(sq, toSquare)

    }

    const movePiece = (fromSq: Square, toSq: Square) => {
        if (dispatch !== undefined && fromSq) {
            let tmp = Square.fromPiecedSquare(JSON.parse(JSON.stringify(fromSq)) as Square)
            dispatch({ type: 'piece_delete', payload: fromSq })
            tmp.x = toSq.x
            tmp.y = toSq.y
            setTimeout(() => {
                dispatch({ type: 'piece_reset', payload: tmp })
            }, 5)
        }
    }

    const resetPiece = (sq: Square | undefined) => {
        if (dispatch !== undefined && sq) {
            let tmp = Square.fromPiecedSquare(JSON.parse(JSON.stringify(sq)) as Square)
            dispatch({ type: 'piece_delete', payload: sq });
            setTimeout(() => {
                dispatch({ type: 'piece_reset', payload: tmp })
            }, 5)
        }
    }
    return (
        <Draggable nodeRef={nodeRef} defaultPosition={{ x: initialXPosition * SQUARE_SIZE, y: initialYPosition * SQUARE_SIZE }} defaultClassName="draggablePiece" onStart={() => console.log('start', piece)} onStop={onPieceDrop} >
            <div style={{ zIndex: 100 }} ref={nodeRef} >
                <p style={{ color: piece?.color === 'black' ? 'red' : 'green' }}>{piece ? piece.type : ''}</p>
            </div>
        </Draggable>
    )
}



