import { Piece } from './piece';
import { Square } from '../square';

export class Bishop extends Piece {

    constructor(color: 'white' | 'black') {
        super('BISHOP', color)
    }
}


