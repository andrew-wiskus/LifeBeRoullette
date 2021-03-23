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
        <RoulleteBoard />
      </div>
    );
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
    bottom: BOTTOM_ROW_HEIGHT * 3,
    left: `calc(50% - ${boardWidth / 2}px)`,
    zIndex: 0,
    pointerEvents: `none`,
  } as CSSProperties,
};
