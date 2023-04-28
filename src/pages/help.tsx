import ProfileBar from "~/components/profilebar";
import { NextPageWithLayout } from "./_app";
import Layout from "~/components/layout";
import { ReactElement } from "react";

const Help: NextPageWithLayout = () => {
  return (
    <>
      <h1>Help</h1>
    </>
  );
};

Help.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Help;
