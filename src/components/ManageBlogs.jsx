import React, { useState } from "react";
import { Pencil, X } from "lucide-react";

// Jab aap backend se connect karenge, tab in API functions ka istemal karenge
// import { fetchBlogs, deleteBlog, addBlog } from "../api/blogAPI";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([
    { id: 123456789, title: "BLOG TITLE", content: "SHORT DESCRIPTION" },
    { id: 234567891, title: "BLOG TITLE", content: "SHORT DESCRIPTION" },
    { id: 345678912, title: "BLOG TITLE", content: "SHORT DESCRIPTION" },
    { id: 456789123, title: "BLOG TITLE", content: "SHORT DESCRIPTION" },
  ]);

  const [loading, setLoading] = useState(false); // Shuru me loading false hai
  const [showAddModal, setShowAddModal] = useState(false);

  // Naye blog ke liye state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleDelete = (id) => {
    // Abhi ke liye, yeh state se blog delete karega
    // Real app me yahan API call hogi: await deleteBlog(id);
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    console.log(`Deleted blog with id: ${id}`);
  };

  const handleAdd = () => {
    if (!newTitle || !newContent) {
      alert("Please enter both title and content.");
      return;
    }
    // Naya blog object banayenge
    const newBlog = {
      id: Date.now(), // Unique ID ke liye timestamp ka use
      title: newTitle,
      content: newContent,
    };
    // Naye blog ko list me sabse upar add karenge
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);

    // Modal band karke form reset kar denge
    setShowAddModal(false);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="bg-white p-1 rounded-lg">
      {/* Header */}
      <div className="bg-[#393F36] text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
        <h2 className="text-lg font-medium">Manage Blogs</h2>
        <button
          className="flex items-center gap-2 bg-white text-sm border px-4 py-2 rounded-md text-[#393F36] hover:bg-gray-100 transition-colors"
          onClick={() => setShowAddModal(true)}
        >
          <span className="text-xl font-medium">+</span>
          Add New Record
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-t-0 rounded-b-lg">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-black/80">
                <th className="p-3 font-semibold">Id</th>
                <th className="p-3 font-semibold">Title</th>
                <th className="p-3 font-semibold">Content</th>
                <th className="p-3 font-semibold">Image</th>
                <th className="p-3 font-semibold">Publication Date</th>
                <th className="p-3 font-semibold">Active Status</th>
                <th className="p-3 font-semibold">Edit</th>
                <th className="p-3 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="p-3 text-gray-600">{blog.id}</td>
                  <td className="p-3 uppercase font-medium">{blog.title}</td>
                  <td className="p-3 uppercase text-gray-700">{blog.content}</td>
                  <td className="p-3 uppercase text-gray-400">THUMBNAIL</td>
                  <td className="p-3 text-gray-400">MM/DD/YYYY TIME</td>
                  <td className="p-3">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500"></div>
                    </label>
                  </td>
                  <td className="p-3">
                    <button onClick={() => alert(`Editing blog ID: ${blog.id}`)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} strokeWidth={1.5} />
                    </button>
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(blog.id)} className="text-red-600 hover:text-red-800">
                      <X size={18} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add New Blog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl transition-transform transform scale-100">
            <h3 className="text-xl font-semibold mb-4">Add New Blog</h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border p-2 rounded-md"
                placeholder="Enter blog title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="w-full border p-2 rounded-md"
                placeholder="Enter short description (content)"
                rows="4"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                onClick={handleAdd}
              >
                Save Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}