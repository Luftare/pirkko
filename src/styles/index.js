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
  primary: '#2e9',
  secondary: '#8bf',
  white: '#fff',
  black: '#222',
  grey: '#777',
  green: '#5f8',
  yellow: '#dd0',
  orange: '#f70',
  red: '#f55',
  lightgrey: '#ddd',
  purple: '#909',
  blue: '#09F',
  scoreToColor: (score, par) => {
    if (!score) return theme.lightgrey;
    const result = score - par;
    switch (result) {
      case -3:
        return theme.purple;
      case -2:
        return theme.purple;
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
