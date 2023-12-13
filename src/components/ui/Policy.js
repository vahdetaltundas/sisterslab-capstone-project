import React from "react";
import { LuShieldCheck } from "react-icons/lu";
import { CiDeliveryTruck,CiCreditCard1 } from "react-icons/ci";
import { GiReturnArrow } from "react-icons/gi";

const Policy = () => {
  return (
    <div className="w-full h-auto bg-[#F3F3F3] mt-10">
      <div className="container mx-auto ">
        <div className="grid grid-cols-4 gap-4 p-4 justify-between items-center">
          <div className="flex flex-row justify-center items-center">
            <LuShieldCheck className="w-14 h-auto mx-5"/>
            <p className="text-xl">GÜVENLİ ALIŞVERİŞ</p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <CiDeliveryTruck className="w-14 h-auto mx-5"/>
            <p className="text-xl">HIZLI KARGO</p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <CiCreditCard1 className="w-14 h-auto mx-5 "/>
            <p className="text-xl">TAKSİT İMKANI</p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <GiReturnArrow className="w-14 h-auto mx-5 "/>
            <p className="text-xl">İADE İMKANI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
