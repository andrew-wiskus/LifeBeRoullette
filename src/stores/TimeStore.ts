import { makeObservable, observable } from 'mobx';


export interface TimeObj {
  mm: number;
  ss: number;
  ms: number;
  string: string;
  elapsed: number;
}


export class TimeStore {
  @observable timer_is_running = false;
  @observable start_time = 0;
  @observable time_ms = 0;
  @observable time_sec = 0;
  @observable time_min = 0;

  constructor() {
    makeObservable(this);
    this.timer_is_running = true;
    this.startTimer();
  }

  public on_tick(time: TimeObj) {
    console.log(time.elapsed);
  }

  private startTimer() {
    const step = (ms: number) => {
      var timestamp = Math.floor(ms);

      if (this.timer_is_running == false) {
        if (this.start_time != 0) {
          this.start_time = 0;
        }
        window.requestAnimationFrame(step);
        return;
      }

      if (this.start_time == 0) {
        this.start_time = timestamp;
        window.requestAnimationFrame(step);
        return;
      }

      let elapsed = timestamp - this.start_time;

      let time = this.getTimeObj(elapsed);
      this.on_tick(time);
      this.time_ms = time.ms;
      this.time_sec = time.ss;
      this.time_min = time.mm;

      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }

  private getTimeObj = (elapsed: number): TimeObj => {
    let mm: number = Math.floor(elapsed / 1000 / 60);
    let ss: number = Math.floor((elapsed / 1000) % 60);
    let ms: number = Math.floor((elapsed % 1000) / 10);

    let str_mm = mm < 10 ? '0' + mm : '' + mm;
    let str_ss = ss < 10 ? '0' + ss : '' + ss;
    let str_ms = ms < 10 ? '0' + ms : '' + ms;

    let string = `${str_mm}:${str_ss}:${str_ms}`;

    return { mm, ss, ms, string, elapsed };
  };
}
