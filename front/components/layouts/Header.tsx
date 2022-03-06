import React, {FunctionComponent, useEffect} from 'react';
import {css} from '@emotion/react';
import {useRouter} from "next/router";
import {P} from "../commons";
import {useHeader} from "../../store";

const navStyle = css`
  display: flex;
  align-items: center;

  > button {
    margin: 1.2rem 1rem 1.6rem 1.2rem;
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
  const header = useHeader(state => state.header);
  const headerBackEvent = useHeader(state => state.headerBackEvent);
  const setHeaderBackEvent = useHeader(state => state.setHeaderBackEvent);

  useEffect(() => {
    setHeaderBackEvent(() => router.back())
  }, []);

  return (
    <header>
      <nav css={navStyle}>
        <button onClick={headerBackEvent}/>
        <P weight={"bold"}>{header}</P>
      </nav>
    </header>
  );
};

export default Header;
