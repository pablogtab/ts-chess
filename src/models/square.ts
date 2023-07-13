import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";

type PosibleSquarePiece = Queen | King | Pawn | Knight | Bishop | Rook | null


export class Square {
    row: number; column: number; piece: PosibleSquarePiece; size: number;
    constructor(row: number, column: number, size: number, piece: PosibleSquarePiece = null) {
        this.row = row;
        this.column = column;
        this.piece = piece;
        this.size = size
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = (this.column * 1 + this.row * 1) % 2 ? '#000000' : '#FFFFFF'
        ctx.fillRect(this.size * this.row, this.size * this.column, this.size, this.size)
    }
}
