import { SignOutButton } from "@clerk/nextjs";
import { NextPage } from "next";
import ProfileBar from "~/components/profilebar";

const Search: NextPage = () => {
  return (
    <>
      <ProfileBar />
      <h1> Search page</h1>
      <SignOutButton>Sign out</SignOutButton>
    </>
  );
};

export default Search;
