/* eslint-disable react-hooks/rules-of-hooks */
import ErrorMessage from "@/components/errormessage";
import {
  adminLoginInitialValues,
  adminLoginValidationSchema,
} from "@/validations/adminLoginValidation";
import axios from "axios";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const index = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formik = useFormik({
    initialValues: adminLoginInitialValues,
    validationSchema: adminLoginValidationSchema,
    onSubmit: async (values) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        {
          username: values.username,
          password: values.password,
        }
      );
      const { success } = await response.data;
      if (success) {
        const nextUrl = searchParams.get("next");
        toast.success("Giriş Başarılı");
        router.push(nextUrl ?? "/");
        router.refresh();
      } else {
        toast.error("Username yada password hatalı");
      }
    },
  });
  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: 'url("./img/Banner.jpg")' }}
    >
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white mx-4 p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="username"
                placeholder="Enter your email address"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.touched.username && formik.errors.username ? (
                <ErrorMessage errorMessage={formik.errors.username} />
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block font-semibold text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password ? (
                <ErrorMessage errorMessage={formik.errors.password} />
              ) : null}
              {/* <a className="text-gray-600 hover:text-gray-800" href="#">
                Forgot your password?
              </a> */}
            </div>
            <div className="mb-6">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default index;
