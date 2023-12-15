import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CategoryCard from "@/components/ui/CategoryCard";
import Carousel from "@/components/ui/ImageSlider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import { fetchCategories } from "@/pages/store/categoriesSlice";
import { fetchProducts } from "@/pages/store/productsSlice";
import CardSkeleton from "./ui/CardSkeleton";

const HomePage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products, loadingProducts } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);
  const skeletonArray = Array.from({ length: 12 }, (v, i) => i);
  const firstTwentyProducts = products.slice(0, 20);
  return (
    <>
      <Header />
      <Carousel />
      <div className="container mx-auto ">
        <h1 className="text-4xl font-bold text-center text-slate-900">
          Kategoriler
        </h1>
        <div className="grid gird-cols-1 md:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
      <img
        src="/img/BannerNY.png"
        alt=""
        className="w-full h-[20rem] my-10 rounded-2xl"
      />
      <h1 className="text-4xl font-bold text-center text-slate-900 mb-10">
        Ürünler
      </h1>
      {loadingProducts ? (
        <div className="grid gird-cols-2 md:grid-cols-4 gap-5 mx-5">
          {skeletonArray.map((index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid gird-cols-2 md:grid-cols-4 gap-5 mx-5">
          {firstTwentyProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-center items-center m-10">
        <Link
          href="/product"
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
            Bütün ürünler
          </span>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
