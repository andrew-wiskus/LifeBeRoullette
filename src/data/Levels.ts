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
            1, 2, 4, 'R1', 1,
            3, 'B4', 1, 2, 
            3, 3, 3, 2, 'C2',
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
                0,1,1,0,
               2, 'B2', 2,
            1, 'B4', 'B2', 1,
               2, 'B1',  2,
            0,   1,   1,   0 
        ], 
        cols: 4, 
        rows: 5, 
        firstRowFull: true 
    },
{
name: "bb",
boardTiles: [
`B4`,`B4`,`B4`,`B3`,`B3`,`B3`,`B3`,`B3`,`B6`,`C6`,
  `C3`,  2 ,  3 ,  2 ,  2 ,  2 ,  2 ,  2 ,`C5`,
  2 ,  0 ,  0 ,  1 ,  0 ,  0 ,  0 ,  0 ,  4 ,`C5`,
    2 ,  0 ,  0 ,  2 ,  1 ,  0 ,  0 ,  0 ,`C4`,
  2 ,  0 ,  0 ,  1 ,`B1`,  1 ,  0 ,  0 ,  4 ,`C5`,
    2 ,  0 ,  0 ,  1 ,  1 ,  0 ,  0 ,  0 ,`C4`,
  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  4 ,`C5`,
    2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,`C4`,
  2 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  0 ,  4 ,`C5`,
    10 ,`R8`,`R8`,`R8`,`R8`,`R8`,`R8`,`R8`,`R12`,
],
cols: 10,
rows: 10,
firstRowFull: true,
}
]
