/* eslint-disable react-hooks/rules-of-hooks */
import VerticalCard from "@/components/adminLayout/ui/VerticalCard";
import { deleteItem } from "@/pages/api/hello";
import { fetchCategories } from "@/pages/store/categoriesSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const index = () => {
  const dispatch = useDispatch();
  const router=useRouter();
  const { categories, loadingCategories, defaultCategory } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  console.log(categories);
  const handleDelete = async (id) => {
    try {
      await deleteItem("categories", id);
      toast.success("Ürününüz silindi");
      dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
      toast.error("Category silinemedi!");
    }
  };
  return (
    <div className="grid grid-cols-6 gap-5">
      <a
        href="#"
        className="col-end-7 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300"
      >
        Add Category
      </a>
      <div className="col-span-6 grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {categories.map((category) => (
          <VerticalCard
            key={category._id}
            item={category}
            title="Category"
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default index;
