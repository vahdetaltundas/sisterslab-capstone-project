import { verifyJwtToken } from "@/util/verifyJwtToken";
import React from "react";

const index = () => {
  return <div>index</div>;
};
export const getServerSideProps = async (context) => {
    const { req, params } = context;
      
    const tokenCookie = req.headers.cookie ? req.headers.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')) : null;
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;
    const hasVerifiedToken = token && (await verifyJwtToken(token));
  
    if (!hasVerifiedToken) {
      
      return {
        redirect: {
          destination: `/admin?`,
          permanent: false,
        },
        props: {},
      };
    }
  
    return {
      props: {},
    };
  };
  
export default index;
