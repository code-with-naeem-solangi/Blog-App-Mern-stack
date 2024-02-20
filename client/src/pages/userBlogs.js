import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../componant/blogCard";
import { BASE_URL } from "../constant";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      console.log(id, "item get id");
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blog/user-blg/${id}`
      );
      console.log(data);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {blogs &&
        blogs.map((blog, indx) => (
          <BlogCard
            key={indx}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            // prfImag={blog.prfImag}
            image={blog.image}
            username={blog.username}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
