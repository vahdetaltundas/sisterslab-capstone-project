import Link from "next/link";
import { useFormik } from "formik";
import {
  loginInitialValues,
  loginValidationSchema,
} from "../../../validations/loginValidation.js";
import ErrorMessage from "../../../components/errormessage/index.js";
// import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession, signIn, getSession } from "next-auth/react";
import { useEffect } from "react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      let options = { redirect: false, email, password };
     
        const res = await signIn("credentials", options);
        if(res.ok){
          toast.success("Giriş Başarılı");
        }else{
          toast.error("email yada şifre hatalı");
        }
      
    },
  });

  useEffect(() => {
    if (session) {
      router.push("/profile");
    }
  }, [session,router]);

  return (
    <div className="columns-1 sm:columns-2 ">
      <img
        src="https://i.imgur.com/Bduouzl.png"
        alt="Picture"
        className="hidden sm:block w-full h-[100vh]"
      />
      <div className="flex flex-col items-center sm:p-5 lg:p-10">
        <Link href="/">
          <img
            src="https://i.imgur.com/vTCA3oj.png"
            className="w-40"
            alt="logo"
          />
        </Link>
      </div>
      <div className="flex flex-col sm:px-[4rem] lg:px-[8rem]">
        <h1 className="text-[#6b6b87] text-xl">Welcome back!</h1>
        <h2 className="text-3xl mb-[2rem]">Login to your account</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              E-mail
            </label>
            <input
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john@mail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorMessage errorMessage={formik.errors.email} />
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-lg font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage errorMessage={formik.errors.password} />
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#616161] border-2 text-white focus:ring-2 focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center mb-10 "
          >
            Login
          </button>
        </form>
        <Link
          href="/auth/register"
          type="submit"
          className="w-full rounded-lg bg-white text-[#000000] border-2 border-[#616161] focus:ring-2 focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center mt-5"
        >
          Register
        </Link>
        <button
          type="button"
          className="px-5 py-2.5 mt-5  flex justify-center items-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          onClick={() => signIn("github")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="currentColor"
            className="mr-2"
            viewBox="0 0 1792 1792"
          >
            <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z" />
          </svg>
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default Login;
