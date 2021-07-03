import { inject } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Level, Levels } from '../../data/Levels';
import { GameStore } from '../../stores/GameStore';
import { StyleObject } from '../MainMenu/MainMenu';

interface State {
    currentLevel: Level;
}

@inject('gameStore')
export class GameBoard extends React.Component<{ gameStore?: GameStore }, State> {

    public state = {
        currentLevel: Levels[0]
    }
    
    public componentDidMount() {
        this.setState({currentLevel: this.props.gameStore!.currentLevel})
    }

    public render(): JSX.Element {
        return (
        <div style={styles.container}>
            <h1>{this.state.currentLevel.name}</h1>
            <Link to="/levelselect">
            <div style={styles.backButton}>X</div>
            </Link>
        </div>
        );
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
    height: 40,
    width: 40,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    bottom: 10,
    right: 10,
  },
};

