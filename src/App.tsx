import { observer, Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NMZ_Page } from './pages/HomePage';
import { MouseTesting } from './pages/MouseTesting';
import { ApplicationStore } from './stores/ApplicationStore';

const applicationStore = new ApplicationStore();

@observer
export default class App extends React.Component {
  render() {
    return (
      <Provider applicationStore={applicationStore}>
        <Router>
          <Switch>
            <Route path="/" component={MouseTesting} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
