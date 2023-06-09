import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
import { ReactElement, useState } from "react";
import Layout from "~/components/layout";
import SubmitButton from "~/components/submitButton";

const Search: NextPageWithLayout = () => {
  const [postcode, setPostcode] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const router = useRouter();

  // Do something better than logging the error
  // Should probablt redirect to a something went wrong page
  const redirectToSearch = () => {
    router
      .push({ pathname: "/results", query: { postcode: postcode } })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      redirectToSearch();
    }
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If the text is empty, disable the button, otherwise enable it
    setPostcode(e.target.value);
    if (e.target.value) {
      setButtonDisabled(false);
      return;
    }
    setButtonDisabled(true);
    return;
  };

  const submitProps = {
    buttonDisabled: buttonDisabled,
    redirectFunc: redirectToSearch,
  };

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
        <SubmitButton {...submitProps} />
      </form>
    </div>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Search;
