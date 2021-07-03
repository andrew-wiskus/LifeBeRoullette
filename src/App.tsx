import React from 'react';
import { observer, Provider } from 'mobx-react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { GameBoard } from './pages/GameBoard/GameBoard';
import { MainMenu } from './pages/MainMenu/MainMenu';
import { GameStore } from './stores/GameStore';
import { UserStore } from './stores/UserStore';
import { LevelSelect } from './pages/LevelSelect/LevelSelect';

const gameStore = new GameStore();
const userStore = new UserStore();

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider userStore={userStore} gameStore={gameStore}>
        <Router>
          <Switch>
          <Route path="/gameboard" component={GameBoard} />
          <Route path="/levelselect" component={LevelSelect} />
          <Route path="/" component={MainMenu} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
