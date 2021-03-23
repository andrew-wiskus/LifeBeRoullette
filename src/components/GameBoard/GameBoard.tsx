import React, { CSSProperties } from 'react';
import { RoulleteBoard } from '../RoulleteBoard/RoulleteBoard';
import { tileWidth, boardHeight, BOTTOM_ROW_HEIGHT } from './config';

const boardWidth = tileWidth * 12;
let border = 20;

export interface BetRegion {
  id: string;
  label: string;
  returnMultiplier: number;
  valuesEffected: number[];
}

export class GameBoard extends React.Component {

  public state: { region: BetRegion | undefined } = {
    region: undefined,
  };

  public render(): JSX.Element {
    return (
      <div style={styles.container}>
        <RollContainer />
        <RoulleteBoard />
      </div>
    );
  }
}

export class RollContainer extends React.Component {

  public state = { isRolling: false }

  private onClickRoll = () => {
    this.setState({isRolling: true})
  }

  public render(): JSX.Element {

    return (
      <div style={{width: `100%`, position: 'absolute', top: 0, left: 0, right: 0, height: 420 }}>
        <div style={{position: 'relative', width: `100%`, display: 'flex', height: `100%`, justifyContent: 'center', alignItems: 'center'}}>
          <div onClick={this.onClickRoll} style={{cursor: 'pointer', position: 'absolute', border: `4px solid black`, bottom: 0, width: 150, height: 40, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <h1 style={{fontFamily: 'courier'}}>ROLL</h1>
          </div>
        </div>
      </div>
    )
  }
}

export interface RegionProps {}

export const styles = {
  container: {
    border: `${border}px solid red`,
    width: window.innerWidth,
    height: window.innerHeight,
    position: 'relative',
    pointerEvents: `none`,
    backgroundColor: 'white',
  } as CSSProperties,
  gameBoard: {
    position: `absolute`,
    width: boardWidth,
    height: boardHeight,
    bottom: BOTTOM_ROW_HEIGHT * 2,
    left: `calc(50% - ${boardWidth / 2}px)`,
    zIndex: 0,
    pointerEvents: `none`,
  } as CSSProperties,
};
