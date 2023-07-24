import { Square } from '../square';
import { PieceType } from './piece';



export const isValidMove = (type: PieceType) => {
    switch (type) {
        case 'PAWN': return pawnValidMove;
        case 'ROOK': return rookValidMove
        case 'KNIGHT': return knightValidMove
        case 'BISHOP': return bishopValidMove;
        case 'KING': return kingValidMove;
        case 'QUEEN': return queenValidMove;
    }
}




export const queenValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number], color: 'white' | 'black') => {
    if (!(fromX !== toX && toY !== fromY)) { // ROOK MOVES
        let moves = Math.abs(toX !== fromX ? (fromX - toX) : (fromY - toY))
        for (let i = 1; i < moves; i++) { //collition between
            if (toX !== fromX) {
                if (toX > fromX) {
                    if (squares.filter(sq => sq.x === fromX + i && sq.y === toY).length > 0) return false
                } else {
                    if (squares.filter(sq => sq.x === toX + i && sq.y === toY).length > 0) return false
                }
            } else {
                if (toY > fromY) {
                    if (squares.filter(sq => sq.y === fromY + i && sq.x === toX).length > 0) return false
                } else {
                    if (squares.filter(sq => sq.y === toY + i && sq.x === toX).length > 0) return false
                }
            }
        }

        if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === color).length > 0) return false
        return true
    }

    if (Math.abs(fromX - toX) - Math.abs(fromY - toY) !== 0) return false
    let moves = Math.abs(toX - fromX)
    let direction: 'upleft' | 'upright' | 'downleft' | 'downright'
    if (toX > fromX) {
        direction = toY > fromY ? 'downright' : 'upright'
    } else {
        direction = toY > fromY ? 'downleft' : 'upleft'
    }

    for (let i = 1; i < moves; i++) {
        switch (direction) {
            case "upleft":
                if (squares.filter(sq => sq.x === (toX + i) && sq.y === (toY + i)).length > 0) return false
                break;
            case "upright":
                if (squares.filter(sq => sq.x === toX - i && sq.y === (toY + i)).length > 0) return false
                break;
            case "downleft":
                if (squares.filter(sq => sq.x === (fromX - i) && sq.y === (fromY + i)).length > 0) return false
                break;
            case "downright":
                if (squares.filter(sq => sq.x === (fromX + i) && sq.y === (fromY + i)).length > 0) return false
                break;
        }
    }

    if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === color).length > 0) return false

    return true

}

export const rookValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number], color: 'white' | 'black') => {
    if (fromX !== toX && toY !== fromY) return false

    let moves = Math.abs(toX !== fromX ? (fromX - toX) : (fromY - toY))

    for (let i = 1; i < moves; i++) { //collition between
        if (toX !== fromX) {
            if (toX > fromX) {
                if (squares.filter(sq => sq.x === fromX + i && sq.y === toY).length > 0) return false
            } else {
                if (squares.filter(sq => sq.x === toX + i && sq.y === toY).length > 0) return false
            }
        } else {
            if (toY > fromY) {
                if (squares.filter(sq => sq.y === fromY + i && sq.x === toX).length > 0) return false
            } else {
                if (squares.filter(sq => sq.y === toY + i && sq.x === toX).length > 0) return false
            }
        }
    }

    if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === color).length > 0) return false

    return true
}

export const pawnValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number], color: 'white' | 'black') => {
    if (Math.abs(fromX - toX) > 1) return false
    if (color === 'black' && fromY >= toY) return false
    if (color === 'white' && fromY <= toY) return false

    let rivalPiecedSquares = squares.filter(sq => sq.piece?.color !== color)

    if (Math.abs(fromY - toY) === 1) {
        if (Math.abs(fromX - toX) === 0) {
            if (squares.filter(sq => sq.x === toX && sq.y === toY).length > 0) return false
            return true
        } else {
            if (rivalPiecedSquares.filter(sq => sq.x === toX && sq.y === toY).length > 0) return true
            else return false
        }
    } if (Math.abs(fromY - toY) === 2 && Math.abs(fromX - toX) === 0) {
        if ((color === 'black' && fromY !== 1) || (color === 'white' && fromY !== 6)) return false
        if (squares.filter(sq => sq.x === toX && sq.y === toY).length > 0) return false
        if (squares.filter(sq => sq.x === toX && sq.y === (color === 'white' ? 5 : 2)).length > 0) return false
        return true
    }

    return false
}

export const knightValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number], color: 'white' | 'black') => {

    let xDif = Math.abs(fromX - toX)
    let yDif = Math.abs(fromY - toY)

    if ((xDif === 1 && yDif === 2) || (xDif === 2 && yDif === 1)) {
        if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === color).length > 0) return false
        return true
    }

    return false
}


export const kingValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number], color: 'black' | 'white') => {

    let difX = Math.abs(toX - fromX)
    let difY = Math.abs(toY - fromY)
    if (difX > 1 || difY > 1) return false

    if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === color).length > 0) return false

    return true
}


export const bishopValidMove = (squares: Square[], [fromX, fromY]: [number, number], [toX, toY]: [number, number], color: 'black' | 'white') => {
    if (Math.abs(fromX - toX) - Math.abs(fromY - toY) !== 0) return false
    let moves = Math.abs(toX - fromX)
    let direction: 'upleft' | 'upright' | 'downleft' | 'downright'
    if (toX > fromX) {
        direction = toY > fromY ? 'downright' : 'upright'
    } else {
        direction = toY > fromY ? 'downleft' : 'upleft'
    }

    for (let i = 1; i < moves; i++) {
        switch (direction) {
            case "upleft":
                if (squares.filter(sq => sq.x === (toX + i) && sq.y === (toY + i)).length > 0) return false;
                break;;
            case "upright":
                if (squares.filter(sq => sq.x === toX - i && sq.y === (toY + i)).length > 0) return false;
                break;
            case "downleft":
                if (squares.filter(sq => sq.x === (fromX - i) && sq.y === (fromY + i)).length > 0) return false;
                break;
            case "downright":
                if (squares.filter(sq => sq.x === (fromX + i) && sq.y === (fromY + i)).length > 0) return false;
                break;
        }
    }

    if (squares.filter(sq => sq.x === toX && sq.y === toY && sq.piece?.color === color).length > 0) return false

    return true
}
