import { allCards } from '../models/Card';

// This is a DUMB controller;
// throughout the codebase, anything that is named "Controller" is DUMB
// Dumb meaning it holds no data, only static functions that control the game
// "Given XYZ, give me this set of random cards"
// "Given we have 10% bonus of rolling Water actions, tell me the winning slot"
// "Given the users current level, give me a new monster to fight"

// This class, and all other "Controllers" like it ONLY ACCEPT variables, they do not store ANY data that updates..
// So the only thing they can store is configuration data, but even that should be exported to its own home.

// DUMB -- Doesnt Understand Mutating Bytes.
// ^ title is a wip.

// :)

export class GameController {
  public static getCards(amount: number) {
    let out = [];

    for (var i = 0; i < amount; i++) {
      let r = Math.floor(Math.random() * allCards.length);
      out.push(allCards[r]);
    }

    return out;
  }
}


