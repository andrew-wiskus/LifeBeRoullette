import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, CSSProperties } from 'react';
import { UserStore } from './../../stores/UserStore'


//Assets
 
@inject('userStore')
@observer
export class Start extends React.Component<{userStore?: UserStore }> {
  


  public render(): JSX.Element {
    return (
      <HandlePage/>
    );
  }
}


const HandlePage = () => {


  const [name, setName] = useState('');
  function handleChange(evt){
    setName(evt);
  }
  return (
    <div style={styles.StartPage_wrapper}>
          <div style={{border: '3px solid black', width: "800px", height: '600px', objectFit: 'cover', margin: "0 auto"}}>
            <input 
              type="text" 
              style={{width: '100%', height: '30px', border:'2px solid black'}}
              value={name}
              onChange={evt => handleChange(evt.target.value)}
              />
            <Link to="gameboard"><img style={{width: '100%', height: '30px', border:'2px solid black'}}/></Link>
          </div>
          <h1>{name}</h1>
      </div>
  );
}

export const styles = {
  StartPage_wrapper: { height: '100%',  textAlign: 'center', marginTop: '50px'} as CSSProperties,
}