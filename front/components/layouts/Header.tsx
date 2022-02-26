import React, { FunctionComponent } from 'react';
import { css } from '@emotion/react';
import {useRouter} from "next/router";

const navStyle = css`
  display: flex;
  justify-content: space-between;

  > button {
    margin: 1.2rem 1.6rem 1.2rem;
    width: 3.6rem;
    height: 3.6rem;
    background-size: 1.2rem 2rem;
    background-position: left center;
    background-repeat: no-repeat;
    background-image: url('/images/arrow.svg');
  }
`;

const Header: FunctionComponent = () => {
  const router = useRouter();
  return (
    <header>
      <nav css={navStyle}>
        <button onClick={() => router.back()}/>
      </nav>
    </header>
  );
};

export default Header;
