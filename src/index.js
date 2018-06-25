import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';
import gameStore from './stores/GameStore';
import routerStore from './stores/RouterStore';

const Root = (
  <Provider gameStore={gameStore} routerStore={routerStore}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
