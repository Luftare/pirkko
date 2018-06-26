import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { media } from '../styles';

@inject("routerStore")
@observer
class Home extends Component {

  render() {
    const { goTo } = this.props.routerStore;

    return (
      <div>
        <a href='#/score'>To score</a>
        <button onClick={() => goTo('/play/0')}>To game</button>
      </div>
    );
  }
}

export default Home;
