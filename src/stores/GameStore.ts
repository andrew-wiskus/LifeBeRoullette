import { action, computed, makeObservable, observable } from "mobx";
import { ActionBoardType } from "../models/ActionBoardType";

export class ActionSquareData {
    public valueIndex;
    public type;
    public id;

    public constructor(index: number, type: ActionBoardType) {
        this.valueIndex = index + 1;
        this.type = type;
        this.id = type + "_" + this.valueIndex;
    }
}

export class GameStore {

    constructor() {
        makeObservable(this);
    }
    
    @observable public winnerID: string = '';
    
    @observable actionSquares = {
        [ActionBoardType.FIRE]:  new Array(12).fill('').map((_, i) => new ActionSquareData(i, ActionBoardType.FIRE)),
        [ActionBoardType.WATER]: new Array(12).fill('').map((_, i) => new ActionSquareData(i, ActionBoardType.WATER)),
        [ActionBoardType.EARTH]: new Array(12).fill('').map((_, i) => new ActionSquareData(i, ActionBoardType.EARTH)),
    }

    public rollWheel() {
        let type = Math.ceil(Math.random() * 3)
        let value = Math.ceil(Math.random() * 12);

        if(type == 1) { this.winnerID = ActionBoardType.FIRE + '_' + value }
        if(type == 2) { this.winnerID = ActionBoardType.WATER + '_' + value; }
        if(type == 3) { this.winnerID = ActionBoardType.EARTH + '_' + value; }
    }
}
