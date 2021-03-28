import { inject } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { GameStore } from '../../../stores/GameStore';
import { BetRegion, styles } from '../../GameBoard/GameBoard';import { RegionProps } from "../../../models/RegionProps";
import { tileWidth, boardHeight } from "../../GameBoard/config";
;


interface Props extends RegionProps {
  gameStore?: GameStore
}

@inject('gameStore')
export class ZeroButtonColumn extends React.Component<Props> {
  public render() {

    let singleZeroRegion: BetRegion = {
      id: `ZERO_SINGLE`,
      label: `${0}`,
      valuesEffected: [-1],
      returnMultiplier: 50,
    };

    let doubleZeroRegion: BetRegion = {
      id: `ZERO_DOUBLE`,
      label: `00`,
      valuesEffected: [-2],
      returnMultiplier: 50,
    };

    let style = { backgroundColor: `red`, border: `1px solid black` };
    let baseStyle = { ...style, pointerEvents: 'auto', cursor: 'pointer', position: `absolute`, left: -tileWidth, height: boardHeight / 2, width: tileWidth, justifyContent: 'center', alignItems: 'center', display: 'flex' } as CSSProperties;

    return (
      <div style={styles.gameBoard}>
        <div onClick={() => this.props.gameStore!.onClickRegion(singleZeroRegion)} style={{ ...baseStyle, top: 0 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{`0`}</h1>
        </div>
        <div onClick={() => this.props.gameStore!.onClickRegion(doubleZeroRegion)} style={{ ...baseStyle, top: boardHeight / 2 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{`00`}</h1>
        </div>
      </div>
    );
  }
}
