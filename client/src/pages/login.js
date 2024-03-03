import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { authActions } from "../redax/store";
import "./index.css";
import {
  FacebookFilled,
  GithubOutlined,
  GooglePlusOutlined,
} from "@ant-design/icons";
import { BASE_URL } from "../constant";

const Login = () => {
  const navigate = useNavigate();
  const dispcth = useDispatch();
  const [input, setInput] = useState({
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
      const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, {
        email: input.email,
        password: input.password,
      });
      if (data.success) {
        console.log(data, "data for save local storage");
        localStorage.setItem("userId", data?.user?.[0]?._id);
        dispcth(authActions.login());
        toast.success("User login succesfull!");
        navigate("/blogs");
      }
      console.log(data, "after login succecsfull data");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
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
              <h1>Wellcome Back In My App!</h1>
              <p>
                Dear User, We're thrilled to welcome you to our vibrant
                community of [passionate writers/enthusiastic readers/etc.] at
                My Blog Application ! 🎉
              </p>
              <span>
                <p>login with</p>
                <a href="#">
                  <FacebookFilled />
                </a>
                <a href="#" className="second">
                  <GithubOutlined />
                </a>
                <a href="#">
                  <GooglePlusOutlined />
                </a>
              </span>
            </div>
          </div>
          <div>
            <Box
              maxWidth={350}
              display="flex"
              flexDirection={"column"}
              alignItems="center"
              justifyContent={"center"}
              margin="auto"
              marginTop={3}
              // height={528}
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
                Login
              </Typography>

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
                onClick={() => navigate("/register")}
                sx={{ borderRadius: 3, marginTop: 3 }}
              >
                Not a Registerd ? Please Register
              </Button>
            </Box>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
