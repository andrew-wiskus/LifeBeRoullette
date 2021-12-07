import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { UserStore } from '../../stores/UserStore'

export interface StyleObject { [key: string] : CSSProperties }
 
@inject('userStore')
@observer
export class Home extends React.Component<{userStore?: UserStore }> {

  public render(): JSX.Element {
    return (
      <div style={styles.container}>
        <h1>home</h1>
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