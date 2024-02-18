export const PLAYFIELD_ROWS=20
export const PLAYFIELD_COLUMNS=10

export const TETROMINO_NAMES = ['I','J','L','O','S','T','Z'];
export const TETROMINOS = {
    I: [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    J: [
        [0,0,0],
        [1,1,1],
        [0,0,1]
    ],
    L: [
        [0,0,0],
        [1,1,1],
        [1,0,0]
    ],
    O: [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    S: [
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    T: [
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ],
    Z: [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ]
}
export const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const convertPositionToIndex = (x, y) => (y * PLAYFIELD_COLUMNS) + x;

export const rotateMatrix = (matrix) => {
    const n = matrix.length;
    const rotatedMatrix = []
    for (let i = 0; i < n; i++) {
        rotatedMatrix[i] =[]
        for (let j = 0; j < n; j++) {
            rotatedMatrix[i][j] = matrix[n - j - 1][i]
        }
    }
    return rotatedMatrix;
}