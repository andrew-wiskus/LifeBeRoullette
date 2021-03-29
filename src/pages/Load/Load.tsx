import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { FileController } from './../../controllers/FileController';
import { UserStore } from './../../stores/UserStore'

//Assets

@inject('userStore')
@observer
export class Load extends React.Component<{userStore?: UserStore }> {

  public render(): JSX.Element {

    const handleGoingBack = () => {
      this.props.history.push('/');
    }

    const handleClick = (evt) =>{
      var json = require( "./../../AppData/"+ evt + ".json"); 
        console.log(json)
        this.props.userStore!.username = json.name;
        this.props.userStore!.difficulty = json.difficulty;
        this.props.history.push('/gameboard');
    }
    
    const handleGetDate = (name) => {
      return FileController.getDate(name);
    }

    let savefiles = FileController.readSaveFiles();
    savefiles.shift();
    return (
      <div style={styles.StartPage_wrapper}>
        
          <div style={{margin: "0 auto", width: "800px"}} >
          <ul>
          {savefiles.map((savefilename) =>
          <li style={{
            marginTop: "5px", 
            cursor: "pointer", 
            width: "100%", 
            height: "100px", 
            border: "2px solid black"
            }} onClick={evt => handleClick(savefilename)} > 
            <ul>
              <li>
                {savefilename}
              </li>
              <li>
                {handleGetDate(savefilename)}
              </li>
              <li>
                <h3>
                  Click To Load
                </h3>
              </li>
            </ul>
          </li>
          )}
          </ul>
          </div>
          <button onClick={evt => handleGoingBack(evt)}>Go Back</button>
      </div>
    );
  }
}

export const styles = {
  StartPage_wrapper: { height: '100%',  textAlign: 'center', marginTop: '50px'} as CSSProperties,

}