export default class Player {
  constructor({ name }) {
    this.name = name;
    // this.scores = [...Array(16)].map(() => Math.ceil(Math.random() * 4 + 1));
    this.scores = [...Array(16)];
  }
}
