import React, { useState, useEffect } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../constant";

const Blogdeatails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const getBlogDetails = async () => {
    try {
      const { data } = await axios(`${BASE_URL}/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
          // prfImag: data?.blog.prfImag,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetails();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          // prfImag: inputs.prfImag,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(inputs);
  };
  console.log(blog);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"40%"}
          border={3}
          borderRadius={5}
          padding={3}
          margin="auto"
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            fontWeight="bold"
            color="gray"
          >
            UPDATE POST
          </Typography>
          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          {/* <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Profille Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.prfImag}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          /> */}
          {/* <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Profile Image
          </InputLabel>
          <TextField
            name="prfImag"
            value={inputs.prfImag}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          /> */}
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Blogdeatails;
