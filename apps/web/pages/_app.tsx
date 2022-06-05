import 'ui/theme/register';
import React, { Fragment } from 'react';

import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).LayoutComponent || Fragment;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
