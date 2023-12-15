/* eslint-disable react-hooks/rules-of-hooks */
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Carousel from "@/components/ui/ImageSlider";
import ProductCard from "@/components/ui/ProductCard";
import { fetchAllProduct } from "@/pages/api/hello";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const index = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { name } = router.query;
  const getProducts = async () => {
    try {
      const allProducts = await fetchAllProduct();
      setProducts(
        allProducts.filter((product) => product.categoryName == name)
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [name]);

  return (
    <>
    <Header/>
    <Carousel/>
      <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center text-slate-900">Ürünler</h1>
        <h1 className="text-4xl text-slate-700 mb-10">Kategory: {name}</h1>
        <div className="grid grid-cols-3 gap-20">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default index;
