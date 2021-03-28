import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React, { CSSProperties } from 'react';


//Images
import startIMG from '../../images/LaunchPageIMG/start.png';
import loadIMG from './../../images/LaunchPageIMG/load.png';
import settingsIMG from './../../images/LaunchPageIMG/settings.png';
import bannerIMG from './../../images/LaunchPageIMG/logo_banner.png';

@inject('gameStore')
@observer
export class Launch extends React.Component {

  public render(): JSX.Element {
    return (
      <div style={styles.laucnPage_wrapper}>
        <div >
          <img src={bannerIMG} style={{border: '3px solid black', width: "800px", height: '600px', objectFit: 'cover'}}/>
        </div>
        <div>
        <Link to="start"><img src={startIMG} style={ {border: '3px solid black', width: '250px', height: '250px', objectFit: 'cover'} }/></Link>  
        <Link to="load"><img src={loadIMG} style={{border: '3px solid black', width: '250px', height: '250px', marginLeft: '100px', objectFit: 'cover'}}/></Link>  
        <Link to="settings"><img src={settingsIMG} style={{border: '3px solid black', width: '250px', height: '250px', marginLeft: '100px', objectFit: 'cover'}}/></Link>  
        
        </div>
      </div>
    );
  }
}

export const styles = {
  laucnPage_wrapper: { height: '100%',  textAlign: 'center', marginTop: '50px'} as CSSProperties,

}