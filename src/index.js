import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './components/Game';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';
import gameStore from './stores/GameStore';

const Root = (
  <Provider gameStore={gameStore}>
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
