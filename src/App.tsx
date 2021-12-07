import React from 'react';
import { observer, Provider } from 'mobx-react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { GameStore } from './stores/GameStore';
import { UserStore } from './stores/UserStore';
import { Home } from './pages/Home/Home';
import { TimeStore } from './stores/TimeStore';


const gameStore = new GameStore();
const userStore = new UserStore();
const timeStore = new TimeStore();

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider userStore={userStore} gameStore={gameStore} timeStore={timeStore}>
        <Router>
          <Switch>
          <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
