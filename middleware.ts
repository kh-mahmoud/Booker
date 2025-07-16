import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiRoutesPrefix, authRoutes, publicRoutes } from "./routes";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedin = !!req.auth;
  const isApiRoute = pathname.startsWith(apiRoutesPrefix);
  const isPublicRoute = publicRoutes.some((route) =>pathname.includes(route));
  const isAuthRoute =  authRoutes.some((route) =>pathname.includes(route));;


  if (isApiRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedin) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return null;
  }

  if (!isLoggedin && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
