import { useFormik } from "formik";
import { useRouter } from "next/router";
import axios from "axios";
import {
  addCategoryFormInitialValue,
  addCategoryValidationSchema,
} from "@/validations/addCategoryValidation";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/errormessage";



const AddCategory = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: addCategoryFormInitialValue,
    validationSchema: addCategoryValidationSchema,
    onSubmit: async (values) => {
      
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`,{name:values.name,img:values.img});
        router.push("/admin/profile/categories");
        toast.success("Ürün başarıyla eklendi!");
      } catch (error) {
        console.error("Category eklenirken bir hata oluştu", error);
        toast.error("Category eklenirken hata oluştu");
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
              value={formik.values.img}
              onChange={formik.handleChange}
            />
            {formik.touched.img && formik.errors.img ? (
              <ErrorMessage errorMessage={formik.errors.img} />
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-400 rounded-lg hover:bg-orange-500  focus:ring-orange-300 border-2 text-white focus:ring-2 focus:outline-none  font-medium  text-sm px-5 py-2.5 text-center mb-10 "
          >
            Add Category
          </button>
        </form>
    </div>
  );
};

export default AddCategory;