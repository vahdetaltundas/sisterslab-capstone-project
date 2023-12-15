import React from "react";

const UserCard = ({user,handleDelete}) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      
      <div className="flex flex-col items-center mt-10 pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={user.avatar ? user.avatar:user.image}
          alt="userimg"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {user.username?user.username:user.email}
        </h5>
        <span className="text-sm text-gray-500">
        oluşturulma tarihi: {user.createdAt}
        </span>
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={() => handleDelete(user._id)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            Delete User
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default UserCard;
