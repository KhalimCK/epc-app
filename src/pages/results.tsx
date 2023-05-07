import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Layout from "~/components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { SearchData, SearchResult } from "~/types";
import SubmitButton from "~/components/submitButton";

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
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const router = useRouter();

  const list_items = data.rows.map((row: SearchResult) => {
    console.log(row);
    return (
      <li key={row["lmk-key"]}>
        <a className="mb-1 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          {row.address}
        </a>
      </li>
    );
  });

  const redirectToEpc = () => {
    router
      .push({ pathname: "/epc", query: {} })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="flex max-h-[40rem] flex-col items-center pt-10">
        <h1 className="mb-5">Select your address</h1>
        <ul className=" overflow-y-auto ">{list_items}</ul>
        <SubmitButton
          buttonDisabled={buttonDisabled}
          redirectFunc={redirectToEpc}
        />
      </div>
    </>
  );
};

Results.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Results;
