import { inject } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { GameStore } from '../../../stores/GameStore';
import { styles, BetRegion } from '../../GameBoard/GameBoard';
import { RegionProps } from "../../../models/RegionProps";
import { tileWidth, tileHeight } from "../../GameBoard/config";


interface Props extends RegionProps {
  gameStore?: GameStore
}

@inject('gameStore')
export class SelectFourButtons extends React.Component<Props> {
  public render() {

    let shouldShowButton = false;

    return (
      <div style={styles.gameBoard}>
        {Array(11).fill(``).map((_, i) => {

          let botIndex = (i * 3) + 1;
          let topIndex = (i * 3) + 2;

          let botValue = [botIndex, botIndex + 1, botIndex + 3, botIndex + 4];
          let topValue = [topIndex, topIndex + 1, topIndex + 3, topIndex + 4];

          let botRowRegion: BetRegion = {
            id: `SELECTFOUR_${botValue.join('_')}`,
            label: botValue.join('&'),
            valuesEffected: botValue,
            returnMultiplier: 9,
          };

          let topRowRegion: BetRegion = {
            id: `SELECTFOUR_${topValue.join('_')}`,
            label: topValue.join('&'),
            valuesEffected: topValue,
            returnMultiplier: 9,
          };

          let opacity = shouldShowButton ? 0.5 : 0;
          let style = { backgroundColor: `#FFFFFF88`, border: `4px solid white`, opacity: opacity };

          let baseStyle = { ...style, cursor: 'pointer', pointerEvents: 'auto', position: `absolute`, transform: `translate(-50%, -50%)`, height: 20, width: 20, zIndex: 30, left: tileWidth * (i + 1) } as CSSProperties;

          return <>
            <div onClick={() => this.props.gameStore!.onClickRegion(topRowRegion)} style={{ ...baseStyle, top: tileHeight }} />
            <div onClick={() => this.props.gameStore!.onClickRegion(botRowRegion)} style={{ ...baseStyle, top: tileHeight * 2 }} />
          </>;
        })}
      </div>
    );
  }
}
