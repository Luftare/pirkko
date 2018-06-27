import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { Icon } from 'react-icons-kit';
import { flag, thumbsUp, home } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const Container = styled.div`

`;

const TopContainer = styled.div`
  display: flex;
  padding: 16px;
  box-sizing: border-box;
  font-size: 2em;
  justify-content: space-between;
  align-items: center;
`;

const ScoreContainer = styled.div`
  position: ${props => props.sticky ? 'sticky' : 'static'};
  ${props => props.bottom ? 'bottom: 0;' : 'top: 0;'}
  display: grid;
  grid-template-columns: 30px 30px repeat(${props => props.playersCount || 0}, 1fr);
  grid-auto-flow: column;
  width: 100%;
  grid-gap: 4px;
  padding: ${props => props.noTopPadding ? '0' : ''} 4px;
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
    const { rankedPlayers, pars } = this.props.gameStore;
    return (
      <Container>
        <TopContainer>
          Scores
          <a href='#/'><Icon icon={home} size={24}/></a>
        </TopContainer>
        <ScoreContainer sticky playersCount={rankedPlayers.length}>
          <Cell><Icon icon={flag} /></Cell>
          <Cell><Icon icon={thumbsUp} /></Cell>
          {rankedPlayers.map((player, i) => (
            <Cell
              key={i}
              background={theme.primary}
              color={theme.white}
            >{player.name}</Cell>
          ))}
        </ScoreContainer>
        <ScoreContainer playersCount={rankedPlayers.length} noTopPadding>
          <Column>
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
            {pars.map((p, i) => (
              <Cell
                href={`#/play/${i}`}
                key={i}
              >
                {p}
              </Cell>
            ))}
          </Column>
          {rankedPlayers.map((player, i) => (
            <Column key={i}>
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
        <ScoreContainer sticky bottom playersCount={rankedPlayers.length}>
          <Cell background={'rgba(0, 0, 0, 0)'}></Cell>
          <Cell background={'rgba(0, 0, 0, 0)'}></Cell>
          {rankedPlayers.map((player, i) => (
            <Cell
              key={i}
              background={theme.primary}
              color={theme.white}
            >{player.deviation}</Cell>
          ))}
        </ScoreContainer>
      </Container>
    );
  }
}

export default ScoreBoard;
