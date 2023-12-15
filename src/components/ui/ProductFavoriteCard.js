import { useRouter } from "next/router";
import React from "react";
import { LuHeartOff } from "react-icons/lu";

const ProductFavoriteCard = ({product,removeFromFavorites}) => {
  const router=useRouter()
  
  return (
    <div className="group  flex w-full flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
      <div className="relative flex h-[28rem] overflow-hidden" href="#">
        <img
          onClick={()=>router.push(`/product/${product._id}`)}
          className="absolute top-0 right-0 h-full w-full object-fill cursor-pointer"
          src={product.img}
          alt="product image"
        />
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
        <div className="flex justify-between items-center">
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
        <button onClick={()=>removeFromFavorites(product)} className="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
            <LuHeartOff className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFavoriteCard;
