import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import Layout from "~/components/layout";

const Search: NextPageWithLayout = () => {
  return (
    <>
      <h1> Search page</h1>
    </>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Search;
