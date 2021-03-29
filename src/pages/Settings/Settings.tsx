import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React, { CSSProperties } from 'react';
import { UserStore } from './../../stores/UserStore'


//Assets



@inject('userStore')
@observer
export class Settings extends React.Component<{userStore?: UserStore }> {


  
  public render(): JSX.Element {

    const handleGoingBack = () => {
      this.props.history.push('/');
    }

    return (
      <div style={styles.StartPage_wrapper}>
          <form style={{border: "2px solid black"}}>
            <input 
            style={{width:"100%", height: "50px"}}
            type="text"
            placeholder="idk this is just to be visual"
            />
            <input 
            style={{width:"100%", height: "50px"}}
            type="text"
            placeholder="idk this is just to be visual"
            />
            <input 
            style={{width:"100%", height: "50px"}}
            type="text"
            placeholder="idk this is just to be visual"
            />
            <input 
            style={{width:"100%", height: "50px"}}
            type="text"
            placeholder="idk this is just to be visual"
            />
          </form>
          <button onClick={evt => handleGoingBack(evt)}>Go Back</button>
      </div>
    );
  }
}


export const styles = {
  StartPage_wrapper: { margin: "0 auto", width: "60%", height: '100%',  textAlign: 'center', marginTop: '50px'} as CSSProperties,

}