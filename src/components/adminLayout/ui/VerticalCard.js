import { useRouter } from "next/router";
import React from "react";

const VerticalCard = ({
  item,
  title,
  handleDelete,
  patchURl,
  isDetailView,
}) => {
  const router = useRouter();
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
      <img className="rounded-t-lg" src={item.img} alt="" />

      <div className="p-5">
        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {item.name}
        </p>

        <p className="mb-3 font-normal text-gray-700 line-clamp-1">
          {title} oluşturulma tarihi: {item.createdAt}
        </p>
        <p className="mb-3 font-normal text-gray-700 line-clamp-1">
          {title} son güncellenme tarihi:{item.updatedAt}
        </p>
        <div className="grid justify-center gap-3">
          {isDetailView ? (
            <button className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              View {title}
            </button>
          ) : null}
          <button
            onClick={() =>
              router.push(
                `/admin/profile/${patchURl}/update-${title}/${item._id}`
              )
            }
            className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300"
          >
            Update {title}
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className=" items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            Delete {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerticalCard;
