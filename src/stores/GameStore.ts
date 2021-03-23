import { BetRegion } from "../components/GameBoard/GameBoard";

export class GameStore {
    
    public onClickRegion = (region: BetRegion) => {
        console.log("region: ", region);
    }
}
