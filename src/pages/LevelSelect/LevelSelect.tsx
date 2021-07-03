import { inject } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Level, Levels } from '../../data/Levels'
import { GameStore } from '../../stores/GameStore'
import { StyleObject } from '../MainMenu/MainMenu'

@inject('gameStore')
export class LevelSelect extends React.Component<{gameStore?: GameStore}> {

    private onClickLevelButton = (level: Level) => {
        console.log(this.props.gameStore)
        this.props.gameStore!.setCurrentLevel(level)
    }

    public render(): JSX.Element {
        return (
        <div style={styles.container}>

            {Levels.map((level, index) => {
                return (
                  <div style={levelButtonContainer(index, Levels.length)}>
                    <Link
                      to={'/gameboard'}
                      onClick={() => this.onClickLevelButton(level)}
                    >
                      <h1>{level.name}</h1>
                    </Link>
                  </div>
                );
            })}


            <Link to="/">
                <div style={styles.backButton}>X</div>
            </Link>
        </div>
        )
    }
}

const styles: StyleObject = {
    container: {
        display: 'grid',
        gridTemplateColumns: `repeat(5, 1fr)`,
        gridTemplateRows: `repeat(15, 1fr)`,
        height: `100vh`,
        width: `100vw`,
        position: 'relative',
        gridAutoFlow: 'column',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        borderRadius: 24,
        height: 40, width: 40,
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        bottom: 10,
        right: 10,
    },
}

const levelButtonContainer = (index: number, length: number) => {
    return {
      border: `2px solid black`,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
      borderBottom: index == length - 1 ? '2px solid black' : 'none',
    };
}