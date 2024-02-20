import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { BASE_URL } from "../constant";
const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnchenge = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/user/register`, {
        username: input.name,
        email: input.email,
        password: input.password,
      });
      if (data) {
        navigate("/login");
        toast.success("User register succesfull!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            maxWidth: "800px",
            marginBottom: "50px",
            marginTop: "50px",
          }}
        >
          <div class="left">
            <div class="overlay">
              <h1>Wellcome In My Bloog Application!</h1>
              <p>
                Dear User, We're thrilled to welcome you to our vibrant
                community of [passionate writers/enthusiastic readers/etc.] at
                My Blog Application ! 🎉
              </p>
              <br />
              <h3 style={{ width: "350px" }}>
                These Facilities Are Provided In Our App
              </h3>

              <h3>1.Create Blog</h3>
              <h3>2.Delete Blog</h3>
              <h3>3.Update Blog</h3>
              <h3>4.Show Other Users Blogs</h3>
            </div>
          </div>
          <div>
            <Box
              maxWidth={450}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={3}
              // height={526}
              bgcolor={"azure"}
              boxShadow="10px 10px 20px #ccc"
              padding={3}
              // borderRadius={5}
            >
              <Typography
                variant="h4"
                sx={{ textTransform: "uppercase" }}
                padding={3}
                textAlign="center"
              >
                Register
              </Typography>
              <TextField
                placeholder="Name"
                value={input.name}
                onChange={handleOnchenge}
                name="name"
                margin="normal"
                type={"text"}
                required
              />
              <TextField
                placeholder="Email"
                value={input.email}
                onChange={handleOnchenge}
                name="email"
                margin="normal"
                type={"email"}
                required
              />
              <TextField
                placeholder="Password"
                value={input.password}
                onChange={handleOnchenge}
                name="password"
                margin="normal"
                type={"password"}
                required
              />

              <Button
                type="submit"
                sx={{ borderRadius: 3, marginTop: 3 }}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <Button
                onClick={() => navigate("/login")}
                sx={{ borderRadius: 3, marginTop: 3 }}
              >
                Already Registerd ? Please Login
              </Button>
            </Box>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
