import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Icon } from 'react-icons-kit';
import { compass, plus, minus, home, thumbsUp, arrowRight } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const Content = styled.div`
  padding: 16px 16px;
  box-sizing: border-box;
  margin-bottom: 80px;
`;

const BottomContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${props => props.theme.primary};
`;

const DoubleContainer = styled.div`
  display: flex;
  padding: 16px;
  box-sizing: border-box;
  font-size: 2em;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.background || props.theme.lightgrey};
  color: ${props => props.color || props.theme.black};
`;

const Controls = styled.div`
  padding: 32px 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
`;

const Row = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: ${props => props.three ? '40px 40px 1fr' : '40px 40px 1fr 1fr'};
  grid-auto-flow: column;
`;

const Cell = styled.span`
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${props => props.background || props.theme.lightgrey};
  color: ${props => props.color || props.theme.black};
  font-size: 1.5em;
  cursor: ${props => props.pointer ? 'pointer' : 'default'};
`;

const Button = styled.button`
  border: none;
  box-shadow: 0px 0px 3px #111;
  color: ${props => props.theme.black};
  background-color: ${props => props.theme.white};
  height: ${props => props.small ? '25px' : '40px'};
  width: ${props => props.small ? '25px' : '40px'};
  border-radius: 4px;
  font-size: inherit;
  :active {
    transform: scale(0.95, 0.95);
  }

  ${media.tablet`
    width: 180px;
    height: ${props => props.small ? '30px' : '50px'};
    width: ${props => props.small ? '30px' : '50px'};
  `}
`;

const TeeCountDisplay = styled.span`
  font-size: 3em;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  width: 100px;
  text-align: center;
`

const Title = styled.div`
  font-size: 2em;
`;

@inject("routerStore")
@inject("gameStore")
@observer
class CourseSelect extends Component {

  incrementTeeCount = () => {
    const teeCount = this.props.gameStore.pars.length;
    const newTeeCount = Math.min(100, teeCount + 1);
    this.props.gameStore.updateTeeCount(newTeeCount);
  }

  decrementTeeCount = () => {
    const teeCount = this.props.gameStore.pars.length;
    const newTeeCount = Math.max(1, teeCount - 1);
    this.props.gameStore.updateTeeCount(newTeeCount);
  }

  render() {
    const { gameStore, routerStore } = this.props;
    const { goTo } = this.props.routerStore;

    return (
      <div>
        <DoubleContainer>
          How many tees?
          <Link href='#/'><Icon icon={home} size={24}/></Link>
        </DoubleContainer>
        <Content>
          <Controls>
            <Icon icon={minus} size={42} onClick={this.decrementTeeCount} style={{cursor: 'pointer'}} />
            <TeeCountDisplay>{gameStore.pars.length}</TeeCountDisplay>
            <Icon icon={plus} size={42} onClick={this.incrementTeeCount} style={{cursor: 'pointer'}} />
          </Controls>
          <Grid>
            <Row three>
              <Cell background={theme.primary} color={theme.white}><Icon icon={compass} size={18} /></Cell>
              <Cell background={theme.primary} color={theme.white}><Icon icon={thumbsUp} size={18} /></Cell>
              <Cell background={theme.primary} color={theme.white}>Pars</Cell>
            </Row>
            {gameStore.pars.map((par, i) => (
              <Row key={i}>
                <Cell>
                  {i + 1}
                </Cell>
                <Cell background={theme.scoreToColor(par, 3)}>
                  {par}
                </Cell>
                <Cell pointer onClick={() => gameStore.decrementPar(i)}><Icon icon={minus} size={24} /></Cell>
                <Cell pointer onClick={() => gameStore.incrementPar(i)}><Icon icon={plus} size={24} /></Cell>
              </Row>
            ))}
          </Grid>
        </Content>
        <BottomContainer>
          <Link href={`#/players`}>
            <DoubleContainer background={theme.primary} color={theme.white}>
              Players
              <Icon icon={arrowRight} size={32}/>
            </DoubleContainer>
          </Link>
        </BottomContainer>
      </div>
    );
  }
}

export default CourseSelect;
