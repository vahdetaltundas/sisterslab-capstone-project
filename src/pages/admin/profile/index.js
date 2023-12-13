/* eslint-disable react-hooks/rules-of-hooks */
import HorizontalCard from "@/components/adminLayout/ui/HorizontalCard";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router=useRouter();
  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          router.push("/admin");
          toast.success("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <HorizontalCard cardUrl="/admin/profile/products" title="Products" desc="Bütün ürünleri listele" imgUrl="https://i.imgur.com/td4w2e7.jpeg"/>
        <HorizontalCard cardUrl="/admin/profile/categories" title="Categories" desc="Bütün kategorileri listele" imgUrl="https://i.imgur.com/tgGv8FM.png"/>
        <HorizontalCard cardUrl="/admin/profile/users" title="Users" desc="Bütün kullanıcıları listele" imgUrl="https://i.imgur.com/3oXhw1X.jpeg"/>
        <button onClick={()=>closeAdminAccount()}>
        <HorizontalCard cardUrl="" title="SignOut" desc="Admin panelden çıkış yap." imgUrl="https://i.imgur.com/DYqXITr.png"/>
        </button>
        
      </div>
    </>
  );
};

export default index;
