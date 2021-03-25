import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { ActionSquareData, GameStore } from '../../stores/GameStore';
import { ActionBoardType } from '../../models/ActionBoardType';
import { images } from '../../images/_images';


@inject('gameStore')
@observer
export class GameBoard extends React.Component<{gameStore?: GameStore}> {

  public render(): JSX.Element {
    return (
      <div style={styles.container}>

        
        <div style={styles.leftBoardContainer} >
          <ActionBoard type={ActionBoardType.FIRE}/>
        </div>

        <div style={styles.centerBoardContainer}>
            <ActionBoard type={ActionBoardType.WATER}/>
        </div>

        <div style={styles.rightBoardContainer}>
            <ActionBoard type={ActionBoardType.EARTH}/>
        </div>

        <div style={styles.leftBasicContainer}>
            <ActionBasic type={ActionBoardType.FIRE}/>
        </div>

        <div style={styles.rightBasicContainer}>
            <ActionBasic type={ActionBoardType.WATER}/>
        </div>

        <div style={styles.centerBasicContainer}>
            <ActionBasic type={ActionBoardType.EARTH}/>
        </div>
        <div style={styles.gameBoardBackground} />

        <div style={styles.topLeftContainer}>
          <button onClick={() => this.props.gameStore!.rollWheel()}>ROLL</button>
        </div>

        <div style={styles.topCenterContainer}>
        
        </div>
        
        <div style={styles.infoContainer} />
      </div>
    );
  }
}

@inject('gameStore')
@observer
export class ActionBoard extends React.Component<{gameStore?: GameStore, type: ActionBoardType}> {
  public render() {
    return <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {this.props.gameStore!.actionSquares[this.props.type].map((actionSquare, i) => {
        return <ActionSquare data={actionSquare} key={i} />
      })}
    </div>
  }
}

@inject('gameStore')
@observer
export class ActionSquare extends React.Component<{gameStore?: GameStore, data: ActionSquareData }> {
  public render() {
    let data = this.props.data;
    let isLight = data.valueIndex % 2 == 0;
    if(data.valueIndex >= 5 && data.valueIndex <= 8) { isLight = !isLight }

    let imageName = data.type + "_" + (isLight ? 'Light' : 'Dark') as keyof typeof images;
    let image: any = images[imageName];
    let winnerClass = this.props.gameStore!.winnerID == data.id ? 'winner-square' : '';

    return (
      <div className={`hover-action ${winnerClass}`} style={{flex: 1,  minWidth: '25%', position: 'relative'}}>
        <SlotNumberIndicator index={data.valueIndex} isTop={true}/>
        <img src={image} style={{width: `100%`, height: `100%`}} />
        <SlotNumberIndicator index={data.valueIndex} isTop={false}/>
      </div>
    )
  }
}

export class ActionBasic extends React.Component<{type: ActionBoardType }> {
  public render() {
    let image = images[`basic${this.props.type}` as keyof typeof images];
    return <div style={{width: `100%`, height: `100%`}}>
      <img src={image} style={{width: `100%`, height: `100%`, objectFit: 'cover'}}/>
    </div>
  }
}

export const SlotNumberIndicator = (props: {index: number, isTop: boolean}) => {

    let val = ((props.index - 1) % 4) + 1;
    let verticle = props.isTop ? { top: `7%` } : { bottom: `12%` }

    let image = props.index < 5 ? images.slotNumber.triangle : props.index < 9 ? images.slotNumber.circle : images.slotNumber.square;

    return (
          <div style={{position: 'absolute', ...verticle, left: '20%', right: '20%', display: 'flex', justifyContent: 'space-around', flexDirection: 'row'}}>
            {new Array(val).fill('').map(() => {
              return <div style={{height: 10, width: 10,}}>
                  <img src={image} style={{height: `100%`, width: `100%`, objectFit: 'contain'}} />
                </div>
            })}
          </div>
    )
}

export interface RegionProps {}

export const styles = {
  container: {
    width: window.innerWidth,
    height: window.innerHeight,
    position: 'relative',
    backgroundColor: 'white',
    display: 'grid',
    gridTemplateColumns: 'repeat(30, 1fr)',
    gridTemplateRows: `repeat(16, 1fr) `
  } as CSSProperties,
  leftBoardContainer: { zIndex: 99, display: 'grid', gridColumn: '3 / span 8', gridRow: '8 / span 6', backgroundColor: 'red' } as CSSProperties,
  centerBoardContainer: { zIndex: 99, display: 'grid', gridColumn: '12 / span 8', gridRow: '8 / span 6', backgroundColor: 'blue' } as CSSProperties,
  rightBoardContainer: { zIndex: 99, display: 'grid', gridColumn: '21 / span 8', gridRow: '8 / span 6', backgroundColor: 'green' } as CSSProperties,

  leftBasicContainer: { zIndex: 99, display: 'grid', gridColumn: '3 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'red' } as CSSProperties,
  rightBasicContainer: { zIndex: 99, display: 'grid', gridColumn: '12 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'blue' } as CSSProperties,
  centerBasicContainer: { zIndex: 99, display: 'grid', gridColumn: '21 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'green' } as CSSProperties,


  gameBoardBackground: { zIndex: 90, display: 'grid', gridColumn: '1 / span 30', gridRow: `7 / span 10`, backgroundColor: '#EEDEDE' },

  topLeftContainer: { zIndex: 90, display: 'grid', gridColumn: `1 / span 5`, gridRow: `1 / span 6`, backgroundColor: '#C4C4C4'},
  topCenterContainer: { zIndex: 90, display: 'grid', gridColumn: `6 / span 20`, gridRow: `1 / span 6`, backgroundColor: '#908C8C'},
  infoContainer: { zIndex: 90, display: 'grid', gridColumn: `26 / span 5`, gridRow: `1 / span 6`, backgroundColor: '#C4C4C4'},
};
