interface TileData {
    value: number,
}

export interface Level {
    name: string,
    boardData: TileData[]
}

export const Levels = [
    { name: 'Level 1', boardData: [], },
    { name: 'Level 2', boardData: [], },
    { name: 'Level 3', boardData: [], },
    { name: 'Level 4', boardData: [], },
]
