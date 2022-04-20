import type {AppProps} from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import {QueryClient, QueryClientProvider} from 'react-query';
import GlobalStyle from '../styles/GlobalStyle';
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {css} from '@emotion/react';

const queryClient = new QueryClient();

axios.defaults.baseURL = process.env.NEXT_PUBLIC_DOMAIN; // reverse proxy
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.NEXT_PUBLIC_BACK_URI || 'https://mozuka-back.herokuapp.com';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.withCredentials = true;

declare global {
  interface Window {
    Kakao: any;
  }
}

const pageLoadingStyle = css`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 111111;
`

function MyApp({Component, pageProps}: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      if (interval) clearInterval(interval);
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
      }
    }, 100); // next/script를 사용하면서도 kakao init을 하는 더 좋은 방법이 없을까?
  }, []);
  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>모주카 : 랜프티콘 생성기</title>
        <meta name={"description"}
              content={"랜덤 선물 추첨기를 통해 카카오톡으로 친구에게 선물을 보내보아요"}/>
        <meta property="og:title" content="모주카 : 랜프티콘 생성기"/>
        <meta property="og:description"
              content={"랜덤 선물 추첨기를 통해 카카오톡으로 친구에게 선물을 보내보아요"}/>
        <meta property="og:image"
              content={process.env.NEXT_PUBLIC_DOMAIN + "/images/main_img.svg"}/>
      </Head>
      <Script defer src={"https://developers.kakao.com/sdk/js/kakao.min.js"}/>
      <GlobalStyle/>
      <>
        {isLoading && <div css={pageLoadingStyle}/>}
        <Component {...pageProps} />
      </>
    </QueryClientProvider>
  );
}

export default MyApp;
