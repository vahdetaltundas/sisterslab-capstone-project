/* eslint-disable react-hooks/rules-of-hooks */
import ErrorMessage from '@/components/errormessage';
import { registerInitialValues, registerValidationSchema } from '@/validations/registerValidation';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { toast } from 'react-toastify';

const Register = () => {
  const router=useRouter();
  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,
    onSubmit:async (values) => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
          email: values.email,
          username: values.username,
          password: values.password,
        });
        toast.success("Kayıt Başarılı.")
        router.push("/auth/login");
      } catch (error) {
        toast.error("Kayıt olunamadı!");
      }
    },
  });
  return (
    <div className="columns-1 sm:columns-2 ">
      <img src="https://i.imgur.com/Bduouzl.png" alt="Picture" className="hidden sm:block w-full h-[100vh]" />
      <div className="flex flex-col items-center sm:p-4 lg:p-8">
        <Link href="/">
          <img src="https://i.imgur.com/vTCA3oj.png" className="w-40" alt="logo" />
        </Link>
      </div>
      <div className="flex flex-col sm:px-[4rem] lg:px-[8rem]">
        <h1 className="text-[#6b6b87] text-xl">Welcome back!</h1>
        <h2 className="text-3xl mb-[2rem]">Register to your account</h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div>
            <label
              htmlFor="username"
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username ? (
              <ErrorMessage errorMessage={formik.errors.username} />
            ) : null}
          </div>
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
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMessage errorMessage={formik.errors.password} />
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-[#616161] border-2 text-white focus:ring-2 focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center mb-10 "
          >
            Register
          </button>
        </form>
        <Link
          href="/auth/login"
          type="submit"
          className="w-full bg-white text-[#000000] border-2 border-[#616161] focus:ring-2 focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center mt-5"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Register