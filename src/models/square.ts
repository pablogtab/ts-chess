import { SQUARE_SIZE } from "./chess-table";
import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { PieceType } from "./pieces/piece";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";


let TURN: 'white' | 'black' = "white"

type PosibleSquarePiece = Queen | King | Pawn | Knight | Bishop | Rook | null




export class Square {
    x: number; y: number; piece: PosibleSquarePiece; divContainer: HTMLElement
    constructor(divContainer: HTMLElement, x: number, y: number, piece: PosibleSquarePiece = null) {
        this.x = x;
        this.y = y;
        this.piece = piece;
        this.divContainer = divContainer
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = (this.y * 1 + this.x * 1) % 2 ? '#000000' : '#FFFFFF'
        ctx.fillRect(SQUARE_SIZE * this.x, SQUARE_SIZE * this.y, SQUARE_SIZE, SQUARE_SIZE)

        if (this.piece) {
            let pieceDraw = document.createElement('div')
            //this.dragElement(pieceDraw)
            pieceDraw.setAttribute('class', 'piece')
            pieceDraw.setAttribute('name', 'piece')
            pieceDraw.setAttribute('type', this.piece.type)
            pieceDraw.setAttribute('color', this.piece.color)
            pieceDraw.innerHTML = this.piece.type
            pieceDraw.style.top = (50 + (this.y * SQUARE_SIZE)) + 'px'
            pieceDraw.style.left = ((10 + SQUARE_SIZE / 2) + this.x * SQUARE_SIZE) + 'px'
            pieceDraw.style.textAlign = 'center'
            pieceDraw.style.color = this.piece.color === 'black' ? 'green' : 'red'
            this.divContainer.appendChild(pieceDraw)
        }
    }

    // dragElement(elmnt: HTMLElement) {
    //     const dragMouseDown = (e: any) => {
    //         e = e || window.event;
    //         e.preventDefault();
    //         if (this.piece && this.piece.color !== TURN) return
    //         // get the mouse cursor position at startup:
    //         pos3 = e.clientX;
    //         pos4 = e.clientY;
    //         document.onmouseup = closeDragElement;
    //         // call a function whenever the cursor moves:
    //         document.onmousemove = elementDrag;
    //     }
    //     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    //     if (document.getElementById(elmnt.id + "header")) {
    //         // if present, the header is where you move the DIV from:
    //         document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    //     } else {
    //         // otherwise, move the DIV from anywhere inside the DIV:
    //         elmnt.onmousedown = dragMouseDown;
    //     }


    //     function elementDrag(e: any) {
    //         e = e || window.event;
    //         e.preventDefault();
    //         // calculate the new cursor position:
    //         pos1 = pos3 - e.clientX;
    //         pos2 = pos4 - e.clientY;
    //         pos3 = e.clientX;
    //         pos4 = e.clientY;
    //         // set the element's new position:
    //         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    //         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    //     }

    //     const closeDragElement = (mouseEvent: MouseEvent) => {
    //         document.onmouseup = null;
    //         document.onmousemove = null;


    //         let x = Math.floor(mouseEvent.clientX / SQUARE_SIZE)
    //         let y = Math.floor(mouseEvent.clientY / SQUARE_SIZE)


    //         if ((this.x === x && this.y === y) || x > 7 || y > 7 || !this.piece.isValidMove([this.x, this.y], [x, y])) { //Invalid movement
    //             elmnt.style.top = (50 + this.y * SQUARE_SIZE) + "px";
    //             elmnt.style.left = ((10 + SQUARE_SIZE / 2) + this.x * SQUARE_SIZE) + "px";
    //             return
    //         }

    //         //Checks???

    //         //EAT

    //         let squares = getAllPiecedSquares().filter(sq => sq.x === x && sq.y === y)

    //         if (squares.length > 1) {
    //             let square = squares.find(sq => sq.piece.color !== TURN)
    //             if (square) {
    //                 let element = Array.from(document.getElementsByName('piece')).find(element => {
    //                     let y = Math.floor(Number(element.style.top.slice(0, -2)) / SQUARE_SIZE)
    //                     let x = Math.floor(Number(element.style.left.slice(0, -2)) / SQUARE_SIZE)
    //                     const color = element.getAttribute('color') as 'white' | 'black'
    //                     console.log(x, square.x, y, square.y, square.piece.color, color)
    //                     if (x === square.x && y === square.y && square.piece.color === color) return true
    //                 })
    //                 if (element) element.remove()
    //             }
    //         }



    //         this.x = x
    //         this.y = y
    //         elmnt.style.top = (50 + y * SQUARE_SIZE) + "px";
    //         elmnt.style.left = ((10 + SQUARE_SIZE / 2) + x * SQUARE_SIZE) + "px";

    //         TURN = TURN === 'black' ? 'white' : 'black'
    //     }
    // }



}





export function getAllPiecedSquares(): Square[] {
    function defineSquare(element: HTMLElement) {
        const y = Math.floor(Number(element.style.top.slice(0, -2)) / SQUARE_SIZE)
        const x = Math.floor(Number(element.style.left.slice(0, -2)) / SQUARE_SIZE)
        const type = element.getAttribute('type') as unknown as PieceType
        const color = element.getAttribute('color') as 'white' | 'black'
        let piece: PosibleSquarePiece
        switch (type) {
            case "PAWN": piece = new Pawn(color); break;
            case "ROOK": piece = new Rook(color); break;
            case "KNIGHT": piece = new Knight(color); break;
            case "BISHOP": piece = new Bishop(color); break;
            case "KING": piece = new King(color); break;
            case "QUEEN": piece = new Queen(color); break;
        }
        if (element.parentElement) {
            let square = new Square(element.parentElement, x, y, piece)
            return square;
        } else throw Error
    }

    return Array.from(document.getElementsByName('piece')).map(el => defineSquare(el))
}
