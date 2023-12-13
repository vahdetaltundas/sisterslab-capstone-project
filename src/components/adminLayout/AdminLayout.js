/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React from "react";
import { FaHome, FaBox, FaUser,FaSignOutAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";



const index = ({ children }) => {
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
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-700">
          <Link
            href="/admin/profile"
            className="flex items-center justify-center ps-2.5 mb-5"
          >
            <img
              src="https://i.imgur.com/vTCA3oj.png"
              className="h-10 me-3 sm:h-10"
              alt="Logo"
            />
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaHome className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaBox className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Products</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <BiSolidCategory className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Categories</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaUser className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Users</span>
              </a>
            </li>
            <li>
              <button
                onClick={()=>closeAdminAccount()}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaSignOutAlt className="w-5 h-auto flex-shrink-0 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
              <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {children}
        </div>
      </div>
    </>
  );
};

export default index;
