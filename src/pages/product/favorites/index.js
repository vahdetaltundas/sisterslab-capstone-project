import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ProductFavoriteCard from "@/components/ui/ProductFavoriteCard";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Farvorites = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();
  // Local storagedaki datalara erişmiş oldum
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    setFavorites(savedFavorites);
  }, []);
  const removeFromFavorites = (productToRemove) => {
    const updatedFavorites = favorites.filter(
      (product) => product._id !== productToRemove._id
    );
    setFavorites(updatedFavorites);
    toast.success("Ürün başarıyla favorilerden kaldırıldı");
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center text-slate-900 m-10">
        Favorilenmiş Ürünler
      </h1>
      <div className="grid gird-cols-2 md:grid-cols-4 gap-5 mx-10">
        {favorites.map((product) => (
          <ProductFavoriteCard key={product._id} product={product} removeFromFavorites={removeFromFavorites}/>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Farvorites;
