import './component-styles/DraggablePiece.css';

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
import { useChessContext, useChessDispatchContext } from '../context/ChessContext';
import { chessSquaresAfterMove, isAnyKingInCheck, movePosibilities } from '../models/chess';
import { Piece, Pieces } from '../models/pieces/piece';
import { Square } from '../models/square';
import { SQUARE_SIZE } from './ChessTable';
import { isValidMove } from '../models/pieces/moves';

export const DraggablePiece = ({ piece, initialXPosition, initialYPosition }: { piece: Pieces, initialXPosition: number, initialYPosition: number }) => {

    const nodeRef = useRef(null)

    const { chessTableRef, squares, turn, moveIfDrops, lastTouchedSquare, posibleMoves, kingInCheck } = useChessContext()
    const { dispatch, handleMove, setLastMove, setLastTouchedSquare, setMoveIfDrops, setPosibleMoves, setTurn, setKingInCheck } = useChessDispatchContext()



    const onPieceDrop = (event: any) => {

        setMoveIfDrops(null)
        let y = Math.floor((event.y - (chessTableRef?.current?.offsetTop ?? 0)) / 80)
        let x = Math.floor((event.x - (chessTableRef?.current?.offsetLeft ?? 0)) / 80)
        let sq = squares.find(sq => sq.x === initialXPosition && sq.y === initialYPosition)
        let toSquare = squares.find(sq => sq.x === x && sq.y === y)


        if (!sq || !sq.piece) return
        let type = sq.piece.type
        let color = sq.piece.color

        if (!toSquare || !isValidMove(type)(squares.filter(sq => sq.piece), [initialXPosition, initialYPosition], [x, y], color)) return resetPiece(sq)


        //isKingInCheck
        let squaresIfMoved = chessSquaresAfterMove(squares, [initialXPosition, initialYPosition], [x, y])

        let check = isAnyKingInCheck(squaresIfMoved)
        if (turn === 'black' && check.black) return resetPiece(sq)
        if (turn === 'white' && check.white) return resetPiece(sq)

        if (check.black) setKingInCheck('black')
        else if (check.white) setKingInCheck('white')
        else setKingInCheck(null)




        movePiece(sq, toSquare)
        setTurn(turn === 'black' ? 'white' : 'black')
        setPosibleMoves([])
        setLastTouchedSquare(null)

    }


    const onMoving = (event: any) => {
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


    const movePiece = (fromSq: Square, toSq: Square) => {
        setLastMove({ from: { x: fromSq.x, y: fromSq.y }, to: { x: toSq.x, y: toSq.y } })
        let tmp = structuredClone(fromSq)
        dispatch({ type: 'piece_delete', payload: fromSq })
        tmp.x = toSq.x
        tmp.y = toSq.y
        dispatch({ type: 'piece_reset', payload: tmp })

    }

    const resetPiece = (sq: Square | undefined) => {
        if (sq) {
            let tmp = structuredClone(sq)
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

    const onStart = () => {
        if (posibleMoves.length && lastTouchedSquare?.x === initialXPosition && lastTouchedSquare.y === initialYPosition) {
            setLastTouchedSquare(null)
            setPosibleMoves([])
            return
        }
        let sq = squares.find(sq => sq.x === initialXPosition && sq.y === initialYPosition)
        if (sq) {
            setPosibleMoves([...movePosibilities(squares, sq)])
            setLastTouchedSquare(sq)
        }
    }


    const handleMoveUndraggables = () => {
        if (piece.color !== turn) {
            let tmp = new Square(initialXPosition, initialYPosition, piece)
            handleMove(tmp)
        }
    }

    return (
        <Draggable
            allowAnyClick={false}
            defaultClassNameDragging='drawing'
            onDrag={onMoving}
            onStart={onStart}
            onStop={onPieceDrop}
            disabled={piece.color !== turn}
            nodeRef={nodeRef}
            defaultPosition={{ x: initialXPosition * SQUARE_SIZE, y: initialYPosition * SQUARE_SIZE }}
            defaultClassName="draggablePiece"
        >
            <div ref={nodeRef} onClick={handleMoveUndraggables}>
                <img className="piece-img" style={{ width: '80px', height: '80px' }} src={getPieceImage(piece)} />
            </div>
        </Draggable>
    )
}



