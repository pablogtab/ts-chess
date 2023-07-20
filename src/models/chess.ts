import { Square } from "./square";
import { PIECES, Piece } from "./pieces/piece";

//This file is  made to hold all functions related to chess-game
export const isAnyKingInCheck = (all64squares: Square[]): { white: boolean, black: boolean } => {

    let whitePiecedSquares = all64squares.filter(sq => sq.piece && sq.piece.color === 'white').map(sq => Square.fromPiecedSquare(sq))
    let blackPiecedSquares = all64squares.filter(sq => sq.piece && sq.piece.color === 'black').map(sq => Square.fromPiecedSquare(sq))
    let whiteKingSquare = whitePiecedSquares.find(sq => sq.piece?.type === 'KING')
    let blackKingSquare = blackPiecedSquares.find(sq => sq.piece?.type === 'KING')
    if (!whiteKingSquare) throw new Error('There is no king')
    if (!blackKingSquare) throw new Error('There is no king')

    let blackKingCheck = whitePiecedSquares.some(whitePiece => {
        let movePosibilities = whitePiece.piece?.movePosibilities(all64squares, whitePiece, false)
        if (!movePosibilities || !movePosibilities.length) return false
        if (movePosibilities.find(sq => sq.x === blackKingSquare?.x && sq.y === blackKingSquare.y)) return true
    })

    let whiteKingCheck = blackPiecedSquares.some(blackPiece => {
        let movePosibilities = blackPiece.piece?.movePosibilities(all64squares, blackPiece, false)
        if (!movePosibilities || !movePosibilities.length) return false
        if (movePosibilities.find(sq => sq.x === whiteKingSquare?.x && sq.y === whiteKingSquare.y)) return true
    })



    return { white: whiteKingCheck, black: blackKingCheck }
}

export const chessSquaresAfterMove = (all64squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number]) => {
    let tmpSqu = (JSON.parse(JSON.stringify(all64squares)) as Square[])
    let tmp = tmpSqu.find(sq => sq.x === fromX && sq.y === fromY)
    if (!tmp) throw new Error('Bad coordinates provided')
    let tmp2 = JSON.parse(JSON.stringify(tmp))
    tmp.piece = null
    let movingSquare = tmpSqu.find(sq => sq.x === toX && sq.y === toY)
    if (!movingSquare) throw new Error('Bad coordinates provided')
    movingSquare.piece = tmp2.piece
    return tmpSqu
}


export const bestNextMove = (all64squares: Square[], turn: 'white' | 'black') => {

}


export const valorateCurrentPosition = (all64squares: Square[]) => {
    let tmpSqu = (JSON.parse(JSON.stringify(all64squares)) as Square[])
    let whitePieces = tmpSqu.filter(sq => sq.piece?.color === 'white').filter(sq => !!sq.piece).map(sq => sq.piece) as Piece[]
    let blackPieces = tmpSqu.filter(sq => sq.piece?.color === 'black').filter(sq => !!sq.piece).map(sq => sq.piece) as Piece[]
    console.log(whitePieces.reduce((acc, curr) => acc + PIECES[curr?.type].value, 0))
    console.log(blackPieces.reduce((acc, curr) => acc + PIECES[curr?.type].value, 0))


}








