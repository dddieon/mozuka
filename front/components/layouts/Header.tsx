import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';

const navStyle = css`
  display: flex;
  justify-content: space-between;

  > button {
    margin: 3.2rem 1.6rem 0;
    width: 3.6rem;
    height: 3.6rem;
    background-size: 1.2rem 2rem;
    background-position: left center;
    background-repeat: no-repeat;
    background-image: url('./images/arrow.svg');
  }
`;

const Header: FunctionComponent = () => {
  return (
    <header>
      <nav css={navStyle}>
        <button />
      </nav>
    </header>
  );
};

export default Header;
