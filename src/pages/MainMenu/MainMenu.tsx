import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { UserStore } from '../../stores/UserStore'

export interface StyleObject { [key: string] : CSSProperties }
 
@inject('userStore')
@observer
export class MainMenu extends React.Component<{userStore?: UserStore }> {

  public render(): JSX.Element {
    return (
      <div style={styles.container}>

        <h1 style={styles.headerText}>PATH</h1>
        <div style={styles.buttonContainer}>

        <Link to="/levelselect">
          <h1 style={styles.buttonText}>play</h1>
        </Link>
        </div>

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
  headerText: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 18,
    margin: 10,
    marginTop: 35,
  }
}