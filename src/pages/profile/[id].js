import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdExit } from "react-icons/io";
import { FaShoppingBasket } from "react-icons/fa";
const Profile = ({ user }) => {
  const { data: session } = useSession();
  const { push } = useRouter();

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      push("/auth/login");
    }
  };

  useEffect(() => {
    if (!session) {
      push("/auth/login");
    }
  }, [session, push]);

  return (
    // <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
    //   <div className="lg:w-80 w-100 flex-shrink-0">
    //     <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
    //       <img
    //         src={user.avatar ? user.avatar:user.image}
    //         alt=""
    //         width={100}
    //         height={100}
    //         className="rounded-full"
    //       />
    //       <b className="text-2xl mt-1">{user.fullName}</b>
    //     </div>
    //     <ul className="text-center font-semibold">
    //       <li
    //         className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
    //           tabs === 0 && "bg-primary text-white"
    //         }`}
    //         onClick={() => setTabs(0)}
    //       >
    //         <i className="fa fa-home"></i>
    //         <button className="ml-1 ">Account</button>
    //       </li>
    //       <li
    //         className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
    //           tabs === 1 && "bg-primary text-white"
    //         }`}
    //         onClick={() => setTabs(1)}
    //       >
    //         <i className="fa fa-key"></i>
    //         <button className="ml-1">Password</button>
    //       </li>
    //       <li
    //         className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
    //           tabs === 2 && "bg-primary text-white"
    //         }`}
    //         onClick={() => setTabs(2)}
    //       >
    //         <i className="fa fa-motorcycle"></i>
    //         <button className="ml-1">Orders</button>
    //       </li>
    //       <li
    //         className={`border border-t-0 w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
    //         onClick={handleSignOut}
    //       >
    //         <i className="fa fa-sign-out"></i>
    //         <button className="ml-1">Exit</button>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    <div className="flex justify-center items-center">
      <div className="m-10 max-w-sm">
        <div className="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
          <div className="relative mx-auto w-36 rounded-full">
            <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2" />
            <img
              className="mx-auto h-auto w-full rounded-full"
              src={user.avatar ? user.avatar : user.image}
              alt=""
            />
          </div>
          <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900">
            {user.username ? user.username : user.email}
          </h1>
          <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
            {user.email ? user.email : user.username}
          </h3>
          <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Architecto, placeat!
          </p>
          <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li className="flex items-center py-3 text-sm">
              <FaShoppingBasket className="w-5 h-5 mr-5"/>
              <span className="text-lg">Orders</span>
              
            </li>
            <li
              className="flex items-center py-3 text-sm"
              onClick={handleSignOut}
            >
              <IoMdExit className="w-5 h-5 mr-5"/>
              <span className="text-lg ">Exit</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, params }) {
  try {
    const user = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
    );
    return {
      props: {
        user: user ? user.data : null,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Profile;
