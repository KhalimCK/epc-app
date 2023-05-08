import { GetServerSideProps, GetStaticProps } from "next";
import { NextPageWithLayout, ResultPageWithLayout } from "./_app";
import { EpcDataProps } from "~/types";
import { useSearchParams } from "next/navigation";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = context.query.res ?? "";

//   let url: string;
//   if (!res || typeof res !== "string") {
//     // redirect the user back to search -- to be handled better
//     return {
//       props: { data: null },
//     };
//   }

//   const data = JSON.parse(decodeURIComponent(res));

//   return {
//     props: { data: data },
//   };
// };

const Epc = () => {
  const params = useSearchParams();
  //   const data = JSON.parse(decodeURIComponent(params.get("res") ?? ""));
  //   console.log(data);
  //   console.log(typeof data);
  console.log("TWO TIMES?");

  //   console.log(data);
  return (
    <>
      <h1>Result</h1>
    </>
  );
};

export default Epc;
