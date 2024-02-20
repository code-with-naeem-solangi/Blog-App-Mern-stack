import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../constant";

const CreateBlog = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  console.log(id);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    // prfImag: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const formData = new FormData();
      // formData.append("title", inputs.title);
      // formData.append("description", inputs.description);
      // formData.append("image", inputs.image);
      // formData.append("prfImag", inputs.prfImag);
      // formData.append("user", id);

      const { data } = await axios.post(`${BASE_URL}/api/v1/blog/create-blog`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        // prfImag: inputs.prfImag,
        user: id,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(inputs);
  };

  return (
    <div>
      <>
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
            marginBottom="30px"
          >
            <Typography
              variant="h3"
              textAlign={"center"}
              fontWeight="bold"
              color="gray"
            >
              CREATE NEW POST
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
              Profile image URL
            </InputLabel>
            <TextField
              name="prfImag"
              value={inputs.prfImag}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
            /> */}
            {/* <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Image
            </InputLabel>
            <input
              type="file"
              accept="image"
              onChange={(e) => {
                console.log(e.target.files);
                setInputs({
                  ...inputs,
                  image: e.target.files[0],
                });
              }}
              margin="normal"
              variant="outlined"
              required
              style={{ marginBottom: "10px" }}
            /> */}

            {/* <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Profile Image
            </InputLabel>
            <input
              type="file"
              accept="image"
              onChange={(e) => {
                console.log(e.target.files);
                setInputs({
                  ...inputs,
                  prfImag: e.target.files[0],
                });
              }}
              margin="normal"
              variant="outlined"
              required
              style={{ marginBottom: "10px" }}
            /> */}

            <Button type="submit" color="primary" variant="contained">
              SUBMIT
            </Button>
          </Box>
        </form>
      </>
    </div>
  );
};

export default CreateBlog;
