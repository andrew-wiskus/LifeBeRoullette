import { inject } from 'mobx-react';
import React from 'react';
import { GameStore } from '../../../stores/GameStore';
import { RegionProps, styles, BetRegion } from '../../GameBoard/GameBoard';
import { tileHeight, tileWidth } from "../../GameBoard/config";


interface Props extends RegionProps {
  gameStore?: GameStore
}

@inject('gameStore')
export class TopBottomButtons extends React.Component<Props> {
  public render() {

    let shouldShowButton = false;

    return (
      <div style={styles.gameBoard}>
        {Array(36).fill(``).map((_, i) => {
          let topRow = (i + 1) % 3 == 0;
          let midRow = (i + 1) % 3 == 2;
          let botRow = (i + 1) % 3 == 1;
          let topPos = topRow ? 0 : midRow ? tileHeight : botRow ? tileHeight * 2 : -99;
          let leftIndex = Math.floor(((i + 1) - 0.1) / 3);

          if (topRow) { return null; }

          let region: BetRegion = {
            id: `TOPBOTTOM_${i + 1}_${i + 2}`,
            label: `${i + 1}&${i + 2}`,
            valuesEffected: [i + 1, i + 2],
            returnMultiplier: 18,
          };

          let opacity = shouldShowButton ? 0.5 : 0;

          let style = { backgroundColor: `#FFFFFF88`, border: `4px solid white`, opacity: opacity, transition: '1s all' };

          return <>
            <div onClick={() => this.props.gameStore!.onClickRegion(region)} style={{ ...style, pointerEvents: 'auto', cursor: 'pointer', position: `absolute`, top: topPos, left: tileWidth * leftIndex, transform: `translate(0, -50%)`, height: 20, width: tileWidth, zIndex: 10 }} />
          </>;
        })}
      </div>
    );
  }
}
