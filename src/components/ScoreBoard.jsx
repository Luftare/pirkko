import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { Icon } from 'react-icons-kit';
import { flag, crosshair } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const Container = styled.div`

`;

const ScoreContainer = styled.div`
  display: grid;
  grid-template-columns: 30px 30px repeat(${props => props.playersCount || 0}, 1fr);
  grid-auto-flow: column;
  width: 100%;
  grid-gap: 4px;
  padding: 4px;
  box-sizing: border-box;
  background-color: ${props => props.theme.black};
`;

const Column = styled.div`
  display: grid;
  grid-gap: 4px;
`;

const Cell = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  text-decoration: none;
  border-radius: 2px;
  background-color: ${props => props.background || props.theme.lightgrey};
  color: ${props => props.color || props.theme.black};
  overflow: hidden;
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
        <Column>
          <Cell><Icon icon={flag} /></Cell>
          {pars.map((p, i) => (
            <Cell
              href={`#/play/${i}`}
              key={i}
            >
              {i + 1}
            </Cell>
          ))}
        </Column>
        <Column>
          <Cell><Icon icon={crosshair} /></Cell>
          {pars.map((p, i) => (
            <Cell
              href={`#/play/${i}`}
              key={i}
            >
              {p}
            </Cell>
          ))}
        </Column>
        {players.map((player, i) => (
          <Column key={i}>
            <Cell
               background={theme.primary}
               color={theme.white}
            >{player.name}</Cell>
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
