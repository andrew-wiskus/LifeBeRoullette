import { makeObservable, observable } from "mobx";

export class UserStore {

    constructor() {
        makeObservable(this);
    }
    
    @observable public username: string = '';
    @observable public difficulty: string = '';



    public loadSaveFile(filename: string) {
        var json = require( "./../AppData/"+ filename + ".json"); 
        console.log(json)

    }

    public setstore = ({json}) => {
        this.username = json.userame;
    }
    public clearStore() {
        this.username = "";
        this.difficulty = "";
    }

}