import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import discImage from '../assets/disc.jpg';
import flagImage from '../assets/flag.png';
import freeImage from '../assets/free.png';
import { Icon } from 'react-icons-kit';
import { arrowRight, plus, list, users } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const Content = styled.div`
  padding: 16px 16px;
  box-sizing: border-box;
  margin-bottom: 60px;
`;

const IconButton = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  text-decoration: none;
  color: ${props => props.theme.black};
  padding: 8px 0;
`;

const TopImage = styled.img`
  width: 100%;
  vertical-align: bottom;
  position: relative;
`;

const FlagImage = styled.img`
  width: 40px;
  position: absolute;
  top: 8px;
  left: 8px;
`;

const FreeImage = styled.img`
  width: 100px;
  position: absolute;
  top: 8px;
  right: 8px;
`;

const Title = styled.h1`
  position: relative;
  font-size: 2em;
  margin: 0;
  padding: 16px;
  text-align: center;
  background-color: ${props => props.theme.lightgrey};
  box-sizing: border-box;
`;

const Description = styled.div`
  font-size: 0.5em;
  margin: 0;
  padding: 8px;
  text-align: center;
  font-weight: normal;
  box-sizing: border-box;
`;

const BottomTag = styled.a`
  display: block;
  position: fixed;
  bottom: 8px;
  right: 8px;
  font-size: 0.5em;
  color: ${props => props.theme.grey};
`

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

    const ongoingGameSelections = (
      <div>
        <IconButton href={`#/score`}>
          <Icon
            icon={list}
            style={{marginRight: '8px', color: theme.grey}}
            size={32}
          />
          Scores
        </IconButton>
        <IconButton href={`#/players`}>
          <Icon
            icon={users}
            style={{marginRight: '8px', color: theme.grey}}
            size={32}
          />
          Players
        </IconButton>
        <IconButton href={`#/play/${gameStore.firstUnfinishedTee}`}>
          <Icon
            icon={arrowRight}
            style={{marginRight: '8px', color: theme.grey}}
            size={32}
          />
          Go to tee {gameStore.firstUnfinishedTee + 1}
        </IconButton>
      </div>
    );

    const selections = gameStore.players.length > 0 ? ongoingGameSelections : null;

    return (
      <div>
        <TopImage src={discImage} />
        <FlagImage src={flagImage} />
        <Title>
          Pirkko
          <FreeImage src={freeImage} />
          <Description>
            The disc golf scoreboard
          </Description>
        </Title>
        <Content>
          {selections}
          <IconButton onClick={this.requestNewRound}>
            <Icon
              icon={plus}
              style={{marginRight: '8px', color: theme.grey}}
              size={32}
            />
            New game
          </IconButton>
        </Content>
        <BottomTag href="https://luftare.com">by: Luftare</BottomTag>
      </div>
    );
  }
}

export default Home;
