import React from 'react';
import { Route } from 'mobx-router';
import ScoreBoard from './components/ScoreBoard';
import ScoreInput from './components/ScoreInput';

const views = {
  scoreBoard: new Route({
    path: '/',
    component: <ScoreBoard />
  }),
  scoreInput: new Route({
    path: '/modify/:tee',
    component: <ScoreInput />,
    beforeEnter: () => {
      console.log('before enter...');
    },
    onEnter: () => {
      console.log('entering user profile!');
    },
    beforeExit: () => {
      console.log('exiting user profile!');
    },
    onParamsChange: (route, params, store) => {
      console.log('params changed to', params);
    }
  })
};
export default views;
