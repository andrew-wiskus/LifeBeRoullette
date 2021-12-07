import { makeObservable, observable } from "mobx";

export class UserStore {

    constructor() {
        makeObservable(this);
    }

    @observable public user = {}
}