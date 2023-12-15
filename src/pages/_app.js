import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "../components/adminLayout/AdminLayout";
import { store } from "./store/store";
import { Provider } from "react-redux";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const currentPagePath = router.pathname;
  if (currentPagePath.startsWith("/admin/profile")) {
    return (
      <Provider store={store}>
        <AdminLayout>
          <ToastContainer />
          <Component {...pageProps} />
        </AdminLayout>
      </Provider>
    );
  }
  
  return (
    <>
    <Provider store={store}>
      <SessionProvider session={session}>
        <ToastContainer />
        <Component {...pageProps} />
      </SessionProvider>
      </Provider>
    </>
  );
}
