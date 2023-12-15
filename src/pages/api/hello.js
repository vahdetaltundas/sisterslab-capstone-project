import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL,
});



export const deleteItem = async (url,id) => {
  const response = await axiosInstance.delete(`/${url}/${id}`);
  return response.data;
};

export const fetchUsers=async()=>{
  const response=await axiosInstance.get(`/users`);
  return response.data;
}

export const fetchAllProduct=async()=>{
  const response=await axiosInstance.get(`/products`);
  return response.data;
}

export const fetchProductById=async(id)=>{
  const response=await axiosInstance.get(`/products/${id}`);
  return response.data;
}