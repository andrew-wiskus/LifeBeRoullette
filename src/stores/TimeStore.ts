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
         @observable elapsed = 0;

         private tick_functions: any = {};
         private last_tick_ms = 0;
         private tick_length = 1000 / 30;
         private last_latency = 0;

         constructor() {
           makeObservable(this);
           this.timer_is_running = true;
           this.startTimer();
         }

         public on_tick(time: TimeObj) {
            this.LATENCY_DEBUG(false, time);
            this.elapsed = time.elapsed;

           Object.keys(this.tick_functions).forEach(key => {
             this.tick_functions[key](time);
           })
         }

         public addTickFunction = (id: string, func: (time: TimeObj) => void) => {
           this.tick_functions[id] = (time: TimeObj) => func(time);
         };

         public removeTickFunction = (id: string) => {
           if(this.tick_functions[id] == undefined) {
             console.log('WARNING -- WARNING -- TRYING TO DELETE KEY THAT DOESNT EXIST')
           }
           delete this.tick_functions[id] 
         }

         public isFunctionRunning = (id: string): boolean => {
           return !(this.tick_functions[id] == undefined)
         }

         private LATENCY_DEBUG = (print: boolean, time: TimeObj) => {
          let delta_latency = this.last_latency - (time.elapsed % this.tick_length);
          this.last_latency = time.elapsed % this.tick_length;
          delta_latency = delta_latency * -1;
          
          if(print == false) { return }

          console.log("Latency between ticks: ", delta_latency, "ms");
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
             this.time_ms = time.ms;
             this.time_sec = time.ss;
             this.time_min = time.mm;

             if (this.last_tick_ms + this.tick_length < elapsed) {
               this.last_tick_ms = elapsed;
               this.on_tick(time);
             }

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
