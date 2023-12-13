import UserCard from "@/components/adminLayout/ui/UserCard";

import React from "react";

const index = () => {
  return (
    <div className="grid grid-cols-6 gap-5">
      <a
        href="#"
        className="col-end-7 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Users
      </a>
      <div className="col-span-6 grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
};

export default index;
