import { inject, observer } from 'mobx-react';
import React from 'react';
import { ActionSquareData, GameStore } from '../../stores/GameStore';
import { images } from '../../images/_images';
import { SlotNumberIndicator } from './SlotNumberIndicator';


@inject('gameStore')
@observer
export class ActionSquare extends React.Component<{ gameStore?: GameStore; data: ActionSquareData; }> {
  public render() {
    let data = this.props.data;
    let isLight = data.valueIndex % 2 == 0;
    if (data.valueIndex >= 5 && data.valueIndex <= 8) { isLight = !isLight; }

    let imageName = data.type + "_" + (isLight ? 'Light' : 'Dark') as keyof typeof images;
    let image: any = images[imageName];
    let winnerClass = false ? 'winner-square' : '';

    return (
      <div className={`hover-action ${winnerClass}`} style={{ flex: 1, minWidth: '25%', position: 'relative' }}>
        <SlotNumberIndicator index={data.valueIndex} isTop={true} />
        <img src={image} style={{ width: `100%`, height: `100%` }} />
        <SlotNumberIndicator index={data.valueIndex} isTop={false} />

        { data.assignedCard &&
          <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999}}>
            {/* <h1>{data.assignedCard.name}</h1> */}
            <h1>hello world</h1>
          </div>
        }
      </div>
    );
  }
}
