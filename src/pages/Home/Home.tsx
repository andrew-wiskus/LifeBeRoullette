import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { TimeStore } from '../../stores/TimeStore';
import { UserStore } from '../../stores/UserStore'
export interface StyleObject { [key: string] : CSSProperties }
 
@inject('userStore', 'timeStore')
@observer
export class Home extends React.Component<{userStore?: UserStore, timeStore?: TimeStore }> {

  private onClick = () => {
    let inc = Math.floor(Math.random() * 1000)
    this.props.timeStore!.addTickFunction('test_' + inc, () => console.log('works!! ' + 'test_' + inc))
  }

  public render(): JSX.Element {
    return (
      <div style={styles.container}>
        <h1>home</h1>
        <button onClick={() => this.onClick()}>TEST ADD</button>
      </div>
    );
  }
}

const styles: StyleObject = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: `100vw`,
    height: `100vh`
  },
}