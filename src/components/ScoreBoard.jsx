import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { media } from '../styles';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.playersCount || 0}, 1fr);
  grid-auto-flow: column;
  width: 100%;
  grid-gap: 4px;
  padding: 4px;
  box-sizing: border-box;
  background-color: red;
  ${media.tablet`
    background-color: green;
  `}
`;

const Column = styled.div`
  display: grid;
  grid-gap: 4px;
`;

const Cell = styled.div`
  text-align: center;
  background-color: ${props => props.theme.primary};
`;

@inject("gameStore")
@observer
class ScoreBoard extends Component {
  render() {
    const { players } = this.props.gameStore;
    return (
      <Container playersCount={players.length}>
      {players.map((player, i) => (
        <Column key={i}>
          <Cell>{player.name}</Cell>
          {player.scores.map((score, j) => (
            <Cell key={j}>
              {score}
            </Cell>
          ))}
        </Column>
      ))}
      </Container>
    );
  }
}

export default ScoreBoard;
