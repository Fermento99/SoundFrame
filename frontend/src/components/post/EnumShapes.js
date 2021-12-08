

export default class EnumShapes {
  static CIRCLE = {
    name: 'Circle',
    class: 'circle'
  };
  static SQUARE = {
    name: 'Square',
    class: 'square'
  };
  static TRIANGLE = {
    name: 'Triangle',
    class: 'triangle'
  };
  static DIMOND = {
    name: 'Dimond',
    class: 'dimond'
  };
  static PENTAGON = {
    name: 'Pentagon',
    class: 'pentagon'
  };
  static HEXAGON = {
    name: 'Hexagon',
    class: 'hexagon'
  };

  static genOptions(disabled = true) {
    const options = [(<option key="default" isDisabled={disabled} value="defaultValue">-- select --</option>)];
    for (let key in EnumShapes) {
      options.push((<option key={key} value={EnumShapes[key].class}>{EnumShapes[key].name}</option>));
    }
    return options;
  };
}

