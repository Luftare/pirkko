import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import discImage from '../assets/disc.jpg';
import flagImage from '../assets/flag.png';
import freeImage from '../assets/free.png';
import { Icon } from 'react-icons-kit';
import { arrowRight, plus, list, users, compass } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  grid-gap: 8px;
  padding: 16px 16px;
  box-sizing: border-box;
  margin-bottom: 60px;
`;

const IconButton = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  text-decoration: none;
  color: ${props => props.color || props.theme.black};
  padding: 16px 8px;
  cursor: pointer;
  background: ${props => props.background || props.theme.lightgrey};
  border-radius: 4px;
  :active {
    transform: scale(0.95, 0.95);
  }
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${media.tablet`
    grid-template-columns: 200px auto;
  `}
  ${media.desktop`
    grid-template-columns: 400px auto;
  `}
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 2em;
  margin: 0;
  padding: 16px;
  text-align: center;
  background-color: ${props => props.theme.lightgrey};
  box-sizing: border-box;
  ${media.tablet`
    font-size: 2.2em;
  `}
  ${media.desktop`
    font-size: 3em;
  `}
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

    const newGameSelection = (
      <IconButton onClick={this.requestNewRound}>
        <Icon
          icon={plus}
          style={{marginRight: '8px', color: theme.primary}}
          size={24}
        />
        New game
      </IconButton>
    );

    const ongoingGameSelections = (
      <Grid>
        <IconButton href={`#/score`}>
          <Icon
            icon={list}
            style={{marginRight: '8px', color: theme.primary}}
            size={24}
          />
          Scores
        </IconButton>
        <IconButton href={`#/players`}>
          <Icon
            icon={users}
            style={{marginRight: '8px', color: theme.primary}}
            size={24}
          />
          Players ({gameStore.players.length})
        </IconButton>
        <IconButton href={`#/course-select`}>
          <Icon
            icon={compass}
            style={{marginRight: '8px', color: theme.primary}}
            size={24}
          />
          Tees ({gameStore.pars.length})
        </IconButton>
        <IconButton href={`#/play/${gameStore.firstUnfinishedTee}`}>
          <Icon
            icon={arrowRight}
            style={{marginRight: '8px', color: theme.primary}}
            size={24}
          />
          Tee {gameStore.firstUnfinishedTee + 1}
        </IconButton>
        {newGameSelection}
      </Grid>
    );

    const selections = gameStore.players.length > 0 ? ongoingGameSelections : <Grid>{newGameSelection}</Grid>;

    return (
      <div>
        <TopContainer>
          <TopImage src={discImage} />
          <FlagImage src={flagImage} />
          <Title>
            Pirkko
            <FreeImage src={freeImage} />
            <Description>
              The disc golf scoreboard
            </Description>
          </Title>
        </TopContainer>
        {selections}
        <BottomTag href="https://luftare.com">by: Luftare</BottomTag>
      </div>
    );
  }
}

export default Home;
