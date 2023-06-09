import { ReactElement, useState } from "react";
import type { ResultPageWithLayout } from "./_app";
import Layout from "~/components/layout";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { SearchData, SearchResult } from "~/types";
import SubmitButton from "~/components/submitButton";

interface EpcDataProps {
  data: SearchData;
}

export const getServerSideProps: GetServerSideProps<EpcDataProps> = async (
  context
) => {
  const postcode = context.query.postcode ?? "";
  let url: string;
  if (!postcode || typeof postcode === "object") {
    url = `https://epc.opendatacommunities.org/api/v1/domestic/search?size=1000`;
  } else {
    url = `https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=${postcode}&size=1000`;
  }

  const headers = new Headers({
    Accept: "application/json",
    Authorization: `Basic ${process.env.EPC_AUTH_TOKEN ?? ""}`,
  });

  const request = await fetch(url, { headers: headers });
  // Explicitly assert typing of the response
  const data = (await request.json()) as SearchData;

  return {
    props: { data: data },
  };
};

interface ToggleAddressButtonProps {
  rowKey: string;
  setButtonDisabled: (value: boolean) => void;
  setAddress: (value: string) => void;
  setCurrentlyToggled: (value: string) => void;
  toggleClassName: string;
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
  setCurrentlyToggled,
  toggleClassName,
  address,
}: ToggleAddressButtonProps) => {
  const handleOnClick = () => {
    setCurrentlyToggled(rowKey);
    setAddress(address);
    setButtonDisabled(false);
  };

  return (
    <li key={rowKey}>
      <a onClick={handleOnClick} className={toggleClassName}>
        {address}
      </a>
    </li>
  );
};

const Results: ResultPageWithLayout = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [address, setAddress] = useState("");
  // Keep track of which lmk-key is currently toggled. Initially, none
  // are toggled
  const [currentlyToggled, setCurrentlyToggled] = useState("");

  const router = useRouter();

  const list_items: ReactElement[] = data.rows.map((row: SearchResult) => {
    return (
      <ToggleAddressButton
        key={row["lmk-key"]}
        rowKey={row["lmk-key"]}
        setButtonDisabled={setButtonDisabled}
        setAddress={setAddress}
        setCurrentlyToggled={setCurrentlyToggled}
        address={row.address}
        toggleClassName={
          currentlyToggled === row["lmk-key"]
            ? toggledButtonClass
            : defaultToggleClass
        }
      />
    );
  });

  const redirectToEpc = () => {
    const res = data.rows.find(
      (row: SearchResult) => row["lmk-key"] === currentlyToggled
    );

    router
      .push({
        pathname: "/epc",
        query: {
          address: address,
          res: encodeURIComponent(JSON.stringify(res)),
        },
      })
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
