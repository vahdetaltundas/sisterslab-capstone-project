import ErrorMessage from '@/components/errormessage';
import { fetchCategories } from '@/store/categoriesSlice';
import { fetchProduct } from '@/store/productsSlice';
import { verifyJwtToken } from '@/util/verifyJwtToken';
import { updateProductFormInitialValue, updateProductValidationSchema } from '@/validations/updateProductValidation';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UpdateProduct = () => {
    const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const {product}=useSelector((state)=>state.products)
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProduct(id));
  }, [dispatch]);
  const router = useRouter();
  const {id}=router.query;
  const formik = useFormik({
    initialValues: updateProductFormInitialValue,
    validationSchema: updateProductValidationSchema,
    onSubmit: async (values) => {
      
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,values);
        router.push("/admin/profile/products");
        toast.success("Ürün başarıyla Güncellendi!");
      } catch (error) {
        console.error("Product güncellenirken bir hata oluştu", error);
        toast.error("Product güncellenirken hata oluştu");
      }
    },
  });
  return (
    <div className="flex justify-center">
      <form
        className="space-y-4  w-4/5 xl:w-1/2 "
        onSubmit={formik.handleSubmit}
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Product Name
          </label>
          <input
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder={product.name}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name ? (
            <ErrorMessage errorMessage={formik.errors.name} />
          ) : null}
        </div>
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Product Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder={product.price}
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.touched.price && formik.errors.price ? (
            <ErrorMessage errorMessage={formik.errors.price} />
          ) : null}
        </div>
        <div>
          <label
            htmlFor="currency"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Product Currency
          </label>
          <select
        id="currency"
        name="currency"
        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
        {...formik.getFieldProps('currency')}
      >
        <option value="">Lütfen Currency seçin</option>
        <option value="TL">TL</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
        </div>
        <div>
          <label
            htmlFor="categoryName"
            className="block font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="categoryName"
            name="categoryName"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            value={formik.values.categoryName}
            onChange={formik.handleChange}
          >
            <option value="">Lütfen Category seçin</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="img"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Product İmage
          </label>
          <input
            name="img"
            id="img"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder={product.img}
            value={formik.values.img}
            onChange={formik.handleChange}
          />
          {formik.touched.img && formik.errors.img ? (
            <ErrorMessage errorMessage={formik.errors.img} />
          ) : null}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-lg font-medium text-gray-900"
          >
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={product.description}
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <ErrorMessage errorMessage={formik.errors.description} />
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg border-2 text-white focus:ring-2 focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center mb-10  bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}
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
export default UpdateProduct