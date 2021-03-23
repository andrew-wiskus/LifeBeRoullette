import { inject } from 'mobx-react';
import React from 'react';
import { GameStore } from '../../../stores/GameStore';
import { RegionProps, styles, BetRegion } from '../../GameBoard/GameBoard';
import { tileHeight, tileWidth, getColor } from "../../GameBoard/config";


interface Props extends RegionProps {
  gameStore?: GameStore
}

@inject('gameStore')
export class NumberButtons extends React.Component<Props> {
  public render() {
    return (
      <div style={styles.gameBoard}>
        {Array(36).fill(``).map((_, i) => {

          let topRow = (i + 1) % 3 == 0;
          let midRow = (i + 1) % 3 == 2;
          let botRow = (i + 1) % 3 == 1;
          let topPos = topRow ? 0 : midRow ? tileHeight : botRow ? tileHeight * 2 : -99;

          let leftIndex = Math.floor(((i + 1) - 0.1) / 3);

          let region: BetRegion = {
            id: `SINGLE_${i + 1}`,
            label: `${i + 1}`,
            valuesEffected: [i + 1],
            returnMultiplier: 36,
          };

          return (
            <div onClick={() => this.props.gameStore!.onClickRegion(region)} style={{ pointerEvents: `auto`, cursor: 'pointer', position: 'absolute', border: `1px solid black`, zIndex: 5, left: tileWidth * leftIndex, top: topPos, height: tileHeight, width: tileWidth, backgroundColor: getColor(i), display: `flex`, justifyContent: `center`, alignItems: `center` }}>
              <h1 style={{ fontSize: 36, color: `white`, fontFamily: `courier` }}>{i + 1}</h1>
            </div>
          );
        })}
      </div>
    );
  }
}
