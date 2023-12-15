/* eslint-disable react-hooks/rules-of-hooks */
import ErrorMessage from "@/components/errormessage";
import { fetchCategory } from "@/store/categoriesSlice";
import { verifyJwtToken } from "@/util/verifyJwtToken";
import {
  updateCategoryFormInitialValue,
  updateCategoryValidationSchema,
} from "@/validations/updateCategoryValidation";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch]);
  const formik = useFormik({
    initialValues: updateCategoryFormInitialValue,
    validationSchema: updateCategoryValidationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
          name: values.name,
          img: values.img,
        });
        router.push("/admin/profile/categories");
        toast.success("Ürün başarıyla güncellendi!");
      } catch (error) {
        console.error("Category güncellenerken bir hata oluştu", error);
        toast.error("Category güncellenerken hata oluştu");
      }
    },
  });
  return (
    <div className="flex justify-center">
      <form className="space-y-4 w-4/5 xl:w-1/2" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Category Name
          </label>
          <input
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder={category.name}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <ErrorMessage errorMessage={formik.errors.name} />
          ) : null}
        </div>

        <div>
          <label
            htmlFor="img"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Category İmage
          </label>
          <input
            name="img"
            id="img"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder={category.img}
            value={formik.values.img}
            onChange={formik.handleChange}
          />
          {formik.touched.img && formik.errors.img ? (
            <ErrorMessage errorMessage={formik.errors.img} />
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg border-2 text-white focus:ring-2 focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center mb-10  bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const { req, params } = context;

  const tokenCookie = req.headers.cookie
    ? req.headers.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("token="))
    : null;
  const token = tokenCookie ? tokenCookie.split("=")[1] : null;
  const hasVerifiedToken = token && (await verifyJwtToken(token));

  if (!hasVerifiedToken) {
    return {
      redirect: {
        destination: `/admin?`,
        permanent: false,
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
export default UpdateCategory;
