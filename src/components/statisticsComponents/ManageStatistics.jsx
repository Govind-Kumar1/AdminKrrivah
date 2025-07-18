import React, { useState } from "react";
import { Pencil, X, Plus } from "lucide-react";
import StatisticsForm from "./StatisticsForm";

const initialData = [
  { id: "123456789", number: "number", description: "one liner" },
  { id: "234567891", number: "number", description: "one liner" },
  { id: "345678912", number: "number", description: "one liner" },
  { id: "456789123", number: "number", description: "one liner" },
];

const ManageStatistics = () => {
  const [mode, setMode] = useState("table"); // table | add | edit
  const [data, setData] = useState(initialData);
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => {
    setEditingItem(item);
    setMode("edit");
  };

  const handleDelete = (id) => {
    console.log("API call to delete:", id);
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancel = () => {
    setMode("table");
    setEditingItem(null);
  };

  return (
    <div className="bg-[#D6D6D6] flex justify-center p-4 ">
      <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white ">
        {/* Header */}
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-4">
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

        {/* Conditional rendering based on mode */}
        <div className="p-6">
          {mode === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-sm text-gray-700">
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
                <tbody>
                  {data.map((stat, index) => (
                    <tr key={index} className="hover:bg-gray-50 text-sm">
                      <td className="border p-3">{stat.id}</td>
                      <td className="border p-3">{stat.number}</td>
                      <td className="border p-3">{stat.description}</td>
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

          {mode === "edit" && editingItem && (
            <StatisticsForm
              mode="edit"
              item={editingItem}
              onCancel={handleCancel}
              onSubmit={(updatedForm) => {
                console.log("Updated data:", updatedForm);
                setData((prev) =>
                  prev.map((d) =>
                    d.id === editingItem.id ? { ...d, ...updatedForm } : d
                  )
                );
                setMode("table");
              }}
            />
          )}

          {mode === "add" && (
            <StatisticsForm
              mode="add"
              onCancel={handleCancel}
              onSubmit={(newForm) => {
                console.log("New data:", newForm);
                const newItem = {
                  id: Date.now().toString(),
                  ...newForm,
                };
                setData((prev) => [...prev, newItem]);
                setMode("table");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageStatistics;
