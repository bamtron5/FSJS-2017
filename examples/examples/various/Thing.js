 /*jshint esversion: 6 */


class Thing {
  constructor() {
    this.name = "ball";
    this.color = "red";
    this.weight = "9oz";
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
  }
}
