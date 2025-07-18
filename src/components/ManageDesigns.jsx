import React, { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import DesignForm from './DesignForm';

export default function ManageDesigns() {
  const [designs, setDesigns] = useState([
    { id: 1, projectName: "Modern Villa", clientName: "A. Kumar", category: "Residential" },
    { id: 2, projectName: "Corporate Office", clientName: "PQR Corp", category: "Commercial" },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSave = (formData) => {
    const newDesign = { id: Date.now(), ...formData };
    setDesigns(prev => [newDesign, ...prev]);
    setIsFormVisible(false);
  };

  if (isFormVisible) {
    return <DesignForm onSave={handleSave} onClose={() => setIsFormVisible(false)} />;
  }

  return (
    <div className="bg-white p-1 rounded-lg">
      <div className="bg-[#393F36] text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
        <h2 className="text-lg font-medium">Manage Designs</h2>
        <button
          onClick={() => setIsFormVisible(true)}
          className="flex items-center gap-2 bg-white text-sm border px-4 py-2 rounded-md text-[#393F36] hover:bg-gray-100"
        >
          <span className="text-xl font-medium">+</span> Add New Record
        </button>
      </div>
      <div className="overflow-x-auto border border-t-0 rounded-b-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-black/80">
              <th className="p-3 font-semibold">Project Name</th>
              <th className="p-3 font-semibold">Client Name</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">Edit</th>
              <th className="p-3 font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {designs.map(design => (
              <tr key={design.id}>
                <td className="p-3 font-medium">{design.projectName}</td>
                <td className="p-3">{design.clientName}</td>
                <td className="p-3">{design.category}</td>
                <td className="p-3"><button className="text-blue-600 hover:text-blue-800"><Pencil size={18} /></button></td>
                <td className="p-3"><button className="text-red-600 hover:text-red-800"><X size={18} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}