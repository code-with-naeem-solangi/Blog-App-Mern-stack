const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connetDB = require("./config/db");
const userRoute = require("./routes/userroute");
const blogRoute = require("./routes/blogsRoute");
const app = express();

connetDB();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan(`dev`));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

app.get("/", (req, res) => {
  res.send("<h1>Server Running Sucessfully</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `server running of port nomber ${process.env.DEV_MODE} ${PORT}`.bgCyan.white
  );
});
