import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { BASE_URL } from "../constant";
const { Meta } = Card;
export default function BlogCard({
  title,
  description,
  image,
  id,
  // prfImag,
  isUser,
}) {
  const navigate = useNavigate();
  const handleOnEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleOnDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/blog/delete-blog/${id}`
      );
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
        // navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      style={{
        width: 400,
        margin: "auto",
        marginTop: "50px",
        marginBottom: "50px",
      }}
      cover={<img alt="example" src={image} />}
    >
      <Meta
        avatar={
          <Avatar
            style={{ width: "80px", height: "80px" }}
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        title={title}
        description={description}
      />
      {isUser && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "25px",
          }}
        >
          <h2
            onClick={handleOnDelete}
            style={{ cursor: "pointer", color: "gray" }}
          >
            <DeleteOutlined
              key="delete"
              style={{ fontSize: "30px", color: "red" }}
            />
            Delete
          </h2>
          ,
          <hr />
          <h2
            onClick={handleOnEdit}
            style={{ cursor: "pointer", color: "gray" }}
          >
            <EditOutlined
              key="edit"
              style={{ fontSize: "30px", color: "green" }}
            />
            Edit
          </h2>
        </div>
      )}
    </Card>
  );
}
