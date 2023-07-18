import { SQUARE_SIZE } from "./chess-table";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { PieceType } from "./pieces/piece";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";


export type Pieces = Queen | King | Pawn | Knight | Bishop | Rook

export class Square {
    x: number;
    y: number;
    piece: Pieces | null;
    color: 'black' | 'white'

    constructor(x: number, y: number, piece: Pieces | null = null) {
        this.x = x;
        this.y = y;
        this.piece = piece;
        this.color = (this.y * 1 + this.x * 1) % 2 ? 'black' : 'white'
    }

    static fromPiecedSquare(sq: Square): Square {
        let piece;
        switch (sq.piece?.type) {
            case 'BISHOP': piece = new Bishop(sq.piece.color); break;
            case 'KING': piece = new King(sq.piece.color); break;
            case 'QUEEN': piece = new Queen(sq.piece.color); break;
            case 'KNIGHT': piece = new Knight(sq.piece.color); break;
            case 'PAWN': piece = new Pawn(sq.piece.color); break;
            case 'ROOK': piece = new Rook(sq.piece.color); break;
            default: throw Error
        }
        let tmp = new Square(sq.x, sq.y, piece)
        return tmp
    }

}


