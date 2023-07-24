import { Piece } from './piece';

export class Queen extends Piece {
    constructor(color: 'white' | 'black') {
        super('QUEEN', color)
    }
}


