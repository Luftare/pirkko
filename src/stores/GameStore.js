import { action, observable, computed, autorun } from 'mobx';
import Player from '../models/Player';

const LOCAL_STORAGE_NAME = 'FBG_GAME_DATA';

class GameStore {
  @observable pars = [...Array(16)].map(() => 3);
  @observable newPlayerName = '';
  @observable players = [];

  constructor(stateTree) {
    const storedState = window.localStorage.getItem(LOCAL_STORAGE_NAME);
    if (storedState) {
      const data = JSON.parse(storedState);
      this.players = data.players;
      this.pars = data.pars;
    }
    autorun(() => {
      const encodeData = JSON.stringify({
        players: this.players.map((p) => ({
          name: p.name,
          scores: p.scores
        })),
        pars: this.pars
      });
      localStorage.setItem(LOCAL_STORAGE_NAME, encodeData);
    });
  }

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
    this.pars = [...Array(16)].map(() => 3);
    this.newPlayerName = '';
  };

  @action
  updateTeeCount = (teeCount) => {
    this.pars = [...Array(teeCount)].map(() => 3);
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
    this.players = [
      ...this.players,
      new Player({ name, teeCount: this.pars.length })
    ];
  };

  @action
  removePlayer = (name) => {
    this.players = this.players.filter((player) => player.name !== name);
  };

  @action
  setNewPlayerName = (name) => {
    this.newPlayerName = name;
  };

  @computed
  get newPlayerNameIsValid() {
    if (this.players.find((p) => p.name === this.newPlayerName)) return;
    return this.newPlayerName.length > 0;
  }

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
