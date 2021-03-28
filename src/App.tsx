import { observer, Provider } from 'mobx-react';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { GameBoard } from './components/GameBoard/GameBoard';
import { GameStore } from './stores/GameStore';
import { UserStore } from './stores/UserStore';

//Pages
import { Launch } from './pages/Launch/Launch';
import { Load } from './pages/Load/Load';
import { Settings } from './pages/Settings/Settings';
import { Start } from './pages/Start/Start';



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
          <Route path="/load" component={Load}/>
          <Route path="/start" component={Start} />
          <Route path="/settings" component={Settings} />
          <Route path="/" component={Launch} />
            
          </Switch>
        </Router>
      </Provider>
    );
  }
}
