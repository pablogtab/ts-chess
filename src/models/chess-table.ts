import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { Square } from "./square";

export const SQUARE_SIZE = 80

export class ChessTable {

    divContainer: HTMLElement
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    squares: Square[]

    constructor(div: HTMLElement) {
        this.divContainer = div
        let canvasElement = document.createElement('canvas')
        canvasElement.setAttribute('class', 'chess-table')
        this.canvas = canvasElement
        canvasElement.setAttribute("width", SQUARE_SIZE * 8 + '')
        canvasElement.setAttribute("height", SQUARE_SIZE * 8 + '')
        div.style.width = '660px'
        div.style.height = '660px'
        div.style.position = 'relative'
        div.appendChild(canvasElement)
        this.ctx = canvasElement.getContext('2d')
        this.squares = []
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let sqr = new Square(this.divContainer, j, i)
                if (i === 0) {
                    switch (j) {
                        case 0: sqr.piece = new Rook('black'); break;
                        case 1: sqr.piece = new Knight('black'); break;
                        case 2: sqr.piece = new Bishop('black'); break;
                        case 3: sqr.piece = new Queen('black'); break;
                        case 4: sqr.piece = new King('black'); break;
                        case 5: sqr.piece = new Bishop('black'); break;
                        case 6: sqr.piece = new Knight('black'); break;
                        case 7: sqr.piece = new Rook('black'); break;
                    }
                } else if (i === 1) { sqr.piece = new Pawn('black') }
                else if (i === 6) { sqr.piece = new Pawn('white') }
                else if (i === 7) {
                    switch (j) {
                        case 0: sqr.piece = new Rook('white'); break;
                        case 1: sqr.piece = new Knight('white'); break;
                        case 2: sqr.piece = new Bishop('white'); break;
                        case 3: sqr.piece = new Queen('white'); break;
                        case 4: sqr.piece = new King('white'); break;
                        case 5: sqr.piece = new Bishop('white'); break;
                        case 6: sqr.piece = new Knight('white'); break;
                        case 7: sqr.piece = new Rook('white'); break;
                    }
                }

                // if (i === 3 && j === 3) sqr.piece = new King('white')
                // if (i === 3 && j === 5) sqr.piece = new King('white')
                this.squares.push(sqr)
            }
        }
    }

    draw() {
        this.squares.forEach(sqr => {
            sqr.draw(this.ctx)
        })
    }

}

