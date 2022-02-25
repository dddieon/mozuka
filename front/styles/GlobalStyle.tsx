import { Global, css } from '@emotion/react';
import reset from './resets';
import fonts from './fonts';

const GlobalStyle = () => (
  <Global
    styles={css`
      ${fonts}
      ${reset}
    `}
  />
);
export default GlobalStyle;
