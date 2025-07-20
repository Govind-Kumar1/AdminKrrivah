import React, { useState, useEffect } from "react";
import { Pencil, X, Plus } from "lucide-react";
import BannerForm from "./BannerForm"; // Your form component
import axios from "axios";

// Define your backend API base URL
const API_URL = "http://localhost:5000/api/heroBrand";

const ManageBanners = () => {
    const [mode, setMode] = useState("table"); // 'table', 'add', 'edit'
    const [data, setData] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    // New states for loading and error handling
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch all banners from the backend
    const fetchBanners = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(API_URL);
            setData(res.data);
        } catch (err) {
            setError("Failed to fetch banners. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchBanners();
    }, []);

    // Function to handle deleting a banner
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            try {
                await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
                fetchBanners(); // Refetch data to update the UI
            } catch (err) {
                alert("Failed to delete banner.");
                console.error(err);
            }
        }
    };

    // Function to handle form submission for both add and edit modes
    const handleSubmit = async (formData) => {
        try {
            if (mode === "add") {
                // For adding, we send multipart/form-data
                const apiFormData = new FormData();
                Object.keys(formData).forEach(key => {
                    apiFormData.append(key, formData[key]);
                });
                await axios.post(API_URL, apiFormData, { 
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else if (mode === "edit") {
                // For editing, we send JSON (assuming no image update for now)
                // Note: If your PUT route supports image updates, this needs to be multipart/form-data too.
                await axios.put(`${API_URL}/${editingItem._id}`, formData, { withCredentials: true });
            }
            fetchBanners(); // Refetch data on success
        } catch (err) {
            alert(`Failed to ${mode} banner.`);
            console.error(err);
        } finally {
            setMode("table");
            setEditingItem(null);
        }
    };
    
    // Function to toggle the active status
    const handleToggleStatus = async (item) => {
        try {
            // Your updateHeroBrand controller will handle the update
            await axios.put(`${API_URL}/${item._id}`, { isActive: !item.isActive }, { withCredentials: true });
            fetchBanners(); // Refetch to show the change
        } catch (err) {
             alert("Failed to update status.");
             console.error(err);
        }
    }

    // Render loading or error state
    if (loading) return <div className="p-6 text-center">Loading banners...</div>;
    if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

    return (
        <div className="bg-[#D6D6D6] flex justify-center p-4">
            <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white">
                {/* Header */}
                <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-4">
                    <h2 className="text-lg font-medium">Manage Banner</h2>
                    {mode === "table" && (
                        <button
                            onClick={() => setMode("add")}
                            className="bg-white text-black px-4 py-2 text-sm rounded shadow inline-flex items-center gap-2 hover:bg-gray-200"
                        >
                            <Plus size={16} /> Add New Record
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {mode === "table" ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-sm text-gray-700">
                                        <th className="border p-3 font-semibold">BRAND NAME</th>
                                        <th className="border p-3 font-semibold">Image</th>
                                        <th className="border p-3 font-semibold">Title</th>
                                        <th className="border p-3 font-semibold">Description</th>
                                        <th className="border p-3 font-semibold text-center">Active</th>
                                        <th className="border p-3 font-semibold text-center">Edit</th>
                                        <th className="border p-3 font-semibold text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50 text-sm">
                                            <td className="border p-3">{item.brandName}</td>
                                            <td className="border p-3">
                                                <img src={item.image} alt={item.title} className="w-24 h-auto object-cover" />
                                            </td>
                                            <td className="border p-3">{item.title}</td>
                                            <td className="border p-3">{item.description}</td>
                                            <td className="border p-3 text-center">
                                                <button
                                                    onClick={() => handleToggleStatus(item)}
                                                    className={`px-3 py-1 text-xs rounded-full text-white ${item.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                                                >
                                                    {item.isActive ? "Active" : "Inactive"}
                                                </button>
                                            </td>
                                            <td className="border p-3 text-center">
                                                <button
                                                    onClick={() => {
                                                        setEditingItem(item);
                                                        setMode("edit");
                                                    }}
                                                    className="hover:text-blue-600"
                                                >
                                                    <Pencil className="w-5 h-5" />
                                                </button>
                                            </td>
                                            <td className="border p-3 text-center">
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="hover:text-red-600"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <BannerForm
                            mode={mode}
                            item={editingItem}
                            onCancel={() => {
                                setMode("table");
                                setEditingItem(null);
                            }}
                            onSubmit={handleSubmit}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageBanners;