export interface Move {
    turn: 'white' | 'black';
    from: {
        x: number;
        y: number;
    }
    to: {
        x: number;
        y: number;
    }
}





