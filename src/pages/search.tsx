import { SignOutButton } from "@clerk/nextjs";
import { NextPage } from "next";

const Search: NextPage = () => {
  return (
    <>
      <h1> Search page</h1>
      <SignOutButton>Sign out</SignOutButton>
    </>
  );
};

export default Search;
