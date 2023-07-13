import { Bishop } from "./pieces/bishop";
import { King } from "./pieces/king";
import { Knight } from "./pieces/knight";
import { Pawn } from "./pieces/pawn";
import { Queen } from "./pieces/queen";
import { Rook } from "./pieces/rook";
import { Square } from "./square";


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
        canvasElement.setAttribute("width", 80 * 8 + '')
        canvasElement.setAttribute("height", 80 * 8 + '')
        div.appendChild(canvasElement)
        this.ctx = canvasElement.getContext('2d')
        this.squares = []
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let sqr = new Square(i, j, 80)
                if (i === 0) {
                    switch (j) {
                        case 0: sqr.piece = new Rook('black'); break;
                        case 1: sqr.piece = new Bishop('black'); break;
                        case 2: sqr.piece = new Knight('black'); break;
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
                        case 1: sqr.piece = new Bishop('white'); break;
                        case 2: sqr.piece = new Knight('white'); break;
                        case 3: sqr.piece = new Queen('white'); break;
                        case 4: sqr.piece = new King('white'); break;
                        case 5: sqr.piece = new Bishop('white'); break;
                        case 6: sqr.piece = new Knight('white'); break;
                        case 7: sqr.piece = new Rook('white'); break;
                    }
                }
                this.squares.push(sqr)
            }
        }





    }

    draw() {
        this.squares.forEach(sqr => {
            sqr.draw(this.ctx)
            if (sqr.piece) {
                let pieceDraw = document.createElement('div')
                dragElement(pieceDraw)
                pieceDraw.setAttribute('class', 'piece')
                pieceDraw.innerHTML = sqr.piece.type
                pieceDraw.style.top = (50 + (sqr.row * sqr.size)) + 'px'
                pieceDraw.style.left = 17 + (sqr.column * sqr.size) + 'px'
                pieceDraw.style.width = sqr.size + 'px'
                pieceDraw.style.textAlign = 'center'
                pieceDraw.style.color = 'green'
                this.divContainer.appendChild(pieceDraw)
            }
        })
    }

}



// Make the DIV element draggable:

function dragElement(elmnt: HTMLElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e:any) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}