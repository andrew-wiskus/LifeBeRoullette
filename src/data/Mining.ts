
enum Ore {
  RuneSlate,
  Copper,
  Tin,
  Clay,
  Stone,
  Coal,
  Iron,
  Sand,
  Silver,
  Salt,
  Mithril,
  Adamantite,
  Runite,
  Stygian,
  Gold,
}

export function miningSpeedInMS(baseSpeed: number, miningLevel: number, hastePercent: number) {
    return Math.floor((baseSpeed / (miningLevel + 99)) * 100 * (1 - hastePercent) * 1000);
}


export const MiningAreas = [
  {
    levelRequired: 1,
    name: `Clay Pit`,
    id: `ClayPit`,
    xp: [1, 5],
    ore: [
        Ore.Copper, 
        Ore.Tin, 
        Ore.Clay, 
        Ore.Stone, 
        Ore.Sand
    ],

    baseSpeed: 5.0,

    // required for functionality
    tickForFinish: 0,
    percent: 0,
    onStopRemainingTime: 0,
  },
  {
    levelRequired: 10,
    name: `City Outskirts`,
    id: `CityOutskirts`,
    xp: [1, 15],
    ore: [
        Ore.Copper, 
        Ore.Tin, 
        Ore.Iron, 
        Ore.Clay, 
        Ore.Stone, 
        Ore.Sand
    ],
    baseSpeed: 8.0,

    // required for functionality
    tickForFinish: 0,
    percent: 0,
    onStopRemainingTime: 0,
  },
  {
    levelRequired: 20,
    name: `Village`,
    id: `Village`,
    xp: [1, 15],
    ore: [
        Ore.Iron, 
        Ore.Stone, 
        Ore.Coal
    ],
    baseSpeed: 8.0,

    // required for functionality
    tickForFinish: 0,
    percent: 0,
    onStopRemainingTime: 0,
  },
  {
    levelRequired: 30,
    name: `Desert`,
    id: `Desert`,
    xp: [1, 50],
    ore: [
      Ore.Iron,
      Ore.Gold,
      Ore.Mithril,
      Ore.Clay,
      Ore.Sand,
      Ore.Silver,
      Ore.Coal,
      Ore.RuneSlate,
      Ore.Salt,
    ],
    baseSpeed: 12.0,

    // required for functionality
    tickForFinish: 0,
    percent: 0,
    onStopRemainingTime: 0,
  },
  {
    levelRequired: 40,
    name: `Underground`,
    id: `Underground`,
    xp: [1, 50],
    ore: [
      Ore.Iron,
      Ore.Gold,
      Ore.Mithril,
      Ore.Stone,
      Ore.Silver,
      Ore.Coal,
      Ore.RuneSlate,
      Ore.Salt,
    ],
    baseSpeed: 12.0,

    // required for functionality
    tickForFinish: 0,
    percent: 0,
    onStopRemainingTime: 0,
  },
  {
    levelRequired: 50,
    name: `Hidden Mine`,
    id: `HiddenMine`,
    xp: [1, 100],
    ore: [
      Ore.Gold,
      Ore.Mithril,
      Ore.Adamantite,
      Ore.Runite,
      Ore.Stone,
      Ore.Silver,
      Ore.RuneSlate,
    ],
    baseSpeed: 15.0,

    // required for functionality
    tickForFinish: 0,
    percent: 0,
    onStopRemainingTime: 0,
  },
  {
    levelRequired: 60,
    name: `Volcano`,
    id: `Volcano`,
    xp: [1, 100],
    ore: [
      Ore.Gold,
      Ore.Mithril,
      Ore.Adamantite,
      Ore.Runite,
      Ore.Silver,
      Ore.RuneSlate,
    ],
    baseSpeed: 15.0,

    // required for functionality
    tickForFinish: 0,
    percent: 0,
    onStopRemainingTime: 0,
  },
  {
    levelRequired: 70,
    name: `Deep Pit`,
    id: `DeepPit`,
    xp: [10, 150],
    ore: [
        Ore.Gold, 
        Ore.Runite, 
        Ore.Stygian, 
        Ore.RuneSlate
    ],
    baseSpeed: 20.0,

    // required for functionality
    tickForFinish: 0,
    percent: 0,
    onStopRemainingTime: 0,
  },
];
