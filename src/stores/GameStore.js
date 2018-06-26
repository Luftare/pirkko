import { action, observable } from 'mobx';
import Player from '../models/Player';

class GameStore {
  @observable pars = [...Array(16)].map(() => 3);
  @observable newPlayerName = '';
  @observable
  players = [
    new Player({ name: 'Jeppe' }),
    new Player({ name: 'Pasi' }),
    new Player({ name: 'Jenny' })
  ];

  @action
  incrementPar = (tee) => {
    this.pars[tee]++;
  };

  @action
  decrementPar = (tee) => {
    this.pars[tee] = Math.max(1, this.pars[tee] - 1);
  };

  @action
  addPlayer = (name) => {
    this.players.push(new Player({ name }));
  };

  @action
  removePlayer = (name) => {
    this.players = this.players.filter((player) => player.name !== name);
  };

  @action
  setNewPlayerName = (name) => {
    this.newPlayerName = name;
  };

  @action
  setPlayerScoreAtTee = (player, tee, score) => {
    player.scores[tee] = score;
  };

  @action
  setPlayerScoreAtTeeToPar = (player, tee) => {
    this.players = this.players.map((p) => {
      if (p.name === player.name) {
        p.scores[tee] = this.pars[tee];
      }
      return p;
    });
  };

  @action
  incrementPlayerScoreAtTee = (player, tee) => {
    this.players = this.players.map((p) => {
      if (p.name === player.name) {
        p.scores[tee] = p.scores[tee] ? p.scores[tee] + 1 : this.pars[tee] + 1;
      }
      return p;
    });
  };

  @action
  decrementPlayerScoreAtTee = (player, tee) => {
    this.players = this.players.map((p) => {
      if (p.name === player.name) {
        p.scores[tee] = p.scores[tee]
          ? Math.max(1, p.scores[tee] - 1)
          : this.pars[tee] - 1;
      }
      return p;
    });
  };
}

export default new GameStore();
