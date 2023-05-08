import { AppProps, type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { EpcDataProps } from "~/types";

type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// We have an explicity type for the search page so we can add specific
// typing to the props
type ResultPageWithLayout<P = EpcDataProps, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ClerkProvider {...pageProps}>
      {getLayout(<Component {...pageProps} />)}
    </ClerkProvider>
  );
};

export type { NextPageWithLayout, ResultPageWithLayout };
export default api.withTRPC(MyApp);
