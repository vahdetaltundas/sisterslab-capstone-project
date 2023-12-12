/* eslint-disable react-hooks/rules-of-hooks */
import HorizontalCard from "@/components/adminLayout/ui/HorizontalCard";
import Link from "next/link";
import React from "react";
import { FaHome,FaBox,FaUser } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";

const index = () => {
  
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <HorizontalCard cardUrl="" title="Products" desc="Bütün ürünleri listele" imgUrl="/img/ProductImg.jpg"/>
        <HorizontalCard cardUrl="" title="Categories" desc="Bütün kategorileri listele" imgUrl="/img/CategoryImg.png"/>
        <HorizontalCard cardUrl="" title="Users" desc="Bütün kullanıcıları listele" imgUrl="/img/UserImg.jpg"/>
        <HorizontalCard cardUrl="" title="SignOut" desc="Admin panelden çıkış yap." imgUrl="/img/SignOutImg.png"/>
        
      </div>
    </>
  );
};

export default index;
