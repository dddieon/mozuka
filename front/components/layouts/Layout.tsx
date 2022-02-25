import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import Header from './Header';

const layoutStyle = css`
  max-width: 860px;
  margin: 0 auto;
`;

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div css={layoutStyle}>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
