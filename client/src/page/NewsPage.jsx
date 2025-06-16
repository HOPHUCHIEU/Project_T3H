import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const NewsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>NewsPage</h1>
      <button
        onClick={() => {
          navigate("/news/1");
        }}
      >
        Show detail
      </button>
      <Outlet />
    </div>
  );
};

export default NewsPage;
