import { makeObservable, observable, runInAction } from 'mobx';
import { Bounds } from '../models/Bounds';
import { parseDataFromClient } from './dataFromServer';

const TICKS_PER_SECOND = 30;

export class ApplicationStore {
  @observable public currentTick = 0;
  @observable public current_health = 0;
  @observable public screen_location_x = 0;
  @observable public screen_location_y = 0;
  @observable public overload_is_active: boolean = false;
  @observable public absorption_points: number = 0;
  @observable public guzzle_bounds: Bounds | null = null;
  @observable public absorption_bounds: Bounds | null = null;
  @observable public overload_bounds: Bounds | null = null;
  @observable public markers: Marker[] = [];
  private lastTick = 0;

  public constructor() {
    makeObservable(this);
    this.startGameTickLoop();
  }

  private onTick = () => {
    fetch('http://localhost:3000/api', {
      headers: { 'Cache-Control': 'no-store' },
    })
      .then((res) => res.json())
      .then(
        (api_data) => {
          runInAction(() => {
            let data = parseDataFromClient(api_data);

            this.current_health = data.current_health;
            this.screen_location_x = data.screen_location_x;
            this.screen_location_y = data.screen_location_y;
            this.overload_is_active = data.overload_is_active;
            this.absorption_points = data.absorption_points;
            this.guzzle_bounds = data.guzzle_bounds;
            this.absorption_bounds = data.absorption_bounds;
            this.overload_bounds = data.overload_bounds;

            this.markers = data.markers;
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  private startGameTickLoop() {
    const callback = (tick: number) => {
      if (tick > 1000 / TICKS_PER_SECOND + this.lastTick) {
        this.currentTick = tick;
        this.lastTick = tick;

        // update
        this.onTick();
      }

      window.requestAnimationFrame(callback);
    };

    window.requestAnimationFrame(callback);
  }
}
