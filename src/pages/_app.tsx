import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../../lib/theme';

import { ComicContextProvider } from '../contexts/ContextComics';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ComicContextProvider>
        <Head>
          <title>Get Marvel Heros</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          ></meta>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ComicContextProvider>
    </>
  );
}

export default MyApp;
