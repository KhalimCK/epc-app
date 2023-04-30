import ProfileBar from "./profilebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  //   const { isSignedIn } = useUser();

  //   // If the user isn't signed in, we don't display the profile bar, therefore is is not included
  //   // in the layout.

  //   if (!isSignedIn) {
  //     return <>{children}</>;
  //   }

  return (
    <>
      <ProfileBar />
      <div>{children}</div>
    </>
  );
}

export function SignedOutLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
