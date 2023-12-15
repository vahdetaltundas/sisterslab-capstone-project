/* eslint-disable react-hooks/rules-of-hooks */
import VerticalCard from "@/components/adminLayout/ui/VerticalCard";
import { deleteItem } from "@/pages/api/hello";
import { fetchCategories } from "@/store/categoriesSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories} = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleDelete = async (id) => {
    try {
      await deleteItem("categories", id);
      toast.success("Category silindi");
      dispatch(fetchCategories());
    } catch (error) {
      console.log(error);
      toast.error("Category silinemedi!");
    }
  };
  return (
    <div className="grid grid-cols-6 gap-5">
      <Link
        href="/admin/profile/categories/add-category"
        className="col-end-7 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300"
      >
        Add Category
      </Link>
      <div className="col-span-6 grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {categories.map((category) => (
          <VerticalCard
            key={category._id}
            item={category}
            title="category"
            handleDelete={handleDelete}
            patchURl="categories"
            isDetailView={false}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
