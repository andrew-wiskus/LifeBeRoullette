import { inject, observer } from 'mobx-react';
import React, { CSSProperties } from 'react';
import { Button } from '../../components/Button';
import { MiningAreas, miningSpeedInMS } from '../../data/Mining';
import { TimeObj, TimeStore } from '../../stores/TimeStore';
import { UserStore } from '../../stores/UserStore'
export interface StyleObject { [key: string] : CSSProperties }
 
@inject('userStore', 'timeStore')
@observer
export class Home extends React.Component<{userStore?: UserStore, timeStore?: TimeStore }> {



  public render(): JSX.Element {
    return (
      <div style={styles.container}>
        <>
        
          <h1>Mining</h1>

          <Mining />

        
        </>
      </div>
    );
  }
}


interface State {
  miningAreas: typeof MiningAreas
}

@inject('userStore', 'timeStore')
@observer
export class Mining extends React.Component<{userStore?: UserStore, timeStore?: TimeStore }, State> {

  public state: State = {
    miningAreas: MiningAreas
  }

  private onClick = (area: typeof MiningAreas[0]) => {

    let function_id = 'onTick_miningArea_' + area.id;

    if(this.props.timeStore!.isFunctionRunning(function_id)) {
      this.props.timeStore!.removeTickFunction(function_id);

      let all_areas = this.state.miningAreas;
      all_areas = all_areas.map(item => {
        if(item.id == area.id) {
          let copy = {...item}
          copy.onStopRemainingTime = area.tickForFinish - this.props.timeStore!.elapsed 
          return copy;
        }

        return item;
      })

      this.setState({miningAreas: all_areas})
      return;
    }

    let onTickMiningArea = (time: TimeObj) => {
      let mining_speed = miningSpeedInMS(area.baseSpeed, 40, 0.0);
      let current_area = this.state.miningAreas.filter(x => x.id == area.id)[0];
      
      if(current_area.onStopRemainingTime != 0) {
        let all_areas = this.state.miningAreas;
        all_areas = all_areas.map(item => {
          if(item.id == area.id) {
            let copy = {...item}
            copy.tickForFinish = this.props.timeStore!.elapsed + area.onStopRemainingTime
            copy.onStopRemainingTime = 0;
            return copy;
          }
  
          return item;
        })

        this.setState({miningAreas: all_areas})
        return;
      }

      if(current_area.tickForFinish == 0) {
        current_area.tickForFinish = time.elapsed + mining_speed;
        let all_areas = this.state.miningAreas;
        all_areas = all_areas.map(item => {
          if(item.id == area.id) {
            let copy = {...item}
            copy.tickForFinish = time.elapsed + mining_speed;;
            return copy;
          }

          return item;
        })

        this.setState({miningAreas: all_areas})
        return;
      }

      if(time.elapsed > current_area.tickForFinish) {
        let dif = time.elapsed - current_area.tickForFinish;
        let newTimeForFinish = time.elapsed + mining_speed - dif;
        let all_areas = this.state.miningAreas;
        
        all_areas = all_areas.map(item => {
          if(item.id == area.id) {
            let copy = {...item}
            copy.tickForFinish = newTimeForFinish;
            copy.percent = (copy.tickForFinish - time.elapsed) / mining_speed
            return copy;
          }

          return item;
        })

        this.setState({miningAreas: all_areas});
        return;
      } 

      if(time.elapsed < current_area.tickForFinish) {
        let all_areas = this.state.miningAreas;
        
        all_areas = all_areas.map(item => {
          if(item.id == area.id) {
            let copy = {...item}
            copy.percent = (copy.tickForFinish - time.elapsed) / mining_speed
            return copy;
          }

          return item;
        })

        this.setState({miningAreas: all_areas});
        return;
      }
    }

    this.props.timeStore!.addTickFunction(
      function_id, 
      (time) => onTickMiningArea(time)
    )
  }

  public render() {
    return <>
      {this.state.miningAreas.map(area => {
          return (
            <Button text={area.name} onClick={() => this.onClick(area)} percent={area.percent} />
          )
      
      })}

      <button onClick={() => console.log(this.state)}>test state</button>
    </>
  }
}
const styles: StyleObject = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5vh 5vh',
    width: `100vw`,
    height: `100vh`
  },
}