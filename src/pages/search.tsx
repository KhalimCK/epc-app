import { NextPage } from "next";
import ProfileBar from "~/components/profilebar";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
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
