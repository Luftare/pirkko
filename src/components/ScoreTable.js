import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Icon } from 'react-icons-kit';
import { compass, thumbsUp } from 'react-icons-kit/feather/';
import { theme } from '../styles';

const TableData = styled.div``;

const ScoreContainer = styled.div`
  position: ${(props) => (props.sticky ? 'sticky' : 'static')};
  ${(props) => (props.bottom ? 'bottom: 0;' : 'top: 0;')} display: grid;
  grid-template-columns: 30px 30px repeat(
      ${(props) => props.playersCount || 0},
      1fr
    );
  grid-auto-flow: column;
  width: 100%;
  grid-gap: 4px;
  padding: ${(props) => (props.noTopPadding ? '0' : '')} 4px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.white};
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
  background-color: ${(props) => props.background || props.theme.lightgrey};
  color: ${(props) => props.color || props.theme.black};
  overflow: hidden;
`;

@inject('gameStore')
@observer
class ScoreTable extends Component {
  render() {
    const { rankedPlayers, pars } = this.props.gameStore;
    const players = rankedPlayers;
    return (
      <TableData>
        <ScoreContainer sticky playersCount={players.length}>
          <Cell>
            <Icon icon={compass} />
          </Cell>
          <Cell>
            <Icon icon={thumbsUp} />
          </Cell>
          {players.map((player, i) => (
            <Cell key={i} background={theme.primary} color={theme.white}>
              {player.name}
            </Cell>
          ))}
        </ScoreContainer>
        <ScoreContainer playersCount={players.length} noTopPadding>
          <Column>
            {pars.map((p, i) => (
              <Cell href={`#/play/${i}`} key={i}>
                {i + 1}
              </Cell>
            ))}
          </Column>
          <Column>
            {pars.map((p, i) => (
              <Cell href={`#/play/${i}`} key={i}>
                {p}
              </Cell>
            ))}
          </Column>
          {players.map((player, i) => (
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
        <ScoreContainer sticky bottom playersCount={players.length}>
          <Cell background={'rgba(0, 0, 0, 0)'} />
          <Cell background={'rgba(0, 0, 0, 0)'} />
          {players.map((player, i) => (
            <Cell key={i} background={theme.primary} color={theme.white}>
              {player.deviation > 0 ? `+${player.deviation}` : player.deviation}
            </Cell>
          ))}
        </ScoreContainer>
      </TableData>
    );
  }
}

export default ScoreTable;
