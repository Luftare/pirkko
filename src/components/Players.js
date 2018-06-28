import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { inject, observer } from 'mobx-react';
import { Icon } from 'react-icons-kit';
import { x, user, userPlus, arrowRight, home } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Content = styled.div`
  padding: 16px 16px;
  box-sizing: border-box;
`;

const Players = styled.div`
  display: block;
  width: 100%;
`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4em;
  padding: 8px 0;
  animation: ${fadeIn} 500ms;
`;

const PlayerDetails = styled.span`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.black};
`;

const InputContainer = styled.form`
  display: grid;
  grid-template-columns: auto 50px;
  width: 100%;
  padding: 16px 0;
  box-sizing: border-box;
`;

const Submit = styled.button`
  border: none;
  background: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.primary};
`;

const DoubleContainer = styled.div`
  display: flex;
  padding: 16px;
  box-sizing: border-box;
  font-size: 2em;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.background || props.theme.lightgrey};
  color: ${(props) => props.color || props.theme.black};
`;

const PlayerNameInput = styled.input`
  border: none;
  border-radius: 4px;
  padding: 4px;
  font-size: 1.3em;
  box-shadow: 0px 0px 3px #111;
  box-sizing: border-box;
  width: 100%;
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  background-color: ${(props) => props.theme.primary};
  font-size: 2em;
  color: ${(props) => props.theme.white};
  animation: ${fadeIn} 500ms;
`;

@inject('gameStore')
@observer
class PlayersComponent extends Component {
  handleUserSubmit = (e) => {
    e.preventDefault();
    const { gameStore } = this.props;
    if (!gameStore.newPlayerNameIsValid) return;
    gameStore.addPlayer(gameStore.newPlayerName);
    gameStore.setNewPlayerName('');
    this.nameInput.focus();
  };

  handleInputChange = (e) => {
    const { gameStore } = this.props;
    gameStore.setNewPlayerName(e.target.value.slice(0, 20));
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

    const bottomSection =
      gameStore.players.length > 0 ? (
        <Link href={`#/play/${gameStore.firstUnfinishedTee}`}>
          <BottomContainer>
            Go to tee {gameStore.firstUnfinishedTee + 1}
            <Icon icon={arrowRight} size={32} />
          </BottomContainer>
        </Link>
      ) : null;

    return (
      <div>
        <DoubleContainer>
          Players
          <Link href="#/">
            <Icon icon={home} size={24} />
          </Link>
        </DoubleContainer>
        <Content>
          <Players>
            {gameStore.players.map((player, i) => (
              <PlayerContainer key={i}>
                <PlayerDetails>
                  <Icon
                    icon={user}
                    size={32}
                    style={{ color: theme.grey, marginRight: '8px' }}
                  />
                  {player.name}
                </PlayerDetails>
                <Icon
                  icon={x}
                  size={32}
                  style={{ color: theme.grey }}
                  onClick={() => this.removePlayer(player)}
                />
              </PlayerContainer>
            ))}
          </Players>
          <InputContainer onSubmit={this.handleUserSubmit}>
            <PlayerNameInput
              placeholder={'Name'}
              innerRef={(node) => (this.nameInput = node)}
              value={gameStore.newPlayerName}
              onInput={this.handleInputChange}
            />
            <Submit type={'submit'}>
              <Icon
                icon={userPlus}
                size={32}
                style={{
                  color: gameStore.newPlayerNameIsValid
                    ? theme.primary
                    : theme.grey
                }}
              />
            </Submit>
          </InputContainer>
        </Content>
        {bottomSection}
      </div>
    );
  }
}

export default PlayersComponent;
