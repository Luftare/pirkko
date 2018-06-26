import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { media } from '../styles';

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
  height: ${props => props.small ? '30px' : '50px'};
  width: ${props => props.small ? '30px' : '50px'};
  border-radius: 4px;
  font-size: inherit;
  :active {
    transform: scale(0.9, 0.9);
  }
`;

@inject("gameStore")
@inject("routerStore")
@observer
class ScoreInput extends Component {
  render() {
    const { gameStore, routerStore } = this.props;
    const { tee } = routerStore.params;
    return (
      <Container>
        <TopContainer>
          <a href={`#/play/${tee - 1}`}>prev</a>
          <a href={`#/play/${tee + 1}`}>next</a>
          <a href={`#`}>home</a>
          <TeeNumber>{ tee }</TeeNumber>
          <TeeControls>
            <Button small>-</Button>
            <CurrentPar>3</CurrentPar>
            <Button small>+</Button>
          </TeeControls>
        </TopContainer>
        {gameStore.players.map((player, i) => (
          <PlayerContainer key={i}>
            {player.name}
            <PlayerControls>
              <Button>-</Button>
              <PlayerScore>5</PlayerScore>
              <Button>+</Button>
            </PlayerControls>
          </PlayerContainer>
        ))}
      </Container>
    );
  }
}

export default ScoreInput;
