export interface Level {
  name: string;
  boardTiles: (number | string)[];
  cols: number;
  rows: number;
  firstRowFull: boolean;
}

export const Levels: Level[] = [
    { 
        name: 'Level 1', 
        boardTiles: [
            1, 1, 1, 1, 1,
            2, 'B3', 1, 1,
            1, 'B4', 4, 'R1', 1,
            3, 2, 1, 2, 
            3, 3, 3, 'C3', 4,
        ], 
        cols: 5, 
        rows: 5, 
        firstRowFull: true 
    },

    { 
        name: 'Level 2', 
        boardTiles: [
            1, 1, 1, 1, 1, 1, 1, 1, 
            1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1,  
            1, 1, 1, 1, 1, 1, 1, 1,
        ], 
        cols: 9, 
        rows: 5, 
        firstRowFull: false 
    },

    { 
        name: 'Level 3', 
        boardTiles: [
            3, 2, 1,
            1, 2, 
            1, 4, 1,
        ], 
        cols: 3, 
        rows: 3, 
        firstRowFull: true 
    },

    { 
        name: 'Level 4', 
        boardTiles: [
            1, 1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 
            1, 1, 1, 1, 1,
        ], 
        cols: 5, 
        rows: 5, 
        firstRowFull: true 
    },
]
