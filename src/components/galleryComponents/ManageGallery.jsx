import React, { useState } from "react";
import { Pencil, X, Plus } from "lucide-react";
import GalleryForm from "./GalleryForm";

const initialData = [
  {
    id: "123456789",
    image: "hero image",
    isActive: false,
  },
];

const ManageGallery = () => {
  const [mode, setMode] = useState("table");
  const [data, setData] = useState(initialData);
  const [editingItem, setEditingItem] = useState(null);

  const handleDelete = (id) => {
    console.log("API delete:", id);
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (form) => {
    if (mode === "add") {
      const newItem = {
        id: Date.now().toString(),
        ...form,
        image: "hero image",
        isActive: false,
      };
      setData((prev) => [...prev, newItem]);
    } else if (mode === "edit") {
      setData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...form } : item
        )
      );
    }

    setMode("table");
    setEditingItem(null);
  };

  return (
    <div className="bg-[#D6D6D6] flex  justify-center p-4">
      <div className="w-full max-w-6xl rounded-md shadow-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="bg-[#383D34] text-white flex justify-between items-center px-6 py-4">
          <h2 className="text-lg font-medium">Manage Gallery</h2>
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
          {mode === "table" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-sm text-gray-700">
                    <th className="border p-3 font-semibold">Id</th>
                    <th className="border p-3 font-semibold">Image</th>
                    <th className="border p-3 font-semibold">Active Status</th>
                    <th className="border p-3 font-semibold">Edit</th>
                    <th className="border p-3 font-semibold">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 text-sm">
                      <td className="border p-3">{item.id}</td>
                      <td className="border p-3">{item.image}</td>
                      <td className="border p-3 text-center">
                        <input
                          type="checkbox"
                          checked={item.isActive}
                          onChange={() =>
                            setData((prev) =>
                              prev.map((d) =>
                                d.id === item.id
                                  ? { ...d, isActive: !d.isActive }
                                  : d
                              )
                            )
                          }
                        />
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
                          onClick={() => handleDelete(item.id)}
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

          {(mode === "add" || mode === "edit") && (
            <GalleryForm
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

export default ManageGallery;
