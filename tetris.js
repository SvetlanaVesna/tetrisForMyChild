import {
    getRandomElement,
    PLAYFIELD_COLUMNS,
    PLAYFIELD_ROWS,
    rotateMatrix,
    TETROMINO_NAMES,
    TETROMINOS
} from './utilities.js';
export class Tetris {
    constructor() {
        this.playfield;
        this.tetromino;
        this.isGameOver = false;
        this.init();
    }
    init() {
        this.generatePlayfield()
        this.generateTetromino()
    }
    generatePlayfield() {
        this.playfield = Array.from({length: PLAYFIELD_ROWS}, () => Array(PLAYFIELD_COLUMNS).fill(0));
    }
    generateTetromino() {
        const name = getRandomElement(TETROMINO_NAMES);
        const matrix = TETROMINOS[name];

        const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
        const row = -2

        this.tetromino = {
            name,
            matrix,
            row,
            column,
            ghostColumn: column, ghostRow:row
        }
        this.calculateGhostPosition()
    }

    calculateGhostPosition(){
        const tetrominoRow = this.tetromino.row;
        this.tetromino.row ++;
        while(this.isValid()) {
            this.tetromino.row++;
        }

        this.tetromino.ghostRow = this.tetromino.row - 1;
        this.tetromino.ghostColumn = this.tetromino.column;
        this.tetromino.row = tetrominoRow;
    }

    isCollides(row,col){
        return this.playfield[this.tetromino.row + row]?.[this.tetromino.column + col]
    }
    isValid(){
        const tetrominoMatrixSize = this.tetromino.matrix.length

        for (let row = 0; row < tetrominoMatrixSize; row++) {
            for (let col = 0; col < tetrominoMatrixSize; col++) {
                if(!this.tetromino.matrix[row][col]) continue;
                const isOutside = this.isOutside(row,col)
                if (isOutside) return false;
                if(this.isCollides(row,col)) return false;
            }
        }
        return true;
    }
    isOutside(row, col) {
    return (
         this.tetromino.column + col < 0 ||
         this.tetromino.column + col >= PLAYFIELD_COLUMNS ||
         this.tetromino.row + row >= PLAYFIELD_ROWS)
    }

    moveTetrimonoDown() {
        this.tetromino.row+=1;
        if(!this.isValid()) {
            this.tetromino.row -= 1;
            this.placeTetromino()
        }
    }
    moveTetrimonoLeft() {
        this.tetromino.column-=1;
        if(!this.isValid())
            this.tetromino.column+=1;
        else {
            this.calculateGhostPosition()
        }
    }
    moveTetrimonoRight() {
        this.tetromino.column+=1;
        if(!this.isValid())
            this.tetromino.column-=1;
        else {
            this.calculateGhostPosition()
        }
    }
    rotateTetrimono() {
        const oldMatrix = this.tetromino.matrix;
        this.tetromino.matrix = rotateMatrix(this.tetromino.matrix)
        if(!this.isValid())
            this.tetromino.matrix = oldMatrix;
        else {
            this.calculateGhostPosition()
        }
    }
    dropTetrimono() {
        this.tetromino.row = this.tetromino.ghostRow;
        this.placeTetromino()
    }
    placeTetromino(){
        const tetrominoMatrixSize = this.tetromino.matrix.length
        for (let row = 0; row < tetrominoMatrixSize; row++) {
            for (let col = 0; col < tetrominoMatrixSize; col++) {
                if(!this.tetromino.matrix[row][col]) continue;
                if(this.tetromino.row + row < 0) {
                    this.isGameOver = true;
                    return;
                }
                this.playfield[this.tetromino.row + row][this.tetromino.column + col] = this.tetromino.name;
            }
        }
        this.processFilledRows()
        this.generateTetromino()
    }
    findFilledRows (){
        const filledRows = []
        for (let row = 0; row < PLAYFIELD_ROWS; row++) {
            if(this.playfield[row].every(cell => cell)) {
                filledRows.push(row)
            }
        }
        return filledRows
    }
    processFilledRows() {
        const filledRows = this.findFilledRows()
        this.removeFilledRows(filledRows)
    }
    removeFilledRows(filledRows){
        for (const index of filledRows) {
           this.dropRowsAbove(index)
        }
    }
    dropRowsAbove(index){
        for (let row = index; row >= 0; row--) {
            this.playfield[row] = row === 0 ? Array(PLAYFIELD_COLUMNS).fill(0) : this.playfield[row - 1]
        }
    }
}