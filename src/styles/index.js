import { css } from 'styled-components';

export const sizes = {
  desktop: 1090,
  tablet: 600
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const theme = {
  primary: '#444',
  secondary: '#8bf',
  white: '#fff',
  black: '#222',
  grey: '#777',
  green: '#4f4',
  yellow: '#FF5',
  orange: '#fa3',
  red: '#f44',
  lightgrey: '#eee',
  purple: '#f6e',
  blue: '#9cF',
  scoreToColor: (score, par) => {
    if (!score) return theme.lightgrey;
    const result = score - par;
    if (result <= -2) return theme.purple;
    switch (result) {
      case -1:
        return theme.blue;
      case 0:
        return theme.green;
      case 1:
        return theme.yellow;
      case 2:
        return theme.orange;
      default:
        return theme.red;
    }
  },
  gutter: {
    m: '32px',
    l: '80px',
    xl: '240px'
  }
};
