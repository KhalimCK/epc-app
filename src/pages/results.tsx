import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "~/components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SearchData, SearchResult } from "~/types";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postcode = context.query.postcode;

  const url = `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postcode}&size=1000`;

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
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  //   console.log(data.rows);

  const list_items = data.rows.map((row: SearchResult) => {
    console.log(row);
    return <li key={row["lmk-key"]}>{row.address}</li>;
  });

  return (
    <>
      <h1>Results</h1>
      <ul>{list_items}</ul>
    </>
  );
};

Results.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Results;
