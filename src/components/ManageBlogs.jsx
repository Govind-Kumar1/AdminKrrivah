import React, { useState } from "react";
import { Pencil, X } from "lucide-react";
import BlogForm from './BlogForm'; // Naya form component import karein

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([
    { id: 123456789, title: "BLOG TITLE", content: "SHORT DESCRIPTION" },
    { id: 234567891, title: "BLOG TITLE", content: "SHORT DESCRIPTION" },
  ]);

  // Modal ki jagah ab form ko dikhane ya chhupane ke liye state
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  // Naye blog ko save karne ka function
  const handleSaveBlog = (formData) => {
    console.log("Saving blog data:", formData);
    const newBlog = {
        id: Date.now(),
        title: formData.title,
        content: formData.shortDescription, // Table me dikhane ke liye
    };
    setBlogs(prev => [newBlog, ...prev]);
    setIsFormVisible(false); // Save karne ke baad form band kar dein
  };
  
  // Agar form dikhana hai, to sirf BlogForm component render hoga
  if (isFormVisible) {
      return <BlogForm onSave={handleSaveBlog} onClose={() => setIsFormVisible(false)} />;
  }

  // Warna, blog list ka table dikhega
  return (
    <div className="bg-white p-1 rounded-lg">
      <div className="bg-[#393F36] text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
        <h2 className="text-lg font-medium">Manage Blogs</h2>
        <button
          className="flex items-center gap-2 bg-white text-sm border px-4 py-2 rounded-md text-[#393F36] hover:bg-gray-100"
          onClick={() => setIsFormVisible(true)} // Button ab form dikhayega
        >
          <span className="text-xl font-medium">+</span>
          Add New Record
        </button>
      </div>

      <div className="overflow-x-auto border border-t-0 rounded-b-lg">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr className="text-left text-black/80">
                <th className="p-3 font-semibold">Id</th>
                <th className="p-3 font-semibold">Title</th>
                <th className="p-3 font-semibold">Short Description</th>
                <th className="p-3 font-semibold">Edit</th>
                <th className="p-3 font-semibold">Delete</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="p-3 text-gray-600">{blog.id}</td>
                  <td className="p-3 uppercase font-medium">{blog.title}</td>
                  <td className="p-3 uppercase text-gray-700">{blog.content}</td>
                  <td className="p-3">
                    <button onClick={() => alert(`Edit ${blog.id}`)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-800">
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div> 
  );
}