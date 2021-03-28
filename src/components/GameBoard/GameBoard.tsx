import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { GameState, GameStore } from '../../stores/GameStore';
import { ActionBoardType } from '../../models/ActionBoardType';
import { ActionBoard } from './ActionBoard';
import { ActionBasic } from './ActionBasic';
import { images } from '../../images/_images';
import { Link } from 'react-router-dom';




@inject('gameStore')
@observer
export class GameBoard extends React.Component<{gameStore?: GameStore}> {

  public render(): JSX.Element {
    return (
      <div style={styles.container}>
        <Link to="/">
          Back
        </Link>
        <div style={styles.gameBoardBackground} />
        
        <div style={styles.left_action_board} >
          <ActionBoard type={ActionBoardType.FIRE}/>
        </div>

        <div style={styles.center_action_board}>
            <ActionBoard type={ActionBoardType.WATER}/>
        </div>

        <div style={styles.right_action_board}>
            <ActionBoard type={ActionBoardType.EARTH}/>
        </div>

        <div style={styles.left_basic_board}>
            <ActionBasic type={ActionBoardType.FIRE}/>
        </div>

        <div style={styles.center_basic_board}>
            <ActionBasic type={ActionBoardType.WATER}/>
        </div>

        <div style={styles.right_basic_board}>
            <ActionBasic type={ActionBoardType.EARTH}/>
        </div>


        <div style={styles.left_game_display}>
          <button onClick={() => this.props.gameStore!.rollWheel()}>ROLL</button>
        </div>

        <div style={styles.center_game_display}>
            <MainGameWindow />
        </div>
        
        <div style={styles.right_game_display}>
          <button onClick={() => this.props.gameStore!.initPickCardState()}>PICK CARD</button>
        </div>
      </div>
    );
  }
}

@inject('gameStore')
@observer
export class MainGameWindow extends React.Component<{gameStore?: GameStore}> {
  public render() {
    let store = this.props.gameStore!;

    if(store.gameState != GameState.PICK_CARD) { return null; }

    let cards = store.cardsForStore;

    return <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: '15%', paddingRight: '15%'}}>
        {cards.map(card => {
          let bgColor = card.type == ActionBoardType.FIRE ? 'red' : card.type == ActionBoardType.WATER ? 'blue' : 'green'

          return (
            <div style={{height: '80%', flex: 1, margin: 10, backgroundColor: bgColor, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
              <h1 style={{color: 'white', fontFamily: 'courier'}}>{card.name}</h1>
            </div>
          )
        })}
        
      </div>
  }
}


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

  left_action_board: { zIndex: 99, display: 'grid', gridColumn: '3 / span 8', gridRow: '8 / span 6', backgroundColor: 'red' } as CSSProperties,
  center_action_board: { zIndex: 99, display: 'grid', gridColumn: '12 / span 8', gridRow: '8 / span 6', backgroundColor: 'blue' } as CSSProperties,
  right_action_board: { zIndex: 99, display: 'grid', gridColumn: '21 / span 8', gridRow: '8 / span 6', backgroundColor: 'green' } as CSSProperties,

  left_basic_board: { zIndex: 99, display: 'grid', gridColumn: '3 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'red' } as CSSProperties,
  center_basic_board: { zIndex: 99, display: 'grid', gridColumn: '12 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'blue' } as CSSProperties,
  right_basic_board: { zIndex: 99, display: 'grid', gridColumn: '21 / span 8', gridRow: '14 / span 2', marginTop: 10, marginBottom: -10,  backgroundColor: 'green' } as CSSProperties,


  gameBoardBackground: { zIndex: 90, display: 'grid', gridColumn: '1 / span 30', gridRow: `7 / span 10`, backgroundColor: '#EEDEDE' },

  left_game_display: { zIndex: 90, display: 'grid', gridColumn: `1 / span 5`, gridRow: `1 / span 6`, backgroundColor: '#C4C4C4'},
  center_game_display: { zIndex: 90, display: 'grid', gridColumn: `6 / span 20`, gridRow: `1 / span 6`, backgroundColor: '#908C8C'},
  right_game_display: { zIndex: 90, display: 'grid', gridColumn: `26 / span 5`, gridRow: `1 / span 6`, backgroundColor: '#C4C4C4'},
};
