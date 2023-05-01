import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "~/components/layout";

const Results: NextPageWithLayout = () => {
  return (
    <>
      <h1>Results</h1>
    </>
  );
};

Results.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Results;
