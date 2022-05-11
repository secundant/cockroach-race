import 'ui/theme/register';
import { AppProps } from 'next/app';
import React, { Fragment } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).LayoutComponent || Fragment;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
