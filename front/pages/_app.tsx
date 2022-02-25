import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import GlobalStyle from '../styles/GlobalStyle';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
