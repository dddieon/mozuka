import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';

const navStyle = css`
  display: flex;
  justify-content: space-between;

  > button {
    width: 36px;
    height: 36px;
    background: #ddd;
  }
`;

const Header: FunctionComponent = () => {
  return (
    <header>
      <nav css={navStyle}>
        <button>버튼</button>
      </nav>
    </header>
  );
};

export default Header;
