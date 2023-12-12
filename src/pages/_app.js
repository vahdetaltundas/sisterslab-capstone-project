import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "../components/adminLayout/AdminLayout"


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const currentPagePath = router.pathname;
  if (currentPagePath.startsWith('/admin/profile')) {
    return (
      <AdminLayout >
        <Component {...pageProps} />
      </AdminLayout>
    );
  }
  return (
    <>
    
      <SessionProvider session={session}>
        <ToastContainer />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
