import React, {FunctionComponent, useEffect} from 'react';
import {css} from '@emotion/react';
import Header from './Header';

const layoutStyle = css`
  max-width: 860px;
  margin: 0 auto;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 3rem 3rem;
    min-height: calc(100vh - 6.4rem);
  }
`;

declare global {
  interface Window {
    Kakao: any;
  }
}

const Layout: FunctionComponent = ({children}) => {
  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
  }, []);
  return (
    <div css={layoutStyle}>
      <Header/>
      <>{children}</>
    </div>
  );
};

export default Layout;
