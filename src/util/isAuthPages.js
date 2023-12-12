const AUTH_PAGES=["/admin"];

export const isAuthPages=(url)=>{
    return AUTH_PAGES.some((page)=>page.startsWith(url));
}