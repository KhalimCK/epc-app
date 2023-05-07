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

interface ToggleAddressButtonProps {
  rowKey: string;
  setButtonDisabled: (value: boolean) => void;
  setAddress: (value: string) => void;
  buttonClassCache: { key: string }[];
  currentlyToggledState: [string, (value: string) => void];
  address: string;
}

const defaultToggleClass =
  "mb-1 block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";

const toggledButtonClass =
  "text-white mb-1 block max-w-sm rounded-lg border border-gray-200 bg-purple-500 p-6 shadow hover:bg-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700";

const ToggleAddressButton = ({
  rowKey,
  setButtonDisabled,
  setAddress,
  buttonClassCache,
  currentlyToggledState,
  address,
}: ToggleAddressButtonProps) => {
  const buttonClass = buttonClassCache[rowKey];
  const [toggleClass, setToggleClass] = useState(buttonClass);
  const [currentlyToggled, setCurrentlyToggled] = currentlyToggledState;

  const handleOnClick = () => {
    console.log(buttonClassCache);
    setButtonDisabled(false);
    // The lmk-key that is currently toggled will be stored in currentlyToggled
    // We use that to update the untoggle the other buttons
    // Initially, currentlyToggled is empty
    if (currentlyToggled) {
      // switch the previously toggled button to un-toggled
      buttonClassCache[currentlyToggled] = defaultToggleClass;
    }

    // Now set the new  button to be toggled
    buttonClassCache[rowKey] = toggledButtonClass;

    // Keep track of which component is currently toggled
    setCurrentlyToggled(rowKey);
    setToggleClass(toggledButtonClass);
    setAddress("address");
  };

  return (
    <li key={rowKey}>
      <a onClick={handleOnClick} className={toggleClass}>
        {address}
      </a>
    </li>
  );
};

const Results: NextPageWithLayout = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [address, setAddress] = useState("");
  // Keep track of which lmk-key is currently toggled. Initially, none
  // are toggled
  const currentlyToggledState = useState("");

  let startingButtonCache = {};
  data.rows.map((row: SearchResult) => {
    const key = row["lmk-key"];
    startingButtonCache[key] = defaultToggleClass;
  });

  const [buttonClassCache, setButtonClassCache] = useState(startingButtonCache);

  const router = useRouter();

  const list_items = data.rows.map((row: SearchResult) => {
    return (
      <ToggleAddressButton
        rowKey={row["lmk-key"]}
        setButtonDisabled={setButtonDisabled}
        buttonClassCache={buttonClassCache}
        setAddress={setAddress}
        currentlyToggledState={currentlyToggledState}
        address={row.address}
      />
    );
  });

  const redirectToEpc = () => {
    router
      .push({ pathname: "/epc", query: { address: address } })
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
