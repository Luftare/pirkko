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
  gutter: {
    m: '32px',
    l: '80px',
    xl: '240px'
  }
};
