import React, { useState } from "react";
import { Pencil, X } from "lucide-react";

const dummyProjects = [
  { id: 123456789, title: "PROJECT TITLE", content: "SHORT DESCRIPTION" },
  { id: 234567891, title: "PROJECT TITLE", content: "SHORT DESCRIPTION" },
  { id: 345678912, title: "PROJECT TITLE", content: "SHORT DESCRIPTION" },
  { id: 456789123, title: "PROJECT TITLE", content: "SHORT DESCRIPTION" },
];

export default function ManageProjects() {
  const [projects, setProjects] = useState(dummyProjects);

  const handleDelete = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleToggle = (id) => {
    console.log("Toggle active status for ID:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center rounded-t-md">
        <h2 className="text-lg font-medium">Manage Projects</h2>
        <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200">
          + Add New Record
        </button>
      </div>

      <div className="overflow-x-auto border border-t-0">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Id</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Content</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Publication Date</th>
              <th className="p-3 text-left">Active Status</th>
              <th className="p-3 text-left">Edit</th>
              <th className="p-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {projects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="p-3">{project.id}</td>
                <td className="p-3">{project.title}</td>
                <td className="p-3">{project.content}</td>
                <td className="p-3">THUMBNAIL</td>
                <td className="p-3">MM/DD/YYYY TIME</td>
                <td className="p-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() => handleToggle(project.id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500"></div>
                  </label>
                </td>
                <td className="p-3">
                  <button>
                    <Pencil size={18} />
                  </button>
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(project.id)}>
                    <X size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
