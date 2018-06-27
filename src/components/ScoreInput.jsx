import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { observer, inject } from "mobx-react";
import { media, theme } from '../styles';

const Container = styled.div`
  ${media.tablet`

  `}
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px 16px;
  box-sizing: border-box;
`;

const TeeNumber = styled.div`
  font-size: 3em;
`;

const TeeControls = styled.div`
  display: flex;
  width: 180px;
  align-items: center;
  justify-content: space-between;
`;

const CurrentPar = styled.div`

`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 16px 32px;
  font-size: 1.5em;
`;

const PlayerScore = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  box-shadow: 0px 0px 3px #111;
  background-color: ${props => props.background};
`;

const PlayerControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
`;

const Button = styled.button`
  border: none;
  box-shadow: 0px 0px 3px #111;
  color: black;
  height: ${props => props.small ? '30px' : '45px'};
  width: ${props => props.small ? '30px' : '45px'};
  border-radius: 4px;
  font-size: inherit;
  :active {
    transform: scale(0.95, 0.95);
  }
`;

@inject("routerStore")
@inject("gameStore")
@observer
class ScoreInput extends Component {
  incrementPar = (tee) => {
    this.props.gameStore.incrementPar(tee);
  }

  decrementPar = (tee) => {
    this.props.gameStore.decrementPar(tee);
  }

  resetScore = (player, tee) => {
    if(player.scores[tee]) return;
    this.props.gameStore.setPlayerScoreAtTeeToPar(player, tee);
  }

  incrementScore = (player, tee) => {
    this.props.gameStore.incrementPlayerScoreAtTee(player, tee);
  }

  decrementScore = (player, tee) => {
    this.props.gameStore.decrementPlayerScoreAtTee(player, tee);
  }

  render() {
    const { gameStore, routerStore } = this.props;
    const { tee } = routerStore.params;
    const { pars } = gameStore;
    const par = pars[tee];
    return (
      <Container>
        <TopContainer>
          <a href={`#/play/${Math.max(0, tee - 1)}`}>prev</a>
          <a href={`#/play/${Math.min(pars.length - 1, tee + 1)}`}>next</a>
          <a href={`#/`}>home</a>
          <TeeNumber>{ tee + 1 }</TeeNumber>
          <TeeControls>
            <Button
              small
              onMouseDown={() => this.decrementPar(tee)}
              onTouchstart={() => this.decrementPar(tee)}
            >-</Button>
            <CurrentPar>{ par }</CurrentPar>
            <Button
              small
              onMouseDown={() => this.incrementPar(tee)}
              onTouchstart={() => this.incrementPar(tee)}
            >+</Button>
          </TeeControls>
        </TopContainer>
        {gameStore.players.map((player, i) => (
          <PlayerContainer key={i}>
            {player.name}
            <PlayerControls>
              <Button
                onMouseDown={() => this.decrementScore(player, tee)}
                onTouchstart={() => this.decrementScore(player, tee)}
              >-</Button>
              <PlayerScore
                onClick={() => this.resetScore(player, tee)}
                bounce={!player.scores[tee]}
                background={theme.scoreToColor(player.scores[tee], par)}
              >
                {player.scores[tee] || `?`}
              </PlayerScore>
              <Button
                onMouseDown={() => this.incrementScore(player, tee)}
                onTouchstart={() => this.incrementScore(player, tee)}
              >+</Button>
            </PlayerControls>
          </PlayerContainer>
        ))}
      </Container>
    );
  }
}

export default ScoreInput;
