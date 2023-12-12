import { isAuthPages } from "./util/isAuthPages";
import { verifyJwtToken } from "./util/verifyJwtToken";
import { NextResponse } from "next/server";


export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  
  const isAuthPageRequested= isAuthPages(nextUrl.pathname);

  if(isAuthPageRequested){
    if(!hasVerifiedToken){
        const response=NextResponse.next();
        return response;
    }
    const response=NextResponse.redirect(new URL('/admin/profile',url));
  }

  if(!hasVerifiedToken){
    const searchParams=new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next",nextUrl.pathname);

    return NextResponse.redirect(new URL('/admin',url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/profile"],
};
