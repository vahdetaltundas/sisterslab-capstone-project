/* eslint-disable react-hooks/rules-of-hooks */
import VerticalCard from "@/components/adminLayout/ui/VerticalCard";
import { deleteItem } from "@/pages/api/hello";
import { fetchProducts } from "@/pages/store/productsSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const products = () => {
  const dispatch = useDispatch();
  const {products} = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const handleDelete = async (id) => {
    try {
      await deleteItem("products", id);
      toast.success("Ürününüz silindi");
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
      toast.error("Ürününüz silinemedi!");
    }
  };
  return (
    <div className="grid grid-cols-6 gap-5">
      <Link
        href="/admin/profile/products/add-product"
        className="col-end-7 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-400 rounded-lg hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300"
      >
        Add Product
      </Link>
      <div className="col-span-6 grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {products.map((product) => (
          <VerticalCard
            key={product._id}
            item={product}
            title="product"
            handleDelete={handleDelete}
            patchURl="products"
            isDetailView={true}
          />
        ))}
      </div>
    </div>
  );
};

export default products;
