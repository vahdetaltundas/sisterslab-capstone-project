/* eslint-disable react-hooks/rules-of-hooks */
import UserCard from "@/components/adminLayout/ui/UserCard";
import { deleteItem, fetchUsers } from "@/pages/api/hello";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const index = () => {
  const [users, setUsers] = useState([]);
  const router=useRouter();
  const getUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const handleDelete = async (id) => {
    try {
      await deleteItem("users", id);
      toast.success("Ürününüz silindi");
      router.push("/admin/profile/users");
    } catch (error) {
      console.log(error);
      toast.error("Ürününüz silinemedi!");
    }
  };

  return (
    <div className="grid grid-cols-6 gap-5">
      <div className="col-span-6 grid justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {users?.map((user) => (
          <UserCard key={user._id} user={user} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default index;
