import { inject } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { GameStore } from '../../../stores/GameStore';
import { styles, BetRegion } from '../../GameBoard/GameBoard';
import { RegionProps } from "../../../models/RegionProps";
import { tileHeight, tileWidth, BOTTOM_ROW_HEIGHT } from "../../GameBoard/config";

interface Props extends RegionProps {
  gameStore?: GameStore;
}

inject('gameStore')

export class ColumnButtonRow extends React.Component<Props> {
  public render() {
    return (
      <div style={styles.gameBoard}>
        {Array(36).fill(``).map((_, i) => {
          let topRow = (i + 1) % 3 == 0;
          let midRow = (i + 1) % 3 == 2;

          let leftIndex = Math.floor(((i + 1) - 0.1) / 3);

          if (topRow || midRow) { return null; }

          let region: BetRegion = {
            id: `COL_${Math.floor(i / 3)}`,
            label: `Column`,
            valuesEffected: [i + 1, i + 2, i + 3],
            returnMultiplier: 12,
          };

          let style = { backgroundColor: `red`, border: `1px solid black` };
          let baseStyle = { ...style, cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, top: tileHeight * 3, left: tileWidth * leftIndex, height: BOTTOM_ROW_HEIGHT, width: tileWidth, zIndex: 10 } as CSSProperties;

          return <>
            <div onClick={() => this.props.gameStore!.onClickRegion(region)} style={baseStyle}>
              <h1 style={{ color: 'white', fontFamily: 'courier', marginLeft: 3, marginTop: 3 }}>{i + 1}</h1>
              <h1 style={{ color: 'white', fontFamily: 'courier', marginLeft: 3, marginTop: 3 }}>{i + 2}</h1>
              <h1 style={{ color: 'white', fontFamily: 'courier', marginLeft: 3, marginTop: 3 }}>{i + 3}</h1>
            </div>
          </>;
        })}
      </div>
    );
  }
}
