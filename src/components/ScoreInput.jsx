import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { Icon } from 'react-icons-kit';
import { compass, chevronRight, chevronLeft, list, home } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const Container = styled.div`
  margin-bottom: 70px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 16px 16px;
  box-sizing: border-box;
  background-color: ${props => props.theme.lightgrey};
  z-index: 100;
  ${media.tablet`
    padding: 16px 15%;
  `}
`;

const ScoresContainer = styled.div`
  padding: 16px 16px;
  box-sizing: border-box;
  background-color: ${props => props.theme.white};
  ${media.tablet`
    padding: 16px 15%;
    > *:not(:last-child) {
      border-bottom: 2px solid ${props => props.theme.lightgrey};
    }
  `}
`;

const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
  box-sizing: border-box;
  background-color: ${props => props.theme.primary};
  ${media.tablet`
    padding: 16px 15%;
  `}
`;


const TeeNumber = styled.div`
  font-size: 3em;
`;

const TeeControls = styled.div`
  display: flex;
  width: 120px;
  align-items: center;
  justify-content: space-between;
`;

const CurrentPar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 40px;
`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 0;
  font-size: 1.5em;
  ${media.tablet`
    padding: 16px 0;
  `}
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
  width: 160px;
  ${media.tablet`
    width: 180px;
  `}
`;

const PlayerName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 165px);
  white-space: nowrap;
  ${media.tablet`
    width: calc(100% - 185px);
  `}
`;

const Button = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px #111;
  color: ${props => props.theme.black};
  background-color: ${props => props.theme.white};
  height: ${props => props.small ? '25px' : '40px'};
  width: ${props => props.small ? '25px' : '40px'};
  border-radius: 4px;
  font-size: inherit;
  :active {
    transform: scale(0.95, 0.95);
  }

  ${media.tablet`
    width: 180px;
    height: ${props => props.small ? '30px' : '50px'};
    width: ${props => props.small ? '30px' : '50px'};
  `}
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
    const teeReady = !gameStore.players.find(p => !p.scores[tee]);

    return (
      <Container>
        <TopContainer>
          <TeeNumber><Icon icon={compass} size={30} style={{color: theme.grey}} /> { tee + 1 }</TeeNumber>
          <TeeControls>
            <Button
              small
              onMouseDown={() => this.decrementPar(tee)}
              onTouchstart={() => this.decrementPar(tee)}
            >-</Button>
            <CurrentPar>par { par }</CurrentPar>
            <Button
              small
              onMouseDown={() => this.incrementPar(tee)}
              onTouchstart={() => this.incrementPar(tee)}
            >+</Button>
          </TeeControls>
        </TopContainer>
        <ScoresContainer>
          {gameStore.players.map((player, i) => (
            <PlayerContainer key={i}>
              <PlayerName>{player.name}</PlayerName>
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
        </ScoresContainer>
        <BottomContainer>
          <a href={tee > 0 ? `#/play/${tee - 1}` : `#/play/${tee}`}>
            <Icon icon={chevronLeft} style={{color: tee > 0 ? theme.white : theme.grey }} size={32}/>
          </a>
          <a href={`#/`}>
            <Icon icon={home} style={{color: theme.white}} size={32}/>
          </a>
          <a href={`#/score`}>
            <Icon icon={list} style={{color: theme.white}} size={32}/>
          </a>
          <a href={teeReady ? `#/play/${Math.min(pars.length - 1, tee + 1)}` : `#/play/${tee}`}>
            <Icon icon={chevronRight} style={{color: teeReady && (tee < gameStore.pars.length - 1) ? theme.white : theme.grey }} size={32}/>
          </a>
        </BottomContainer>
      </Container>
    );
  }
}

export default ScoreInput;
