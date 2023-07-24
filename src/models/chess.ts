import { isValidMove } from './pieces/moves';
import { Piece, PIECES, PieceType } from './pieces/piece';
import { Square } from './square';

//This file is  made to hold all functions related to chess-game
export const isAnyKingInCheck = (all64squares: Square[]): { white: boolean, black: boolean } => {

    let whitePiecedSquares = all64squares.filter(sq => sq.piece && sq.piece.color === 'white').map(sq => structuredClone(sq))
    let blackPiecedSquares = all64squares.filter(sq => sq.piece && sq.piece.color === 'black').map(sq => structuredClone(sq))
    let whiteKingSquare = whitePiecedSquares.find(sq => sq.piece?.type === 'KING')
    let blackKingSquare = blackPiecedSquares.find(sq => sq.piece?.type === 'KING')
    if (!whiteKingSquare) throw new Error('There is no king')
    if (!blackKingSquare) throw new Error('There is no king')

    let blackKingCheck = whitePiecedSquares.some(whitePiece => {
        let moves = movePosibilities(all64squares, whitePiece, false)
        if (!moves || !moves.length) return false
        if (moves.find(sq => sq.x === blackKingSquare?.x && sq.y === blackKingSquare.y)) return true
    })

    let whiteKingCheck = blackPiecedSquares.some(blackPiece => {
        let moves = movePosibilities(all64squares, blackPiece, false)
        if (!moves || !moves.length) return false
        if (moves.find(sq => sq.x === whiteKingSquare?.x && sq.y === whiteKingSquare.y)) return true
    })
    return { white: whiteKingCheck, black: blackKingCheck }
}



export const chessSquaresAfterMove = (all64squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
    let tmpSqu = structuredClone(all64squares)
    let tmp = tmpSqu.find((sq: Square) => sq.x === fromX && sq.y === fromY)
    if (!tmp) throw new Error('Bad coordinates provided')
    let tmp2 = structuredClone(tmp)
    tmp.piece = null
    let movingSquare = tmpSqu.find((sq: Square) => sq.x === toX && sq.y === toY)
    if (!movingSquare) throw new Error('Bad coordinates provided')
    movingSquare.piece = tmp2.piece
    return tmpSqu
}


export const bestNextMove = (all64squares: Square[], turn: 'white' | 'black', depth: number, alpha: number = -Infinity, beta: number = Infinity): ValoratedMove => {
    if (depth === 0) return bestNextMoveWithoutDepth(all64squares, turn)
    else {
        let moves = allNextMovesByPlayer(all64squares, turn)
        const changedTurn = turn === 'white' ? 'black' : 'white'
        //MIN-MAX
        let bestOtherMovesAfterMoved: { nextMove: ValoratedMove, move: ValoratedMove }[] = []
        for (const move of moves) {
            let nextMove = bestNextMove(chessSquaresAfterMove(all64squares, [move.fromX, move.fromY], [move.toX, move.toY]), changedTurn, depth - 1, alpha, beta)
            bestOtherMovesAfterMoved.push({ move, nextMove })
            if (turn === 'white') {
                alpha = alpha > nextMove?.whiteScore ? alpha : nextMove?.whiteScore
            } else {
                beta = beta < nextMove?.blackScore ? beta : -nextMove?.blackScore
            }
            if (beta < alpha) break
            else {
                if (beta === alpha && Math.random() > 0.6) break
            }
        }
        let bestMove = returnBestMoveOfMovePosibilities(bestOtherMovesAfterMoved.map(m => m.move), turn)
        console.log(bestMove)
        return bestMove


    }
}


const bestNextMoveWithoutDepth = (all64squares: Square[], turn: 'white' | 'black'): ValoratedMove => {
    let nextMoves = allNextMovesByPlayer(all64squares, turn)
    return returnBestMoveOfMovePosibilities(nextMoves, turn)
}


