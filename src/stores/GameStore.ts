import { makeObservable, observable } from "mobx";

export class GameStore {

    constructor() {
        makeObservable(this);
    }

    @observable public gameState = {};
}
