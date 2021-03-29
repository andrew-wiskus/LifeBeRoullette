import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { UserStore } from './../../stores/UserStore'
import { FileController } from './../../controllers/FileController';


//Assets
 
@inject('userStore')
@observer
export class Start extends React.Component<{userStore?: UserStore }> {

  public state = {
    localusername: '',
    localdifficulty: '',
    currentDateTime: '',
  } 

  public handleName = (evt) => {
    this.props.userStore!.username = evt;
    this.state.localusername = evt
  }
  public handleDifficulty = (evt) => {
    this.props.userStore!.difficulty = evt;
    this.state.localdifficulty = evt
  }

  public handleSubmit(evt){
    evt.preventDefault();
    FileController.startSaveFile(this.props.userStore!.username, this.props.userStore!.difficulty, Date().toLocaleString() );
    this.props.history.push('/gameboard');
  }

  public render(): JSX.Element {
    const handleGoingBack = () => {
      this.props.history.push('/');
    }
      return (
        <div style={styles.StartPage_wrapper}>
              
              <div style={{width: "800px", margin: "0 auto"}}>
                <form onSubmit={evt => this.handleSubmit(evt)}>
                <input 
                  required
                  type="text"
                  placeholder="Name"
                  style={{width: '100%', height: '70px', border:'2px solid black', fontSize: "30px"}}
                  value={this.props.userStore!.username}
                  onChange={evt => this.handleName(evt.target.value)}
                  />
                  <input 
                  required
                  type="text" 
                  placeholder="Difficulty"
                  style={{width: '100%', height: '70px', border:'2px solid black', fontSize: "30px"}}
                  value={this.props.userStore!.difficulty}
                  onChange={evt => this.handleDifficulty(evt.target.value)}
                  />
                  <button onClick={evt => handleGoingBack()}>Go Back</button>
                  <button type="submit">Start</button>
                  
                </form>
              </div>
              
          </div>
      );
  }
}




export const styles = {
  StartPage_wrapper: { height: '100%',  textAlign: 'center', marginTop: '50px'} as CSSProperties,
}