const allNextMovesByPlayer = (all64squares: Square[], player: 'white' | 'black'): ValoratedMove[] => {
    let tmpSqu = (JSON.parse(JSON.stringify(all64squares)) as Square[])
    if (player === 'white') {
        let whitePiecedSquares = tmpSqu.filter(sq => sq.piece?.color === 'white').filter(sq => !!sq.piece).map(sq => structuredClone(sq))
        let movePosib: (Square & { moves: ValoratedMove[] })[] = whitePiecedSquares.map(fromSq => {
            return {
                ...fromSq,
                moves: fromSq.piece ? movePosibilities(all64squares, fromSq, true).map(toSq => {
                    return {
                        toX: toSq.x,
                        toY: toSq.y,
                        fromX: fromSq.x,
                        fromY: fromSq.y, ...valorateCurrentPosition(chessSquaresAfterMove(all64squares, [fromSq.x, fromSq.y], [toSq.x, toSq.y])),
                    }
                }) : []
            }
        })
        return movePosib.reduce<ValoratedMove[]>((acc, val) => [...acc, ...val.moves], [])
    } else {
        let blackPiecesSquares = tmpSqu.filter(sq => sq.piece?.color === 'black').filter(sq => !!sq.piece).map(sq => structuredClone(sq))
        let movePosib: (Square & { moves: ValoratedMove[] })[] = blackPiecesSquares.map(fromSq => {
            return {
                ...fromSq,
                moves: fromSq.piece ? movePosibilities(all64squares, fromSq, true).map(toSq => {
                    return {
                        toX: toSq.x,
                        toY: toSq.y,
                        fromX: fromSq.x,
                        fromY: fromSq.y, ...valorateCurrentPosition(chessSquaresAfterMove(all64squares, [fromSq.x, fromSq.y], [toSq.x, toSq.y])),
                    }
                }) : []
            }
        })
        return movePosib.reduce<ValoratedMove[]>((acc, val) => [...acc, ...val.moves], [])
    }
}




export const valorateCurrentPosition = (all64squares: Square[]) => {
    let tmpSqu = structuredClone(all64squares)
    let whitePieces = tmpSqu.filter((sq: Square) => sq.piece?.color === 'white').map((sq: Square) => sq.piece) as Piece[]
    let blackPieces = tmpSqu.filter((sq: Square) => sq.piece?.color === 'black').map((sq: Square) => sq.piece) as Piece[]
    return {
        whiteScore: whitePieces.reduce((acc, curr) => acc + PIECES[curr?.type].value, 0),
        blackScore: blackPieces.reduce((acc, curr) => acc + PIECES[curr?.type].value, 0)
    }
}

export const returnBestMoveOfMovePosibilities = (vMoves: ValoratedMove[], valorate: 'white' | 'black'): ValoratedMove => {
    if (valorate === 'white') {
        let moves = vMoves.reduce<ValoratedMove[]>((acc, val) => {
            if ((val.whiteScore - val.blackScore) > (acc[0].whiteScore - acc[0].blackScore)) return [val]
            if ((val.whiteScore - val.blackScore) - (acc[0].whiteScore - acc[0].blackScore) === 0) return [...acc, val]
            return acc
        }, [vMoves[0]])
        return moves[Math.floor(Math.random() * moves.length)]
    }
    else {
        let moves = vMoves.reduce<ValoratedMove[]>((acc, val) => {
            if ((val.blackScore - val.whiteScore) > (acc[0].blackScore - acc[0].whiteScore)) return [val]
            if ((val.whiteScore - val.blackScore) - (acc[0].whiteScore - acc[0].blackScore) === 0) return [...acc, val]
            return acc
        }, [vMoves[0]])
        return moves[Math.floor(Math.random() * moves.length )]
    }
}



type ValoratedMove = Valoration & {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
}


type Valoration = {
    whiteScore: number
    blackScore: number;
}

export const movePosibilities: (all64squares: Square[], origin: Square, checkAnalisys?: boolean) => Square[] = (all64squares: Square[], origin: Square, checkAnalisys: boolean = true) => {
    if (!origin.piece) return []
    let type = origin.piece?.type as PieceType
    let color = origin.piece?.color as 'black' | 'white'
    let posibleMoves = all64squares.filter(sq => !(sq.x === origin.x && sq.y === origin.y) && isValidMove(type)(all64squares.filter(sq => sq.piece), [origin.x, origin.y], [sq.x, sq.y], color))
    if (checkAnalisys) {
        posibleMoves = posibleMoves.filter(posibleMove => {
            let chessSquares = chessSquaresAfterMove(all64squares, [origin.x, origin.y], [posibleMove.x, posibleMove.y])
            let anyKingInCheck = isAnyKingInCheck(chessSquares)
            if (!anyKingInCheck[color]) return true
        })
    }
    return posibleMoves
}