import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../componant/blogCard";
import { BASE_URL } from "../constant";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/blog/all-blog`);
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {blogs &&
        blogs.map((blog, indx) => (
          <BlogCard
            key={indx}
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog.user?._id}
            title={blog?.title}
            description={blog?.description}
            // prfImag={blog?.prfImag}
            image={blog?.image}
            username={blog?.username}
          />
        ))}
    </div>
  );
};

export default Blog;
