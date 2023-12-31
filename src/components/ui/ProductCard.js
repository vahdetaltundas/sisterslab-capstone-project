import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

const ProductCard = ({product}) => {
  const router=useRouter()
  const addToFavorites = (product) => {
    const currentFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    // Eğer ürün varsa tekrar eklememek için yazılan bir kontrol
    if (currentFavorites.find((item) => item._id === product._id)) {
      return;
    } else {
      const updatedFavorites = [...currentFavorites, product];
      toast.success("Ürün başarıyla favorilere eklendi!");
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };
  return (
    <div className="group  flex w-full flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
      <div className="relative flex h-[28rem] overflow-hidden" href="#">
        <img
          onClick={()=>router.push(`/product/${product._id}`)}
          className="absolute top-0 right-0 h-full w-full object-fill cursor-pointer"
          src={product.img}
          alt="product image"
        />
        <div className="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
          <button onClick={()=>addToFavorites(product)} className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-4 px-5 pb-5">
        
          <h5 className="text-xl tracking-tight text-slate-900 line-clamp-1 ">
            {product.name}
          </h5>
        
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-2xl font-medium text-slate-700">{product.currency} </span>
            <span className="text-2xl text-slate-800">{product.price}</span>
            
          </p>
        </div>
        <button className="flex items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
