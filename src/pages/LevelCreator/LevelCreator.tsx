import { inject } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Tile } from '../../components/Tile';
import { getTimeObj, Timer } from '../../components/Timer';
import { Level } from '../../data/Levels';
import { images } from '../../images/_images';
import { GameStore } from '../../stores/GameStore';
import { StyleObject } from '../MainMenu/MainMenu';

// This file is an a DAGGER into PERFECTIONISM
// Fuck it
// It'll work for now
// It outputs the levels


interface State {
  boardTiles: TileWithData[];
  currentPosition: {x: number, y: number} | undefined;
  runTimer: boolean;
  gameWasWon: boolean;
  selectedTileType: string;
  levelName: string;
}

interface TileWithData {
    x: number;
    y: number;
    value: number;
    id: { x: number, y: number };
    type: string;
}

let GameCreationLevel =     { 
        name: 'Level Creator', 
        boardTiles: [
            0, 0, 0, 0, 0,0, 0, 0, 0, 0,
            0, 0, 0, 0,0, 0, 0, 0,
            0, 0, 0, 0, 0,0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0,0, 0, 0, 0, 0,
            0, 0, 0, 0,0, 0, 0, 0,
            0, 0, 0, 0, 0,0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 
            0, 0, 0, 0, 0,0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0
        ], 
        cols: 10, 
        rows: 10, 
        firstRowFull: true 
}


@inject('gameStore')
export class LevelCreator extends React.Component<{ gameStore?: GameStore },State> {

  private timestamp: any;

  private onTimerRun = (timestamp: number) => {
    this.timestamp = timestamp;
  }

  public state: State = {
    boardTiles: [] as TileWithData[],
    currentPosition: undefined,
    runTimer: true,
    gameWasWon: false,
    selectedTileType: 'normal',
    levelName: '',
  };

  public componentDidMount() {
    let tiles = getTilePositionData(GameCreationLevel)
    this.setState({ boardTiles: tiles });
    
  }

  private onClickTile = (x: number, y: number) => {
    let moveIsValid = true;
    let level = GameCreationLevel
    let requestedTile = this.state.boardTiles[this.state.boardTiles.findIndex(p => p.id.x == x && p.id.y == y)];

    if(this.state.currentPosition != undefined) {
      let cpos = this.state.currentPosition;

      let possibleMoves = getSurroundingTiles(cpos, level);
      
      if(possibleMoves.findIndex(pos => x == pos.x && y == pos.y) == -1) {
        moveIsValid = false;
      }
    }

    // if(requestedTile.value <= 0) {
    //   moveIsValid = false;
    // }

    

    if(moveIsValid) {
      let newBoardState = getNewBoardStateFromAction({x, y}, level, this.state.boardTiles, this.state.selectedTileType)

      this.setState({boardTiles: newBoardState});
      this.setState({currentPosition: {x: x, y: y}})
    }
  }

  private onClickReset = () => {
    let tiles = getTilePositionData(GameCreationLevel)

    if(confirm("Are you sure?")) {
        this.setState({
        currentPosition: undefined,
        boardTiles: tiles,
        runTimer: true,
        })
    } 
  }

