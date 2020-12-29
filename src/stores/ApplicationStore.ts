import { computed, makeObservable, observable } from 'mobx';

const TICKS_PER_SECOND = 10;

export class ApplicationStore {
  @observable public _currentTick = 0;
  @observable public timeLeft = 0;

  @computed
  public get currentTick() {
    return this._currentTick;
  }
  //   private additionalTickAmount = 0;
  //   private startTick = 0;

  //   public setTickAdditionalIncrement(amount: number) {
  //     this.additionalTickAmount += amount;
  //   }

  public constructor() {
    // this.startTick = 0;
    makeObservable(this);
    this.startGameTickLoop();
  }

  private startGameTickLoop() {
    const callback = (tick: number) => {
      this._currentTick = tick;
      console.log(tick);
      window.requestAnimationFrame(callback);
    };

    window.requestAnimationFrame(callback);
  }
}
