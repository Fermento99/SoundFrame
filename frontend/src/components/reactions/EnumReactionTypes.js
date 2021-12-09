
export default class EnumReactionTypes {
  static types = [
    { type: 0,
      classes: 'reaction dimond rubineRed' },
    { type: 1,
      classes: 'reaction hexagon mediumSeaGreen' },
    { type: 2,
      classes: 'reaction pentagon violteRYB' },
    { type: 3,
      classes: 'reaction square heliotrope' },
    { type: 4,
      classes: 'reaction circle cornflowerBlue' },
    { type: 5,
      classes: 'reaction triangle ticklePink' },
    { type: 6,
      classes: 'reaction dimond blueRYB' },
    { type: 7,
      classes: 'reaction triangle citrine' },
  ];

  static genElements() {
    return this.types.map(type => <div key={type.type} className={type.classes}></div>)
  }
}