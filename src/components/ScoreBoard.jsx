import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { Icon } from 'react-icons-kit';
import { home } from 'react-icons-kit/feather/';
import { theme } from '../styles';
import ScoreGraph from './ScoreGraph';
import ScoreTable from './ScoreTable';

const Container = styled.div`

`;

const TopContainer = styled.div`
  display: flex;
  padding: 16px;
  box-sizing: border-box;
  font-size: 2em;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.primary};
`;

@inject("gameStore")
@observer
class ScoreBoard extends Component {
  render() {
    return (
      <Container>
        <TopContainer>
          Scores
          <a href='#/'><Icon icon={home} size={24} style={{color: theme.white}}/></a>
        </TopContainer>
        <ScoreTable />
        <ScoreGraph />
      </Container>
    );
  }
}

export default ScoreBoard;
