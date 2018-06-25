import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { media } from '../styles';

@inject('gameStore')
@observer
class UserManagement extends Component {
  handleInputChange = (e) => {
    const { gameStore } = this.props;
    gameStore.setNewPlayerName(e.target.value);
  };

  addPlayer = () => {
    const { gameStore } = this.props;
    gameStore.addPlayer(gameStore.newPlayerName);
  };

  removePlayer = (player) => {
    const { gameStore } = this.props;
    gameStore.removePlayer(player.name);
  };

  render() {
    const { gameStore } = this.props;

    return (
      <div>
        <input onInput={this.handleInputChange} />
        <button onClick={this.addPlayer}>Add: {gameStore.newPlayerName}</button>
      </div>
    );
  }
}

export default UserManagement;
