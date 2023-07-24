import { Pieces } from "./pieces/piece";

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
}


