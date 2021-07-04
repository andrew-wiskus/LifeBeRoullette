import { inject } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Tile } from '../../components/Tile';
import { Timer } from '../../components/Timer';
import { Level } from '../../data/Levels';
import { images } from '../../images/_images';
import { GameStore } from '../../stores/GameStore';
import { StyleObject } from '../MainMenu/MainMenu';

interface State {
  boardTiles: TileWithData[];
  currentPosition: {x: number, y: number} | undefined;
  runTimer: boolean;
}

interface TileWithData {
    x: number;
    y: number;
    value: number;
    id: { x: number, y: number }
}

@inject('gameStore')
export class GameBoard extends React.Component<{ gameStore?: GameStore },State> {

  private timestamp: number = 0;

  private onTimerRun = (timestamp: number) => {
    this.timestamp = timestamp;
  }

  public state: State = {
    boardTiles: [] as TileWithData[],
    currentPosition: undefined,
    runTimer: true,
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

      this.checkForWin();
    }

  }

  private checkForWin = () => {
    let value = this.state.boardTiles.reduce((a,b) => a + (b.value || 0), 0);
    if(value == 0) {
      this.onWinGame();
    }
  }

  private onWinGame = () => {
    this.setState({runTimer: false}, () => {
      console.log("time: ", this.timestamp);
    })
  }

  private onClickReset = () => {
    let tiles = getTilePositionData(this.props.gameStore!.currentLevel)

    this.setState({
      currentPosition: undefined,
      boardTiles: tiles,
      runTimer: true,
    })
  }

  public render(): JSX.Element {
    let pos = this.state.currentPosition;
    let currentLevel = this.props.gameStore!.currentLevel;

    return (
      <div style={styles.container}>

        <div style={getGameboardCenter(currentLevel)}>
          
          <h1 style={getHeaderTextStyle(currentLevel)}>
            {currentLevel.name} | <Timer timerIsRunning={this.state.runTimer} onAnimationFrame={this.onTimerRun}/>
          </h1>

          <a onClick={this.onClickReset}>
            <h1 style={getResetTextStyle(currentLevel)}>reset</h1>
          </a>

          {this.state.boardTiles.map((tile) => {

            let moves = getPotentialMove(pos, this.state.boardTiles, currentLevel);
            let isSelected = pos != undefined && pos!.y == tile.id.y && pos!.x == tile.id.x ;

            return (
              <div style={{ position: 'absolute', left: tile.x, top: tile.y }} onClick={() => this.onClickTile(tile.id.x, tile.id.y)}>
                <Tile value={tile.value} isSelected={isSelected} />
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
    textDecoration: 'underline', color: 'blue', position: 'absolute', bottom: -level.rows * 85 - 85, left: 0, right: -level.cols * 100, textAlign: 'center'
  } as CSSProperties
}

const getHeaderTextStyle = (level: Level) => {
  return {position: 'absolute', top: -50, left: 0, right: -level.cols * 100, textAlign: 'center'} as CSSProperties
}