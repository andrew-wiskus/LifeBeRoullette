import { inject } from 'mobx-react';
import React from 'react';
import { GameStore } from '../../../stores/GameStore';
import { RegionProps, styles, BetRegion } from '../../GameBoard/GameBoard';
import { tileHeight, tileWidth, getColor } from "../../GameBoard/config";
import image0 from '../../../images/tiles/board_tiles0.png';
import image1 from '../../../images/tiles/board_tiles1.png';
import image2 from '../../../images/tiles/board_tiles2.png';
import image3 from '../../../images/tiles/board_tiles3.png';
import image4 from '../../../images/tiles/board_tiles4.png';
import image5 from '../../../images/tiles/board_tiles5.png';
import image6 from '../../../images/tiles/board_tiles6.png';
import image7 from '../../../images/tiles/board_tiles7.png';
import image8 from '../../../images/tiles/board_tiles8.png';
import image9 from '../../../images/tiles/board_tiles9.png';
import image10 from '../../../images/tiles/board_tiles10.png';
import image11 from '../../../images/tiles/board_tiles11.png';
import image12 from '../../../images/tiles/board_tiles12.png';
import image13 from '../../../images/tiles/board_tiles13.png';
import image14 from '../../../images/tiles/board_tiles14.png';
import image15 from '../../../images/tiles/board_tiles15.png';
import image16 from '../../../images/tiles/board_tiles16.png';
import image17 from '../../../images/tiles/board_tiles17.png';
import image18 from '../../../images/tiles/board_tiles0.png';

function getImage() {
  let i = Math.floor(Math.random() * 18)
  return [ image0, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18 ][i]
}


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
            <div onClick={() => this.props.gameStore!.onClickRegion(region)} style={{ pointerEvents: `auto`, backgroundImage: `url(${getImage()})`, backgroundSize: 'cover', cursor: 'pointer', position: 'absolute', zIndex: 5, left: tileWidth * leftIndex, top: topPos, height: tileHeight, width: tileWidth, backgroundColor: getColor(i), display: `flex`, justifyContent: `center`, alignItems: `center` }}>
              {/* <img style={{width: `100%`, height: `100%`, objectFit: 'contain'}} src={{uri: images[0]}} /> */}
            </div>
          );
        })}
      </div>
    );
  }
}
