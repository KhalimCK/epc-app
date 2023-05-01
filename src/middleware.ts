import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);

  if (isPublic(request.nextUrl.pathname) && !userId) {
    return NextResponse.next();
  }

  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts
    const signInUrl = new URL("/", request.url);
    // The piece of code below inserts the source url into the redirect
    // url however not needed for the momeny
    // signInUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If the user is signed in and the current url is /, redirect them to
  // search
  if (userId && request.nextUrl.pathname === "/") {
    const searchUrl = new URL("/search", request.url);
    return NextResponse.redirect(searchUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
};
