import { observer, Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ApplicationStore } from './stores/ApplicationStore';

const applicationStore = new ApplicationStore();

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider applicationStore={applicationStore}>
        <Router>
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
