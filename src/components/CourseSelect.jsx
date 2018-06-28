import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { Icon } from 'react-icons-kit';
import { flag, plus } from 'react-icons-kit/feather/';
import { media, theme } from '../styles';

const Container = styled.div`
  padding: 16px 16px;
  box-sizing: border-box;
`;

@inject("routerStore")
@inject("gameStore")
@observer
class CourseSelect extends Component {

  render() {
    const { gameStore, routerStore } = this.props;
    const { goTo } = this.props.routerStore;

    return (
      <Container>
        How many tees?
      </Container>
    );
  }
}

export default CourseSelect;
