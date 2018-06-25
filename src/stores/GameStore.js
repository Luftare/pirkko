import { action, observable } from 'mobx';
import Player from '../models/Player';

class GameStore {
  @observable pars = [...Array(16)].map(() => 3);
  @observable currentTee = 0;
  @observable newPlayerName = '';
  @observable
  players = [
    new Player({ name: 'Jeppe' }),
    new Player({ name: 'Pasi' }),
    new Player({ name: 'Jenny' })
  ];

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
}

export default new GameStore();
