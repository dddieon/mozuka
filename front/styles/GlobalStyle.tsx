import { Global, css } from '@emotion/react';
import variables from './variables';
import reset from './resets';
import fonts from './fonts';

const GlobalStyle = () => (
  <Global
    styles={css`
      ${variables}
      ${fonts}
      ${reset}
    `}
  />
);
export default GlobalStyle;
