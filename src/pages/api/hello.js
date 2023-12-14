import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL,
});



export const deleteItem = async (url,id) => {
  const response = await axiosInstance.delete(`/${url}/${id}`);
  return response.data;
};