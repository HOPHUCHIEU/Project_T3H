import React from "react";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { newsId } = useParams(); //hook to get the id from the URL
  return <div>NewsDetail : {newsId}</div>;
};

export default NewsDetail;
