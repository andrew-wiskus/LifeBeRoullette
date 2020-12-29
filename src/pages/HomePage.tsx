import { inject, observer } from 'mobx-react';
import React from 'react';
import { ApplicationStore } from '../stores/ApplicationStore';

@inject('applicationStore')
@observer
export class HomePage extends React.Component<{
  applicationStore?: ApplicationStore;
}> {
  public render() {
    return <h1>{this.props.applicationStore!.currentTick}</h1>;
  }
}
