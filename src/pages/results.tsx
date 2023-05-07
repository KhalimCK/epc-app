import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "~/components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { GetStaticProps } from "next";
import { SearchData } from "~/types";
import { InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const url = "https://epc.opendatacommunities.org/api/v1/domestic/search";

  const headers = new Headers({
    Accept: "application/json",
    Authorization: "Basic " + process.env.EPC_AUTH_TOKEN,
  });

  const request = await fetch(url, { headers: headers });
  const data: SearchData = await request.json();

  return {
    props: { data: data },
  };
};

const Results: NextPageWithLayout = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  console.log(data.rows);

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
