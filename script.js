import {Tetris} from './tetris.js';
import {convertPositionToIndex} from './utilities.js';

const tetris = new Tetris();
const cells = document.querySelectorAll('.grid>div');

let requestId;
let timeout;
initKeydown();
moveDown();

function draw() {
    cells.forEach(cell => cell.removeAttribute('class'));
    drawPlayfield();
    drawTetromino();
    drawGhostTetromino();
}
function drawTetromino() {
    const name = tetris.tetromino.name;
    const tetrominoMatrixSize = tetris.tetromino.matrix.length

  for (let row =0 ; row < tetrominoMatrixSize; row++) {
    for (let col = 0; col < tetrominoMatrixSize; col++) {
        if(!tetris.tetromino.matrix[row][col]) continue;
        if(tetris.tetromino.row + row < 0) continue;

        const cellIndex = convertPositionToIndex(  tetris.tetromino.column + col,tetris.tetromino.row + row);
        cells[cellIndex].classList.add(name);

    }
  }
}

function drawGhostTetromino(){
    const name = tetris.tetromino.name;
    const tetrominoMatrixSize = tetris.tetromino.matrix.length
    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let col = 0; col < tetrominoMatrixSize; col++) {
            if (!tetris.tetromino.matrix[row][col]) continue;
            if (tetris.tetromino.ghostRow + row < 0) continue;
            const cellIndex = convertPositionToIndex(tetris.tetromino.ghostColumn + col, tetris.tetromino.ghostRow + row);
            cells[cellIndex].classList.add('ghost');
        }
    }
}
function moveDown() {
    tetris.moveTetrimonoDown();
    draw();
    stopLoop();
    startLoop();
    if(tetris.isGameOver) {
        stopLoop();
        gameOver()
    }
}

function gameOver() {
    alert('Game Over');
    document.removeEventListener('keydown', () => {});
}
function stopLoop(){
    cancelAnimationFrame(requestId);
    clearTimeout(timeout);
    requestId = undefined;
    timeout = undefined;
}
function startLoop(){

     timeout = setTimeout(() => requestId = requestAnimationFrame(moveDown), 700);

}
function initKeydown() {
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowUp':
                tetris.rotateTetrimono();
                draw();
                break;
            case 'ArrowDown':
                moveDown()
                break;
            case 'ArrowLeft':
                tetris.moveTetrimonoLeft();
                draw();
                break;
            case 'ArrowRight':
                tetris.moveTetrimonoRight();
                draw();
                break;
            case ' ':
                tetris.dropTetrimono();
                draw();
                stopLoop()
                startLoop()
                if (tetris.isGameOver) {
                    stopLoop();
                    gameOver()
                }
                break;
            default:
                    break;
        }
    })
}
function drawPlayfield(){
    for (let row = 0; row < tetris.playfield.length; row++) {
        for (let col = 0; col < tetris.playfield[row].length; col++) {
            const name = tetris.playfield[row][col];
            const cellIndex = convertPositionToIndex(col, row);
            if(name) {
                cells[cellIndex].classList.add(name);
            }
        }
    }
    console.log(tetris.playfield)
}