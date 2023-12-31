/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchAllProduct } from "../api/hello";
import Header from "@/components/layout/Header";
import Carousel from "@/components/ui/ImageSlider";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "@/components/layout/Footer";
import CardSkeleton from "@/components/ui/CardSkeleton";

const index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await fetchAllProduct();
      setProducts(allProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const skeletonArray = Array.from({ length: 12 }, (v, i) => i);
  return (
    <>
      <Header />
      <Carousel />
      <h1 className="text-4xl font-bold text-center text-slate-900 m-10">
        Tüm Ürünler
      </h1>
      {loading ? (
        <div className="grid gird-cols-2 md:grid-cols-4 gap-5 mx-10">
          {skeletonArray.map((index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gird-cols-2 md:grid-cols-4 gap-5 mx-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};

export default index;
