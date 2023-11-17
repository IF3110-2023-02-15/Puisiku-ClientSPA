import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center  ">
      <h1 className="text-9xl font-medium text-center ">404</h1>
      <p className="text-center">Sorry! Page Not Found</p>
      <div className=" flex justify-center ">
        <Link to="/">
          <button className=" justify-center align-items:center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
