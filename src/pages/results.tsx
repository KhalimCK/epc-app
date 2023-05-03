import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "~/components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { GetStaticProps } from "next";
import { SearchResults } from "~/types";

export const getStaticProps: GetStaticProps = async () => {
  const url = "https://epc.opendatacommunities.org/api/v1/domestic/search";

  const headers = new Headers({
    Accept: "application/json",
    Authorization: "Basic " + process.env.EPC_AUTH_TOKEN,
    "Content-Type": "application/json",
  });

  console.log(headers);

  const request = await fetch(url, { headers: headers });
  const data = await request.json();

  return {
    props: { data: data },
  };
};

const Results: NextPageWithLayout = (data: SearchResults) => {
  const router = useRouter();

  const postcode = router.query.postcode;

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
