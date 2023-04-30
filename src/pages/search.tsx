import type { NextPageWithLayout } from "./_app";
import type { ReactElement } from "react";
import Layout from "~/components/layout";

const Search: NextPageWithLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center pt-40">
      <div> Enter your postcode to get started</div>
      <form>
        <input className="" type="text" placeholder="Enter your postcode" />
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
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
