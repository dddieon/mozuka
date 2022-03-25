import type {AppProps} from 'next/app';
import Head from 'next/head';
import {QueryClient, QueryClientProvider} from 'react-query';
import GlobalStyle from '../styles/GlobalStyle';
import axios from "axios";
import {useEffect} from "react";

const queryClient = new QueryClient();

axios.defaults.baseURL = 'https://mozuka-back.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>모주카 : 랜프티콘 생성기</title>
        <script defer src={"https://developers.kakao.com/sdk/js/kakao.min.js"}></script>
      </Head>
      <GlobalStyle/>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
