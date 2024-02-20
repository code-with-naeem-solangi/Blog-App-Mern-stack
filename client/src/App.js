import Header from "./componant/header";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/blog";
import Login from "./pages/login";
import Register from "./pages/register";
import UserBlogs from "./pages/userBlogs";
import CreateBlog from "./pages/createBlog";
import Blogdeatails from "./pages/blogdeatails";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/blog-details/:id" element={<Blogdeatails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
