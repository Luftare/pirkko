import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Icon } from 'react-icons-kit';
import { flag, plus, list } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const Container = styled.div`
  padding: 16px 16px;
  box-sizing: border-box;
`;

const IconButton = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  text-decoration: none;
  color: ${props => props.theme.black};
`;

@inject("routerStore")
@inject("gameStore")
@observer
class Home extends Component {

  requestNewRound = () => {
    const { gameStore, routerStore } = this.props;

    if(gameStore.courseFinished) {
      gameStore.resetGameData();
      routerStore.goTo('#/course-select');
    } else if(window.confirm('Start a new game?')) {
      gameStore.resetGameData();
      routerStore.goTo('#/course-select');
    }
  };

  render() {
    const { gameStore, routerStore } = this.props;
    const { goTo } = this.props.routerStore;

    return (
      <Container>
      <IconButton href={`#/score`}>
        <Icon
          icon={list}
          style={{marginRight: '8px', color: theme.grey}}
          size={32}
        />
        Scores
      </IconButton>
        <IconButton href={`#/play/${gameStore.firstUnfinishedTee}`}>
          <Icon
            icon={flag}
            style={{marginRight: '8px', color: theme.grey}}
            size={32}
          />
          Go to tee {gameStore.firstUnfinishedTee + 1}
        </IconButton>
        <IconButton onClick={this.requestNewRound}>
          <Icon
            icon={plus}
            style={{marginRight: '8px', color: theme.grey}}
            size={32}
          />
          New game
        </IconButton>
        <a href='#/score'>To score</a>
        <button onClick={() => goTo('/play/0')}>To game</button>
      </Container>
    );
  }
}

export default Home;
