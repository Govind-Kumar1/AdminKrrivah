import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, X, Plus } from "lucide-react";
import StatisticsForm from "./StatisticsForm";
const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ManageStatistics = () => {
  const [mode, setMode] = useState("table");
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${api_url}/api/stat`);
      setData(res.data.data || []);
      console.log("Fetched stats:", res.data.data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setMode("edit");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api_url}/api/stat/${id}`, {
        withCredentials: true,
      });
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleCancel = () => {
    setMode("table");
    setEditingItem(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (mode === "edit") {
        await axios.put(
          `${api_url}/api/stat/update/${editingItem.id}`,
          formData,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post(`${api_url}/api/stat/create`, formData, {
          withCredentials: true,
        });
      }

      fetchData();
      setMode("table");
      setEditingItem(null);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="bg-[#D6D6D6] flex justify-center">
      <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white">
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-2">
          <h2 className="text-lg font-medium">Manage Statistics</h2>
          {mode === "table" && (
            <button
              className="bg-white text-black px-4 py-2 text-sm rounded shadow inline-flex items-center gap-2 hover:bg-gray-200"
              onClick={() => setMode("add")}
            >
              <Plus size={16} /> Add New Record
            </button>
          )}
        </div>

        <div className="">
          {mode === "table" && (
            <div className="overflow-x-auto border border-t-0 rounded-b-lg">
              <table className="w-full text-sm">
                <thead className="bg-white">
                  <tr className="text-left text-black">
                    <th className="border p-3 font-semibold">Id</th>
                    <th className="border p-3 font-semibold">
                      Statistics Number
                    </th>
                    <th className="border p-3 font-semibold">
                      Short Description
                    </th>
                    <th className="border p-3 font-semibold">Edit</th>
                    <th className="border p-3 font-semibold">Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((stat) => (
                    <tr key={stat.id}>
                      <td className="border p-3 text-gray-600">{stat.id}</td>
                      <td className="border p-3 text-gray-700">
                        {stat.unit || "-"}
                      </td>
                      <td className="border p-3 text-gray-700">
                        {stat.description}
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => handleEdit(stat)}
                          className="hover:text-blue-600"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                      </td>
                      <td className="border p-3 text-center">
                        <button
                          onClick={() => handleDelete(stat.id)}
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
          )}

          {(mode === "edit" || mode === "add") && (
            <StatisticsForm
              mode={mode}
              item={editingItem}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStatistics;
