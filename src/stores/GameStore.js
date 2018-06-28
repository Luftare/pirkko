import { action, observable, computed } from 'mobx';
import Player from '../models/Player';

class GameStore {
  @observable pars = [...Array(2)].map(() => 3);
  @observable newPlayerName = '';
  @observable
  players = [
    new Player({ name: 'Jeppe', teeCount: this.pars.length }),
    new Player({ name: 'Pasi', teeCount: this.pars.length }),
    new Player({ name: 'Jenny', teeCount: this.pars.length }),
    new Player({ name: 'Joku', teeCount: this.pars.length }),
    new Player({ name: 'Minä', teeCount: this.pars.length }),
    new Player({ name: 'Sinä', teeCount: this.pars.length })
  ];

  @computed
  get currentTee() {
    return this.pars.reduce((lastValidTee, _, index) => {
      const teeReady = !this.players.find((p) => !p.scores[index]);
      if (teeReady) {
        return index;
      }
      return lastValidTee;
    }, 0);
  }

  @computed
  get currentTeeReady() {
    return !this.players.find((p) => !p.scores[this.currentTee]);
  }

  @computed
  get firstUnfinishedTee() {
    return this.currentTeeReady
      ? Math.min(this.pars.length - 1, this.currentTee + 1)
      : this.currentTee;
  }

  @computed
  get courseFinished() {
    return this.currentTee === this.pars.length - 1;
  }

  @computed
  get parsTotal() {
    return this.pars.reduce((acc, val) => acc + val, 0);
  }

  @computed
  get rankedPlayers() {
    return this.players
      .map((p) => {
        p.deviation = p.scores.reduce((acc, score, i) => {
          const par = this.pars[i];
          if (par && score) {
            return acc + score - par;
          }
          return acc;
        }, 0);
        return p;
      })
      .sort((a, b) => a.deviation - b.deviation);
  }

  @action
  resetGameData = () => {
    this.players = [];
    this.pars = [];
    this.newPlayerName = '';
  };

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
    this.players.push(new Player({ name, teeCount: this.pars.length }));
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
