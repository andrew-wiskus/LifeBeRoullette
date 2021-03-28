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
export class FiftyFiftyButtonRow extends React.Component<Props> {
  public render() {

    let lowRegion: BetRegion = {
      id: `LOWER_EIGHTEEN`,
      label: `1-18`,
      valuesEffected: Array(18).fill('').map((_, i) => i + 1),
      returnMultiplier: 2,
    };

    let highRegion: BetRegion = {
      id: `UPPER_EIGHTEEN`,
      label: `19-36`,
      valuesEffected: Array(18).fill('').map((_, i) => i + 19),
      returnMultiplier: 2,
    };

    let evenRegion: BetRegion = {
      id: `EVEN`,
      label: `EVEN`,
      valuesEffected: Array(18).fill('').map((_, i) => (i + 1) * 2),
      returnMultiplier: 2,
    };

    let oddRegion: BetRegion = {
      id: `ODD`,
      label: `ODD`,
      valuesEffected: Array(18).fill('').map((_, i) => ((i + 1) * 2) - 1),
      returnMultiplier: 2,
    };

    let blackRegion: BetRegion = {
      id: `BLACK`,
      label: `BLACK`,
      valuesEffected: Array(18).fill('').map((_, i) => (i + 1) * 2),
      returnMultiplier: 2,
    };

    let redRegion: BetRegion = {
      id: `RED`,
      label: `RED`,
      valuesEffected: Array(18).fill('').map((_, i) => ((i + 1) * 2) - 1),
      returnMultiplier: 2,
    };

    let style = { backgroundColor: `red`, border: `1px solid black` };

    let baseStyle = { ...style, top: tileHeight * 3 + BOTTOM_ROW_HEIGHT * 2, cursor: 'pointer', pointerEvents: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', position: `absolute`, height: BOTTOM_ROW_HEIGHT, width: tileWidth * 2, zIndex: 10 } as CSSProperties;

    return (
      <div style={styles.gameBoard}>

        <div onClick={() => this.props.gameStore!.onClickRegion(lowRegion)} style={{ ...baseStyle, left: (tileWidth * 2) * 0 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{lowRegion.label}</h1>
        </div>


        <div onClick={() => this.props.gameStore!.onClickRegion(evenRegion)} style={{ ...baseStyle, left: (tileWidth * 2) * 1 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{evenRegion.label}</h1>
        </div>


        <div onClick={() => this.props.gameStore!.onClickRegion(redRegion)} style={{ ...baseStyle, left: (tileWidth * 2) * 2 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{redRegion.label}</h1>
        </div>


        <div onClick={() => this.props.gameStore!.onClickRegion(blackRegion)} style={{ ...baseStyle, left: (tileWidth * 2) * 3 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{blackRegion.label}</h1>
        </div>


        <div onClick={() => this.props.gameStore!.onClickRegion(oddRegion)} style={{ ...baseStyle, left: (tileWidth * 2) * 4 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{oddRegion.label}</h1>
        </div>


        <div onClick={() => this.props.gameStore!.onClickRegion(highRegion)} style={{ ...baseStyle, left: (tileWidth * 2) * 5 }}>
          <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{highRegion.label}</h1>
        </div>

      </div>
    );
  }
}
