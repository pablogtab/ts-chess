import { Square } from '../square';
import { Piece } from './piece';

export class Rook extends Piece {
    constructor(color: 'white' | 'black') {
        super('ROOK', color)
    }
}



