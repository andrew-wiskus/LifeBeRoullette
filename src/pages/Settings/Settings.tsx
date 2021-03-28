import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React, { CSSProperties } from 'react';


//Assets



@inject('gameStore')
@observer
export class Settings extends React.Component {

  public render(): JSX.Element {
    return (
      <div style={styles.StartPage_wrapper}>
          <img style={{border: '3px solid black', width: "800px", height: '600px', objectFit: 'cover'}}/>
          <Link to="gameboard"><img style={{width: '100%', height: '30px', border:'3px solid black'}}/></Link>
      </div>
    );
  }
}


export const styles = {
  StartPage_wrapper: { height: '100%',  textAlign: 'center', marginTop: '50px'} as CSSProperties,

}