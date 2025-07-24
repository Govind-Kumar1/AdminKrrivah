import {React, useState } from 'react';
import { FiEdit } from "react-icons/fi"; // Edit icon
import { FiXSquare } from "react-icons/fi"; // Delete icon

// Sample data for the blogs
const sampleBlogs = [
    { id: '123456789', title: 'BLOG TITLE', content: 'SHORT DESCRIPTION', image: 'THUMBNAIL', publicationDate: 'MM/DD/YYYY TIME', isActive: false },
    { id: '234567891', title: 'BLOG TITLE', content: 'SHORT DESCRIPTION', image: 'THUMBNAIL', publicationDate: 'MM/DD/YYYY TIME', isActive: false },
    { id: '345678912', title: 'BLOG TITLE', content: 'SHORT DESCRIPTION', image: 'THUMBNAIL', publicationDate: 'MM/DD/YYYY TIME', isActive: true },
    { id: '456789123', title: 'BLOG TITLE', content: 'SHORT DESCRIPTION', image: 'THUMBNAIL', publicationDate: 'MM/DD/YYYY TIME', isActive: false },
];

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState(sampleBlogs);

    // Function to toggle the active status of a blog
    const handleToggle = (id) => {
        setBlogs(blogs.map(blog =>
            blog.id === id ? { ...blog, isActive: !blog.isActive } : blog
        ));
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-[#383D34] text-white p-2 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Manage Blogs</h2>
                <button className="bg-white text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-200 transition duration-300">
                    + Add New Record
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-white">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-black border">Id</th>
                            <th className="py-3 px-4 text-left font-semibold text-black border">Title</th>
                            <th className="py-3 px-4 text-left font-semibold text-black border">Content</th>
                            <th className="py-3 px-4 text-left font-semibold text-black border">Image</th>
                            <th className="py-3 px-4 text-left font-semibold text-black border">Publication Date</th>
                            <th className="py-3 px-4 text-left font-semibold text-black border">Active Status</th>
                            <th className="py-3 px-4 text-left font-semibold text-black border">Edit</th>
                            <th className="py-3 px-4 text-left font-semibold text-black border">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {blogs.map((blog) => (
                            <tr key={blog.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 border">{blog.id}</td>
                                <td className="py-3 px-4 border">{blog.title}</td>
                                <td className="py-3 px-4 border">{blog.content}</td>
                                <td className="py-3 px-4 border">{blog.image}</td>
                                <td className="py-3 px-4 border">{blog.publicationDate}</td>
                                <td className="py-3 px-4 border">
                                    {/* Toggle Switch */}
                                    <button
                                        onClick={() => handleToggle(blog.id)}
                                        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ${blog.isActive ? 'bg-blue-500' : 'bg-gray-400'}`}
                                    >
                                        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ${blog.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </td>
                                <td className="py-3 px-4 border">
                                    <button className="text-black hover:text-blue-600">
                                        <FiEdit className='text-black' size={22} />
                                    </button>
                                </td>
                                <td className="py-3 px-4 border">
                                    <button className="text-gray-500 hover:text-red-600">
                                        <FiXSquare className='text-black' size={22} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBlogs;