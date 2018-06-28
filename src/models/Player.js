export default class Player {
  constructor({ name, teeCount }) {
    this.name = name;
    this.scores = [...Array(teeCount)];
  }
}
