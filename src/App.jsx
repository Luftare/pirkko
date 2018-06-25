import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Game from './components/Game';

const styles = {
  night: {
    color: "#fff",
    backgroundColor: "#000"
  },
  day: {
    color: "#000",
    backgroundColor: "#fff"
  }
};

const Headline = styled.h1`
  ${({ theme }) => `
    color: ${styles[theme].color};
    background-color: ${styles[theme].backgroundColor};
  `};
`;

@observer
class App extends Component {
  render() {
    const { UiStore } = this.props;

    return (
      <Game />
    );
  }
}

export default App;
