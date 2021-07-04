import { inject } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Tile } from '../../components/Tile';
import { Level } from '../../data/Levels';
import { GameStore } from '../../stores/GameStore';
import { StyleObject } from '../MainMenu/MainMenu';

interface State {
  boardTiles: TileWithData[];
  currentPosition: {x: number, y: number} | undefined;
}

interface TileWithData {
    x: number;
    y: number;
    value: number;
    id: { x: number, y: number }
}

@inject('gameStore')
export class GameBoard extends React.Component<{ gameStore?: GameStore },State> {

  public state: State = {
    boardTiles: [] as TileWithData[],
    currentPosition: undefined
  };

  public componentDidMount() {
    let tiles = getTilePositionData(this.props.gameStore!.currentLevel)
    this.setState({ boardTiles: tiles });
  }

  private onClickTile = (x: number, y: number) => {
    let moveIsValid = true;
    let possibleMoves = [];
    let level = this.props.gameStore!.currentLevel
    let requestedTile = this.state.boardTiles[this.state.boardTiles.findIndex(p => p.id.x == x && p.id.y == y)];

    if(this.state.currentPosition != undefined) {
      let cpos = this.state.currentPosition;

      possibleMoves.push({x: cpos.x - 1, y: cpos.y})
      possibleMoves.push({x: cpos.x + 1, y: cpos.y})


      possibleMoves.push({x: cpos.x, y: cpos.y + 1})
      possibleMoves.push({x: cpos.x, y: cpos.y - 1})

      let cPosIsOnFullRow = cpos.y % 2 == (level.firstRowFull ? 0 : 1)
      if(cPosIsOnFullRow) {
        possibleMoves.push({x: cpos.x - 1, y: cpos.y + 1})
        possibleMoves.push({x: cpos.x - 1, y: cpos.y - 1})
      } else {
        possibleMoves.push({x: cpos.x + 1, y: cpos.y + 1})
        possibleMoves.push({x: cpos.x + 1, y: cpos.y - 1})
      }
      
      if(possibleMoves.findIndex(pos => x == pos.x && y == pos.y) == -1) {
        moveIsValid = false;
      }
    }

    if(requestedTile.value <= 0) {
      moveIsValid = false;
    }

    

    if(moveIsValid) {
      let index = this.state.boardTiles.findIndex(element => element.id.x == x && element.id.y == y);
      let stateCopy = this.state.boardTiles;
      stateCopy[index].value -= 1;
      this.setState({boardTiles: stateCopy});
      this.setState({currentPosition: {x: x, y: y}})
    }

  }

  public render(): JSX.Element {
    let pos = this.state.currentPosition;

    return (
      <div style={styles.container}>
        <h1 style={styles.headerText}>{this.props.gameStore!.currentLevel.name} | pos: {pos ? `${pos.x},${pos.y}` : `none`}</h1>

        <div style={getGameboardCenter(this.props.gameStore!.currentLevel)}>
          {this.state.boardTiles.map((tile) => {

            let moves = getPotentialMove(pos, this.state.boardTiles, this.props.gameStore!.currentLevel);
            
            return (
              <div style={{ position: 'absolute', left: tile.x, top: tile.y }} onClick={() => this.onClickTile(tile.id.x, tile.id.y)}>
                <Tile value={tile.value} />
                {pos != undefined && pos!.y == tile.id.y && pos!.x == tile.id.x &&
                  <>
                    {moves.upLeft == true && <div style={{  top: 6, left: 18, ...styles.moveIndicator}} /> }
                    {moves.upRight == true && <div style={{  top: 6, right: 18, ...styles.moveIndicator}} /> }

                    {moves.bottomLeft == true && <div style={{  bottom: 6, left: 18, ...styles.moveIndicator}} />}
                    {moves.bottomRight == true && <div style={{  bottom: 6, right: 18, ...styles.moveIndicator}} />}


                    {moves.left == true && <div style={{  bottom: 48, left: -3, ...styles.moveIndicator}} /> }
                    {moves.right == true && <div style={{  bottom: 48, right: -3, ...styles.moveIndicator}} /> }
                  </>
                }
              </div>
            );
          })}
        </div>

        <Link to="/levelselect">
          <div style={styles.backButton}>X</div>
        </Link>
      </div>
    );
  }
}

const getPotentialMove = (pos: { x: number, y: number } | undefined, board: TileWithData[], level: Level) => {

  const checkIndex = (checkPos: { x: number, y: number}) => {
      let index = board.findIndex(p => p.id.x == checkPos.x && p.id.y == checkPos.y);
      let indexIsValid = index != -1 && board[index].value > 0;
      return indexIsValid;
  }

  if(pos == undefined) { return {} }

      let posIsOnFullRow = pos.y % 2 == (level.firstRowFull ? 0 : 1)
      console.log("XX", "PosY(", pos.y, ") is on full row: ", posIsOnFullRow)

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
  
  // [5, 4, 5, 4, 5];
  let distribution = new Array(rows).fill(cols).map(val => {
      flip = !flip;
      return val + (flip ? -1 : 0);
  })


  let currentRow = 0;
  let currentCol = 0;
  
  let tiles = level.boardTiles.map(tile => {

    let tileData = {
        x: currentCol * 100 + (distribution[currentRow] == cols ? 0 : 50),
        y: currentRow * 85,
        value: tile,
        id: { x: currentCol, y: currentRow }
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
  moveIndicator: {position: `absolute`, height: 7, width: 7, backgroundColor: 'black', borderRadius: 5 }
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