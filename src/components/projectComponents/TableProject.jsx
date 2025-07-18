import React, { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManageProjects() {
  const [projects, setProjects] = useState([
    { id: 123456789, title: "PROJECT TITLE", content: "SHORT DESCRIPTION" },
    { id: 234567891, title: "PROJECT TITLE", content: "SHORT DESCRIPTION" },
    { id: 345678912, title: "PROJECT TITLE", content: "SHORT DESCRIPTION" },
    { id: 456789123, title: "PROJECT TITLE", content: "SHORT DESCRIPTION" },
  ]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      // const res = await fetchProjects(); // API call
      // setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // await deleteProject(id); // API call
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="bg-[#D6D6D6] p-4">
      {/* Header */}
      <div className="bg-[#393F36] text-[#FFFFFF] px-6 py-3 flex justify-between items-center rounded-t">
        <h2 className="text-base font-medium">Manage Projects</h2>
        <button
          className="flex items-center gap-2 bg-[#FFFFFF] text-sm border px-4 py-1 text-[#393F36] hover:bg-gray-100"
          onClick={() => navigate("/admin/project/add-project")}
        >
          <span className="text-xl font-medium">+</span>
          Add New Record
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-t-0">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white text-left border-t border-gray-200 text-sm text-black">
                <th className="p-3 border-r border-gray-200">Id</th>
                <th className="p-3 border-r border-gray-200">Title</th>
                <th className="p-3 border-r border-gray-200">Content</th>
                <th className="p-3 border-r border-gray-200">Image</th>
                <th className="p-3 border-r border-gray-200">Publication Date</th>
                <th className="p-3 border-r border-gray-200">Active Status</th>
                <th className="p-3 border-r border-gray-200">Edit</th>
                <th className="p-3 border-r border-gray-200">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {projects.map((p) => (
                <tr key={p.id} className="border-t border-gray-200">
                  <td className="p-3 border-r border-gray-200">{p.id}</td>
                  <td className="p-3 border-r border-gray-200 uppercase">{p.title}</td>
                  <td className="p-3 border-r border-gray-200 uppercase">{p.content}</td>
                  <td className="p-3 border-r border-gray-200">THUMBNAIL</td>
                  <td className="p-3 border-r border-gray-200">MM/DD/YYYY TIME</td>
                  <td className="p-3 border-r border-gray-200">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500" />
                    </label>
                  </td>
                  <td className="p-3 border-r border-gray-200">
                    <button onClick={() => alert("Edit flow here")}>
                      <Pencil size={18} strokeWidth={1.5} />
                    </button>
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(p.id)}>
                      <X size={18} strokeWidth={1.5} />
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
