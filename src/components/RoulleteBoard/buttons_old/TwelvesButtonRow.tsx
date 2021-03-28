import { inject } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { GameStore } from '../../../stores/GameStore';
import { BetRegion, styles } from '../../GameBoard/GameBoard';
import { RegionProps } from "../../../models/RegionProps";
import { tileHeight, BOTTOM_ROW_HEIGHT, tileWidth } from "../../GameBoard/config";


interface Props extends RegionProps {
  gameStore?: GameStore
}

@inject('gameStore')
export class TwelvesButtonRow extends React.Component<Props> {
  public render() {

    let firstRegion: BetRegion = {
      id: `TWELTH_1`,
      label: `First Twelth`,
      valuesEffected: Array(12).fill('').map((_, i) => i + 1),
      returnMultiplier: 3,
    };

    let secondRegion: BetRegion = {
      id: `TWELTH_2`,
      label: `Second Twelth`,
      valuesEffected: Array(12).fill('').map((_, i) => i + 13),
      returnMultiplier: 12,
    };

    let thirdRegion: BetRegion = {
      id: `TWELTH_3`,
      label: `Third Twelth`,
      valuesEffected: Array(12).fill('').map((_, i) => i + 25),
      returnMultiplier: 12,
    };

    let style = { backgroundColor: `red`, border: `1px solid black`, };
    let baseStyle = { ...style, cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 3 + BOTTOM_ROW_HEIGHT, height: BOTTOM_ROW_HEIGHT, width: tileWidth * 4, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' } as CSSProperties;

    return (
      <div style={styles.gameBoard}>
        <div onClick={() => this.props.gameStore!.onClickRegion(firstRegion)} style={{ ...baseStyle, left: (tileWidth * 4) * 0 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{`1-12`}</h1>
        </div>

        <div onClick={() => this.props.gameStore!.onClickRegion(secondRegion)} style={{ ...baseStyle, left: (tileWidth * 4) * 1 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{`13-24`}</h1>
        </div>

        <div onClick={() => this.props.gameStore!.onClickRegion(thirdRegion)} style={{ ...baseStyle, left: (tileWidth * 4) * 2 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{`25-36`}</h1>
        </div>
      </div>
    );
  }
}
