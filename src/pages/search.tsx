import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
import { ReactElement, useState } from "react";
import Layout from "~/components/layout";

const Search: NextPageWithLayout = () => {
  const [postcode, setPostcode] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  const redirectToSearch = () => {
    router.push("/results");
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);

    if (e.key === "Enter") {
      e.preventDefault();
      redirectToSearch();
    }
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the text is empty, disable the button, otherwise enable it
    if (e.target.value) {
      setButtonDisabled(false);
      return;
    }
    setButtonDisabled(true);
    return;
  };

  // TODO: Insert the postcode into the URL

  return (
    <div className="flex min-h-screen flex-col items-center pt-40">
      <form>
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="search"
        >
          Enter your postcode to get started
        </label>
        <input
          id="search"
          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
          type="text"
          placeholder="Enter your postcode"
          onChange={handlePostcodeChange}
          onKeyDown={handleSubmit}
        />
        <button
          type="button"
          disabled={buttonDisabled}
          onClick={redirectToSearch}
          className="focus:shadow-outline mt-3 rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none disabled:opacity-25 disabled:hover:bg-purple-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Search;
