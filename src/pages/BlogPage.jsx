import React from "react";
import ManageBlogs from "../components/ManageBlogs.jsx"; // Sahi path dein
import Sidebar from "../components/Sidebar.jsx";       // Sahi path dein

const BlogPage = () => {
  return (
    <div className="relative md:flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <ManageBlogs />
      </main>
    </div>
  );
};

export default BlogPage;