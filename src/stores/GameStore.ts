import { makeObservable, observable } from "mobx";
import { GameController } from "../controllers/GameController";
import { Card } from "../models/Card";
import { ActionBoardType } from "../models/ActionBoardType";
import { ActionBoard } from "../components/GameBoard/ActionBoard";

export class ActionSquareData {
    public valueIndex;
    public type;
    public id;
    public assignedCard: Card | null = null;
    
    public setCard = (card: Card) => {
        this.assignedCard = card;
    }

    public constructor(index: number, type: ActionBoardType) {
        this.valueIndex = index + 1;
        this.type = type;
        this.id = type + "_" + this.valueIndex;
    }
}

export enum GameState { 
    IDLE = "IDLE",
    PICK_CARD = "PICK_CARD",
}

export class GameStore {

    constructor() {
        makeObservable(this);
    }
    
    @observable public gameState: GameState = GameState.PICK_CARD;
    @observable public currentBoardValue = { type: ActionBoardType.FIRE, value: 2 }
    @observable public cardsForStore: Card[] = GameController.getCards(3);
    
    @observable actionSquares = {
        [ActionBoardType.FIRE]:  new Array(12).fill('').map((_, i) => new ActionSquareData(i, ActionBoardType.FIRE)),
        [ActionBoardType.WATER]: new Array(12).fill('').map((_, i) => new ActionSquareData(i, ActionBoardType.WATER)),
        [ActionBoardType.EARTH]: new Array(12).fill('').map((_, i) => new ActionSquareData(i, ActionBoardType.EARTH)),
    }

    public initPickCardState() {
        this.gameState = GameState.PICK_CARD;
        this.cardsForStore = GameController.getCards(3);

        let r = Math.floor(Math.random() * 12);

        let actions = [...this.actionSquares[ActionBoardType.FIRE]]
        actions[r].setCard(this.cardsForStore[0])
        let squares = {...this.actionSquares}
        squares[ActionBoardType.FIRE] = actions;

        this.actionSquares = squares;
    }

    public rollWheel() {
        let type = Math.ceil(Math.random() * 3)
        let value = Math.ceil(Math.random() * 12);

        if(type == 1) { this.currentBoardValue = { type: ActionBoardType.FIRE, value: value } }
        if(type == 2) { this.currentBoardValue = { type: ActionBoardType.WATER, value: value }  }
        if(type == 3) { this.currentBoardValue = { type: ActionBoardType.EARTH, value: value }  }
    }
}
