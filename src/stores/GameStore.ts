import { makeObservable, observable } from "mobx";
import { Level, Levels } from "../data/Levels";

export class GameStore {
    constructor() {
        makeObservable(this);
    }

    @observable public gameState = {};
    @observable public currentLevel: Level = Levels[0];

    public setCurrentLevel = (level: Level) => {
        this.currentLevel = level;
    }
}
