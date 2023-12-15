import { useRouter } from "next/router";
import React from "react";

const CategoryCard = ({ category }) => {
  const router=useRouter()
  return (
    <button onClick={()=>router.push(`/category/${category.name}`)}>
      <div className="flex items-center justify-center mt-16">
        <div className="relative grid h-[40rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
          <div
            className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-500 shadow-none`}
            style={{ backgroundImage: `url("${category.img}")` }}
          >
            <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/60 via-black/30" />
          </div>
          <div className="relative p-6 px-6 py-14 md:px-12">
            <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
              {category.name}
            </h2>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;
