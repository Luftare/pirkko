import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import ScoreInput from './ScoreInput';
import ScoreBoard from './ScoreBoard';
import Home from './Home';

@inject('routerStore')
@observer
class App extends Component {
  render() {
    const { routerStore } = this.props;
    let view = null;
    switch (routerStore.view) {
      case '#play':
        view = <ScoreInput />;
        break;
      case '#score':
        view = <ScoreBoard />;
        break;
      default:
        view = <Home />;
    }
    return (
      <div>
        {view}
      </div>
    );
  }
}

export default App;
