import { signOut, useSession } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect } from "react";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      router.push("/auth/login");
    }
  };
  

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)]">
      <div className="w-80">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
          <Image
            src="/images/client2.jpg"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">John Doe</b>
        </div>
        <ul className="text-center font-semibold">
          <li className="border w-full p-3 cursor-pointer hover:bg-slate-500 hover:text-white transition-all">
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Account</button>
          </li>
          <li className="border w-full p-3 cursor-pointer hover:bg-slate-500 hover:text-white transition-all">
            <i className="fa fa-key"></i>
            <button className="ml-1">Password</button>
          </li>
          <li className="border w-full p-3 cursor-pointer hover:bg-slate-500 hover:text-white transition-all">
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className="border w-full p-3 cursor-pointer hover:bg-slate-500 hover:text-white transition-all"
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};



export default Profile;
