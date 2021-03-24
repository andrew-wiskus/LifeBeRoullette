import { inject } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { GameStore } from '../../../stores/GameStore';
import { RegionProps, BetRegion, styles } from '../../GameBoard/GameBoard';
import { tileWidth, tileHeight } from "../../GameBoard/config";


interface Props extends RegionProps {
  gameStore?: GameStore
}

@inject('gameStore')
export class RowButtonColumn extends React.Component<Props> {
  public render() {

    let botRow: BetRegion = {
      id: `ROW_BOTTOM`,
      label: `Bottom Row`,
      valuesEffected: Array(12).fill('').map((_, i) => i * 3 + 1),
      returnMultiplier: 3,
    };

    let midRow: BetRegion = {
      id: `ROW_MID`,
      label: `Middle Row`,
      valuesEffected: Array(12).fill('').map((_, i) => i * 3 + 2),
      returnMultiplier: 3,
    };

    let topRow: BetRegion = {
      id: `ROW_TOP`,
      label: `Top Row`,
      valuesEffected: Array(12).fill('').map((_, i) => i * 3 + 3),
      returnMultiplier: 3,
    };

    let style = { backgroundColor: `red`, border: `1px solid black` };
    let baseStyle = { ...style, cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, right: -tileWidth, height: tileHeight, width: tileWidth, display: 'flex', justifyContent: 'center', alignItems: 'center' } as CSSProperties;

    return (
      <div style={styles.gameBoard}>
        <div onClick={() => this.props.gameStore!.onClickRegion(topRow)} style={{ ...baseStyle, top: tileHeight * 0 }}>
          <h1 style={{ color: 'white', fontFamily: 'courier', marginLeft: 3, marginTop: 3 }}>{`<-- ROW`}</h1>
        </div>
        <div onClick={() => this.props.gameStore!.onClickRegion(midRow)} style={{ ...baseStyle, top: tileHeight * 1 }}>
          <h1 style={{ color: 'white', fontFamily: 'courier', marginLeft: 3, marginTop: 3 }}>{`<-- ROW`}</h1>
        </div>
        <div onClick={() => this.props.gameStore!.onClickRegion(botRow)} style={{ ...baseStyle, top: tileHeight * 2 }}>
          <h1 style={{ color: 'white', fontFamily: 'courier', marginLeft: 3, marginTop: 3 }}>{`<-- ROW`}</h1>
        </div>
      </div>
    );
  }
}
