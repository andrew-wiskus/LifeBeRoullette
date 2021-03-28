import { ActionBoardType } from "./ActionBoardType";



export class Card {
    public name: string;
    public type: ActionBoardType;

    public constructor(name: string, type: ActionBoardType) {
        this.name = name;
        this.type = type;
    }

    public get initials() {
        // "Fire Wave" => [Fire,Wave] => [F,W] => "FW";
        return this.name.split(' ').map(x => x[0]).join('');
    }
}

export const allCards = [
  new Card('Fire Ball', ActionBoardType.FIRE),
  new Card('Fire Wave', ActionBoardType.FIRE),
  new Card('Heat Whip', ActionBoardType.FIRE),
  new Card('Inferno', ActionBoardType.FIRE),
  new Card('Water gun', ActionBoardType.WATER),
  new Card('Flash Flood', ActionBoardType.WATER),
  new Card('Tsunami', ActionBoardType.WATER),
  new Card('Ice Whip', ActionBoardType.WATER),
  new Card('Earthquake', ActionBoardType.EARTH),
  new Card('Rock Toss', ActionBoardType.EARTH),
  new Card('Boulder Roll', ActionBoardType.EARTH),
  new Card('Cavern Crush', ActionBoardType.EARTH),
];
