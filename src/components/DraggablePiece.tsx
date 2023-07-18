import { useContext, useRef } from 'react';
import Draggable from 'react-draggable';

import blackBishop from '../assets/bb.png';
import blackKing from '../assets/bk.png';
import blackKnight from '../assets/bn.png';
import blackPawn from '../assets/bp.png';
import blackQueen from '../assets/bq.png';
import blackRook from '../assets/br.png';
import whiteBishop from '../assets/wb.png';
import whiteKing from '../assets/wk.png';
import whiteKnight from '../assets/wn.png';
import whitePawn from '../assets/wp.png';
import whiteQueen from '../assets/wq.png';
import whiteRook from '../assets/wr.png';
import { SQUARE_SIZE } from '../models/chess-table';
import { Piece } from '../models/pieces/piece';
import { Pieces, Square } from '../models/square';
import { ChessTableContext } from './ChessTable';
import './component-styles/DraggablePiece.css'

export const DraggablePiece = ({ piece, initialXPosition, initialYPosition }: { piece: Pieces, initialXPosition: number, initialYPosition: number }) => {

    const nodeRef = useRef(null)
    const { chessTableRef, squares, dispatch, turn, setTurn, moveIfDrops, setMoveIfDrops } = useContext(ChessTableContext)

    const onPieceDrop = (event: any) => {
        let y = Math.floor((event.y - (chessTableRef?.current?.offsetTop ?? 0)) / 80)
        let x = Math.floor((event.x - (chessTableRef?.current?.offsetLeft ?? 0)) / 80)
        let sq = squares.find(sq => sq.x === initialXPosition && sq.y === initialYPosition)
        let toSquare = squares.find(sq => sq.x === x && sq.y === y)

        setTimeout(() => {
            if (setMoveIfDrops) setMoveIfDrops(null)
        }, 40)
        if (!sq || !sq.piece || !dispatch || !setTurn) return

        if (!toSquare || !sq.piece.isValidMove(squares.filter(sq => sq.piece), [initialXPosition, initialYPosition], [x, y])) return resetPiece(sq)

        movePiece(sq, toSquare)
        setTurn(turn === 'black' ? 'white' : 'black')

    }


    const onMoving = (event: any) => {
        if (setMoveIfDrops) {
            let y = Math.floor((event.y - (chessTableRef?.current?.offsetTop ?? 0)) / 80)
            let x = Math.floor((event.x - (chessTableRef?.current?.offsetLeft ?? 0)) / 80)
            if (!(x < 0 || y < 0 || y > 7 || x > 7)) {
                if (moveIfDrops?.x !== x || moveIfDrops.y !== y) {
                    setMoveIfDrops({ x, y })
                }
            } else {
                if (moveIfDrops) {
                    setMoveIfDrops(null)
                }
            }
        }
    }


    const movePiece = (fromSq: Square, toSq: Square) => {
        if (dispatch !== undefined && fromSq && setMoveIfDrops) {
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

    const getPieceImage = (piece: Piece) => {
        switch (piece.type) {
            case "PAWN": return piece.color === 'black' ? blackPawn : whitePawn
            case "ROOK": return piece.color === 'black' ? blackRook : whiteRook
            case "KNIGHT": return piece.color === 'black' ? blackKnight : whiteKnight
            case "BISHOP": return piece.color === 'black' ? blackBishop : whiteBishop
            case "KING": return piece.color === 'black' ? blackKing : whiteKing
            case "QUEEN": return piece.color === 'black' ? blackQueen : whiteQueen
        }
    }

    return (
        <Draggable
            defaultClassNameDragging='drawing'
            onDrag={onMoving}
            disabled={piece.color !== turn} nodeRef={nodeRef}
            defaultPosition={{ x: initialXPosition * SQUARE_SIZE, y: initialYPosition * SQUARE_SIZE }}
            defaultClassName="draggablePiece"
            onStart={() => console.log('start', piece)} onStop={onPieceDrop} >
            <div ref={nodeRef} >
                <img className="piece-img" style={{ width: '80px', height: '80px' }} src={getPieceImage(piece)} />
            </div>
        </Draggable>
    )
}



