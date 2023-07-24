import { Square } from '../square';
import { Piece } from './piece';

export class Knight extends Piece {

    constructor(color: 'white' | 'black') {
        super('KNIGHT', color)
    }
}
