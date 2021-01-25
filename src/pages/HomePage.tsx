import { inject, observer } from 'mobx-react';
import React from 'react';
import { ApplicationStore } from '../stores/ApplicationStore';
import { Perlin } from '../util/perlin';


const TICKS_PER_SECOND = 1;

@inject('applicationStore')
@observer
export class NMZ_Page extends React.Component<{
  applicationStore?: ApplicationStore;
}> {

  private pn = new Perlin(Math.random());
  private x = 0;
  private y = 0;

  private noise = () => {
    this.x += 0.01;
    this.y += 0.01;
    return this.pn.noise(this.x, this.y, 0);
  }


  private lastTick = 0;
  private activeTask = false;
  private killAllProcesses = false;

  private startAllProcess = () => {
    this.killAllProcesses = false;
    this.startGameTickLoop();
  }

  private startGameTickLoop = () => {
    const callback = (tick: number) => {
      if (tick > 1000 / TICKS_PER_SECOND + this.lastTick) {
        this.lastTick = tick;

        if (this.activeTask == false && this.killAllProcesses == false) {
          // do the cycle
        }
      }

      window.requestAnimationFrame(callback);
    };

    window.requestAnimationFrame(callback);
  };


  public render() {

    let store = this.props.applicationStore!;

    return (
      <div style={{position: 'absolute', top: 0, left: 0}}>
        <p>current health: {store.current_health}</p>
        <p>rand: {this.noise()}</p>
        {store.overload_bounds ? <p>overload xy: {store.overload_bounds!.x},{store.overload_bounds!.y}</p> : <p>no overload :(</p> }
      </div>
    );
  }
}

// @ 1144 + 40 + 4 / 1764

// @ 876 + 27 + 4 / 1347
