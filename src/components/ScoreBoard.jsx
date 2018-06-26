import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { media, theme } from '../styles';

const Container = styled.div`

`;

const ScoreContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.playersCount || 0}, 1fr);
  grid-auto-flow: column;
  width: 100%;
  grid-gap: 4px;
  padding: 4px;
  box-sizing: border-box;
  ${media.tablet`
    background-color: green;
  `}
`;

const Column = styled.div`
  display: grid;
  grid-gap: 4px;
`;

const Cell = styled.a`
  text-decoration: none;
  color: black;
  text-align: center;
  background-color: ${props => props.background || props.theme.lightgrey};
`;

@inject("gameStore")
@observer
class ScoreBoard extends Component {
  render() {
    const { players, pars } = this.props.gameStore;
    return (
      <Container>
        <a href='#/'>home</a>
        <ScoreContainer playersCount={players.length}>
        {players.map((player, i) => (
          <Column key={i}>
            <Cell>{player.name}</Cell>
            {pars.map((par, j) => (
              <Cell
                key={j}
                href={`#/play/${j}`}
                background={theme.scoreToColor(player.scores[j], pars[j])}
              >
                {player.scores[j] ? player.scores[j] : '?'}
              </Cell>
            ))}
          </Column>
        ))}
        </ScoreContainer>
      </Container>
    );
  }
}

export default ScoreBoard;