  private onClickSave = () => {

    if(this.state.levelName == '') { alert("add name plx"); return }
    var d = new Date();

    var datestring = `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}_${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
    
    let tiles = this.state.boardTiles;

    // format level for ingestion:
    // level format: 
    /*
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
    */

    
    let data = {
      name: this.state.levelName,
      boardTiles: this.state.boardTiles.map(x => x.type == 'normal' || x.type == '' ? x.value : x.type[0].toLocaleUpperCase() + x.value),
      cols: 10,
      rows: 10,
      firstRowFull: true,
    }
    console.log("BOARD TILES: ", data.boardTiles);

    let levelString = '{\n'

    levelString += 'name: "' + data.name + '",\n'
    levelString += 'boardTiles: [\n'

    let offRow = !data.firstRowFull;
    let count = 0;

    data.boardTiles.forEach(((tileValue, i) => {
      levelString += (typeof(tileValue) == 'string' ? '`' : '  ') + tileValue + (typeof(tileValue) == 'string' ? '`,' : ' ,') ;
      console.log('level string', levelString)
      count++;
      let isNextRow = count == 10 + (offRow ? -1 : 0);

      if(isNextRow) { 
        levelString += '\n' + (!offRow ? '  ' : '') 
        offRow = !offRow;
        count = 0;
      }
    })) 

    levelString += '],\n'
    
    levelString += 'cols: ' + data.cols + ',\n'
    levelString += 'rows: ' + data.rows + ',\n'
    levelString += 'firstRowFull: true,\n'
    levelString += '}'

    const fs = require('fs');
    try { fs.writeFileSync(`level_${datestring}.js`, levelString, 'utf-8'); }
    catch(e) { alert('Failed to save the file !'); }
  }

  public render(): JSX.Element {
    let pos = this.state.currentPosition;
    let currentLevel = GameCreationLevel;

    if(this.state.gameWasWon) {
      return <div style={{width: `100vw`, height: `100vh`, justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
          <h1 style={{fontSize: 22, fontWeight: 'bold', marginBottom: 20}}>You're amazing!!</h1>
          <h1 style={{marginBottom: 20}}>Time: {this.timestamp.string}</h1>
          <Link to='/levelselect'>Level select</Link>
      </div>
    }

    return (
      <div style={styles.container}>

        <div style={getGameboardCenter(currentLevel)}>
          
          <h1 style={getHeaderTextStyle(currentLevel)}>
            {currentLevel.name} | <Timer timerIsRunning={this.state.runTimer} onAnimationFrame={this.onTimerRun}/>
          </h1>

          <a onClick={this.onClickReset}>
            <h1 style={getResetTextStyle(currentLevel)}>reset</h1>
          </a>

          <div style={getSaveTextStyle(currentLevel)}>
              <input onChange={(e) => this.setState({levelName: e.target.value})}></input>
              <div style={{height: 20}} />
            <a onClick={this.onClickSave} style={{marginTop: 10}}>
              <h1>save level</h1>
            </a>
          </div>

          {this.state.boardTiles.map((tile) => {

            let moves = getPotentialMove(pos, this.state.boardTiles, currentLevel);
            let isSelected = pos != undefined && pos!.y == tile.id.y && pos!.x == tile.id.x ;

            return (
              <div style={{ position: 'absolute', left: tile.x, top: tile.y }} onClick={() => this.onClickTile(tile.id.x, tile.id.y)}>
                <Tile value={tile.value} isSelected={isSelected} type={tile.type}/>
                {isSelected &&
                  <>
                    {moves.upLeft == true && <img src={images.arrow_TL} style={{  ...styles.moveIndicator}} /> }
                    {moves.upRight == true && <img src={images.arrow_TR} style={{  ...styles.moveIndicator}} /> }

                    {moves.bottomLeft == true && <img src={images.arrow_BL} style={{  ...styles.moveIndicator}} />}
                    {moves.bottomRight == true && <img src={images.arrow_BR} style={{  ...styles.moveIndicator}} />}


                    {moves.left == true && <img src={images.arrow_L} style={{  ...styles.moveIndicator}} /> }
                    {moves.right == true && <img src={images.arrow_R} style={{  ...styles.moveIndicator}} /> }
                  </>
                }
              </div>
            );
          })}

          <div onClick={() => this.setState({ selectedTileType: 'normal' })} style={{top: 0, ...tileButton(this.state.selectedTileType == 'normal')}}>
            <h1>N</h1>
          </div>

          <div onClick={() => this.setState({ selectedTileType: 'bomb' })} style={{top: 120, ...tileButton(this.state.selectedTileType == 'bomb')}}>
            <h1>B</h1>
          </div>

          <div onClick={() => this.setState({ selectedTileType: 'col' })} style={{top: 240, ...tileButton(this.state.selectedTileType == 'col')}}>
            <h1>C</h1>
          </div>

          <div onClick={() => this.setState({ selectedTileType: 'row' })} style={{top: 360, ...tileButton(this.state.selectedTileType == 'row')}}>
            <h1>R</h1>
          </div>
        </div>

        <Link to="/levelselect">
          <div style={styles.backButton}>X</div>
        </Link>
      </div>
    );
  }
}


const getNewBoardStateFromAction = (pos1: {x: number, y: number}, level1: Level, boardTiles1: TileWithData[], tileTypeToAdd: string) => {

      let finalState = boardTiles1;
      // CHAIN RECATIONS BABY 
      // Bomb -> Bomb -> Row -> etc;

      let recursiveMove = (pos: {x: number, y: number}, level: Level, boardTiles: TileWithData[]) => {
        let index = boardTiles.findIndex(element => element.id.x == pos1.x && element.id.y == pos1.y);

        if(index == -1) {
          return finalState;
        }

        let stateCopy = boardTiles;

        let tile = stateCopy[index];


        if(true) {
            stateCopy[index].value += 1;
            finalState = stateCopy;
        }

        if(tileTypeToAdd == 'bomb') {
        
          if(tile.type != 'bomb') {
            let surroundingTiles = getSurroundingTiles({x: pos.x, y: pos.y}, level);
            surroundingTiles.forEach(tile => {
              finalState = getNewBoardStateFromAction({x: tile.x, y: tile.y}, level, finalState, 'normal');
            })
          }

         stateCopy[index].value;
          stateCopy[index].type = 'bomb'
          finalState = stateCopy;
        }

        if(tileTypeToAdd == 'row') {

          if(tile.type != 'row') {
            let rowTiles = getRowTiles({x: pos.x, y: pos.y}, finalState);
              rowTiles.forEach(tile => {
                finalState = getNewBoardStateFromAction({x: tile.id.x, y: tile.id.y}, level, finalState, 'normal');
              })
          }

          stateCopy[index].value;
          stateCopy[index].type = 'row'
          finalState = stateCopy;

        }

        if(tileTypeToAdd == 'col') {

          if(tile.type != 'col') {
            let colTiles = getColTiles({x: pos.x, y: pos.y}, finalState);
            colTiles.forEach(tile => {
              finalState = getNewBoardStateFromAction({x: tile.id.x, y: tile.id.y}, level, finalState, 'normal');
            })
          }

          stateCopy[index].value;
          stateCopy[index].type = 'col'
          finalState = stateCopy;
        }

        return finalState;
      }

      finalState = recursiveMove({x: pos1.x, y: pos1.y}, level1, boardTiles1);
      
      return finalState;
}

const getColTiles = (pos: {x: number, y: number}, tiles: TileWithData[]) => {

  let possibles = tiles.filter(t => t.id.x == pos.x && t.id.y != pos.y);

  return possibles;
}

const getRowTiles = (pos: {x: number, y: number}, tiles: TileWithData[]) => {

  let possibles = tiles.filter(t => t.id.y == pos.y && t.id.x != pos.x);

  return possibles;
}

const getSurroundingTiles = (pos: {x: number, y: number }, level: Level) => {

      let surroundingTiles = [];

        surroundingTiles.push({x: pos.x - 1, y: pos.y})
      surroundingTiles.push({x: pos.x + 1, y: pos.y})


      surroundingTiles.push({x: pos.x, y: pos.y + 1})
      surroundingTiles.push({x: pos.x, y: pos.y - 1})

      let posIsOnFullRow = pos.y % 2 == (level.firstRowFull ? 0 : 1)
      if(posIsOnFullRow) {
        surroundingTiles.push({x: pos.x - 1, y: pos.y + 1})
        surroundingTiles.push({x: pos.x - 1, y: pos.y - 1})
      } else {
        surroundingTiles.push({x: pos.x + 1, y: pos.y + 1})
        surroundingTiles.push({x: pos.x + 1, y: pos.y - 1})
      }

      return surroundingTiles;
}

const getPotentialMove = (pos: { x: number, y: number } | undefined, board: TileWithData[], level: Level) => {

  const checkIndex = (checkPos: { x: number, y: number}) => {
      let index = board.findIndex(p => p.id.x == checkPos.x && p.id.y == checkPos.y);
      let indexIsValid = index != -1;
      return indexIsValid;
  }

  if(pos == undefined) { return {} }

      let posIsOnFullRow = pos.y % 2 == (level.firstRowFull ? 0 : 1)

      let leftIsValid = checkIndex({x: pos.x - 1, y: pos.y})
      let rightIsValid = checkIndex({x: pos.x + 1, y: pos.y})
      
      let upLeftIsValid = false;
      let upRightIsValid = false;      
      let bottomLeftIsValid = false;
      let bottomRightIsValid = false;

      if(posIsOnFullRow) {
        upLeftIsValid = checkIndex({ x: pos.x - 1, y: pos.y - 1})
        upRightIsValid = checkIndex({ x: pos.x, y: pos.y - 1})

        bottomLeftIsValid = checkIndex({ x: pos.x - 1, y: pos.y + 1})
        bottomRightIsValid = checkIndex({ x: pos.x, y: pos.y + 1})

      } else {
        upLeftIsValid = checkIndex({ x: pos.x, y: pos.y - 1})
        upRightIsValid = checkIndex({ x: pos.x + 1, y: pos.y - 1})

        bottomLeftIsValid = checkIndex({ x: pos.x, y: pos.y + 1})
        bottomRightIsValid = checkIndex({ x: pos.x + 1, y: pos.y + 1})
      }



  return { 
    upLeft: upLeftIsValid,
    upRight: upRightIsValid,
    left: leftIsValid,
    right: rightIsValid,
    bottomLeft: bottomLeftIsValid,
    bottomRight: bottomRightIsValid, 
  }
}

const getTilePositionData = (level: Level): TileWithData[] => {
  let cols = level.cols;
  let rows = level.rows;
  let firstRowFull = level.firstRowFull;

  let flip = firstRowFull;
  
  // [5, 4, 5, 4, 5]; // describes count of hex's in each row
  let distribution = new Array(rows).fill(cols).map(val => {
      flip = !flip;
      return val + (flip ? -1 : 0);
  })


  let currentRow = 0;
  let currentCol = 0;
  
  let tiles = level.boardTiles.map(tile => {

    let tileTypeAndValue = getTileValue(tile);
    let tileData = {
        x: currentCol * 100 + (distribution[currentRow] == cols ? 0 : 50),
        y: currentRow * 85,
        value: tileTypeAndValue.value,
        id: { x: currentCol, y: currentRow },
        type: tileTypeAndValue.type
    }

    currentCol += 1;
    if (currentCol > distribution[currentRow] - 1) {
        currentCol = 0;
        currentRow += 1;
    }

    return tileData;
  })

  return tiles;
};

const getTileValue = (tile: string | number): { value: number, type: string } => {
  if(typeof tile == 'string') {
    let type = tile[0];
    let value = parseInt(tile.substr(1));

    let typecast = '';
    if(type == 'B') { typecast = 'bomb' }
    if(type == 'R') { typecast = 'row' }
    if(type == 'C') { typecast = 'col' }
    return { value: value, type: typecast }
  }

  if(typeof tile == 'number') {
    return { value: tile, type: 'normal' }
  }

  return {value: -47, type: 'normal' }
}

const styles: StyleObject = {
  container: {
    height: `100vh`,
    width: `100vw`,
    position: 'relative',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    borderRadius: 24,
    height: 40,
    width: 40,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    bottom: 10,
    right: 10,
  },
  tileContainer: {
    position: `relative`,
  },
  headerText: {
    textAlign: 'center',
    marginTop: 150,
  },
  moveIndicator: {position: `absolute`, top: 0, left: 0, right: 0, bottom: 0 }
};

const getGameboardCenter = (level: Level) => {
  let width = level.cols * 100;
  let height = level.rows * 100;
  return {
    position: 'absolute',
    top: `calc(50vh - ${height / 2}px)`, 
    left: `calc(50vw - ${width / 2}px)`,
  } as CSSProperties
}

const getResetTextStyle = (level: Level) => {
  return {
    textDecoration: 'underline', color: 'blue', position: 'absolute', bottom: -level.rows * 85 - 185, left: 0, right: -level.cols * 100, textAlign: 'center'
  } as CSSProperties
}

const getSaveTextStyle = (level: Level) => {
  return {
    textDecoration: 'underline', color: 'blue', position: 'absolute', bottom: -level.rows * 85 - 125, left: 0, right: -level.cols * 100, textAlign: 'center'
  } as CSSProperties
}

const getHeaderTextStyle = (level: Level) => {
  return {position: 'absolute', top: -50, left: 0, right: -level.cols * 100, textAlign: 'center'} as CSSProperties
}

const tileButton = (isSelected: boolean) => {

  let selectedStyle = isSelected ? { backgroundColor: 'black', color: 'white' } : {};

  return {
    position: 'absolute',  left: -200, border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100, width: 100,
    ...selectedStyle
  } as CSSProperties

}