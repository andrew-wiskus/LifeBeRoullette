import { observer, Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GameBoard } from './components/GameBoard/GameBoard';
import { GameStore } from './stores/GameStore';

const gameStore = new GameStore();

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider gameStore={gameStore}>
        <Router>
          <Switch>
            <Route path="/" component={GameBoard} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
