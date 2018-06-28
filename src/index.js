import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles';
import gameStore from './stores/GameStore';
import RouterStore from './stores/RouterStore';

import ScoreInput from './components/ScoreInput';
import ScoreBoard from './components/ScoreBoard';
import CourseSelect from './components/CourseSelect';
import PlayerSelect from './components/PlayerSelect';
import Home from './components/Home';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/play/:tee',
    component: ScoreInput
  },
  {
    path: '/player-select',
    component: PlayerSelect
  },
  {
    path: '/course-select',
    component: CourseSelect
    // auth(params, goTo) {
    //   return true;
    // }
  },
  {
    path: '/score',
    component: ScoreBoard
    // auth(params, goTo) {
    //   goTo('/');
    //   return false;
    // }
  }
];

const Root = (
  <Provider gameStore={gameStore} routerStore={new RouterStore(routes)}>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();
