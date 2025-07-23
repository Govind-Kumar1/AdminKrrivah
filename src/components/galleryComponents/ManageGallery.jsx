// components/ManageGallery.js

import React, { useState, useEffect } from "react";
import { Pencil, X, Plus, Loader2 } from "lucide-react";
import GalleryForm from "./GalleryForm"; // Assuming this component exists
import api from "../../services/api.js"; // Import the generic api instance with corrected path

const ManageGallery = () => {
  const [mode, setMode] = useState("table"); // 'table', 'add', 'edit'
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Define the specific endpoint for this component for cleaner code
  const apiEndpoint = "/heroBrand";

  // Function to fetch all data from the backend
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Use the specific endpoint for the GET request
      const response = await api.get(apiEndpoint);
      setData(response.data.data); 
    } catch (err) {
      setError("Failed to fetch gallery items. Please try again later.");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle deleting an item
  const handleDelete = async (id) => {
    // Using a standard browser confirmation dialog
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        // Prepend the endpoint to the delete request
        await api.delete(`${apiEndpoint}/${id}`);
        fetchData(); // Refetch data to update the table
      } catch (err) {
        setError("Failed to delete item.");
        console.error("Delete Error:", err);
      }
    }
  };

  // Handle creating or updating an item
  const handleSubmit = async (formValues) => {
    setLoading(true);
    setError("");
    try {
      if (mode === "add") {
        const formData = new FormData();
        formData.append('image', formValues.image); // formValues.image must be a File object
        
        // Use the specific endpoint for the POST request
        await api.post(apiEndpoint, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

      } else if (mode === "edit") {
        // For updates, we only handle non-file fields as per your routes.
        // Prepend the endpoint to the PUT request
        await api.put(`${apiEndpoint}/${editingItem._id}`, {
          isActive: formValues.isActive,
        });
      }
      setMode("table");
      setEditingItem(null);
      fetchData(); // Refetch data
    } catch (err) {
      const action = mode === 'add' ? 'create' : 'update';
      setError(`Failed to ${action} item.`);
      console.error(`${action} Error:`, err);
    } finally {
      setLoading(false);
    }
  };

  // Handle toggling the 'isActive' status
  const handleToggleActive = async (item) => {
    try {
      // Prepend the endpoint to the PUT request
      await api.put(`${apiEndpoint}/${item._id}`, { isActive: !item.isActive });
      fetchData(); // Refetch
    } catch (err) {
      setError("Failed to update status.");
      console.error("Toggle Active Error:", err);
    }
  };

  // Render function for different states (loading, error, table, form)
  const renderContent = () => {
    if (loading && data.length === 0) {
      return (
        <div className="flex justify-center items-center p-10 text-gray-500">
          <Loader2 className="animate-spin mr-2" /> Loading data...
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500 text-center p-4 bg-red-50 rounded">{error}</div>;
    }

    if (mode === "add" || mode === "edit") {
      return (
        <GalleryForm
          mode={mode}
          item={editingItem}
          onCancel={() => {
            setMode("table");
            setEditingItem(null);
          }}
          onSubmit={handleSubmit}
          isSubmitting={loading}
        />
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700">
              <th className="border p-3 font-semibold">Image</th>
              <th className="border p-3 font-semibold">Is Active</th>
              <th className="border p-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 text-sm">
                <td className="border p-3">
                  {item.image ? (
                     <img src={item.image} alt="Gallery item" className="h-16 w-auto rounded object-cover"/>
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="border p-3 text-center">
                  <input
                    type="checkbox"
                    className="h-5 w-5 cursor-pointer"
                    checked={item.isActive}
                    onChange={() => handleToggleActive(item)}
                  />
                </td>
                <td className="border p-3 text-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setMode("edit");
                    }}
                    className="text-blue-500 hover:text-blue-700 p-2"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Delete"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-500">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-[#D6D6D6] flex justify-center p-4 min-h-screen">
      <div className="w-full max-w-4xl rounded-lg shadow-lg overflow-hidden bg-white h-fit">
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-4">
          <h2 className="text-lg font-medium">Manage Gallery</h2>
          {mode === "table" && (
            <button
              onClick={() => {
                setMode("add");
                setEditingItem(null);
              }}
              className="bg-white text-black px-4 py-2 text-sm rounded shadow inline-flex items-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <Plus size={16} /> Add New Image
            </button>
          )}
        </div>
        <div className="p-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ManageGallery;
