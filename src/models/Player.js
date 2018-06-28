export default class Player {
  constructor({ name, teeCount }) {
    this.name = name;
    // this.scores = [...Array(teeCount)].map(() => Math.ceil(Math.random() * 4 + 1));
    this.scores = [...Array(teeCount)];
  }
}
