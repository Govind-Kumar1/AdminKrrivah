import React, { useState } from 'react';

const DesignForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    clientName: '',
    location: '',
    category: '',
    description: '',
    mainImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-6 border-b pb-4">Add/Edit Design Project</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input type="text" name="projectName" id="projectName" value={formData.projectName} onChange={handleChange} className="w-full border p-2 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
            <input type="text" name="clientName" id="clientName" value={formData.clientName} onChange={handleChange} className="w-full border p-2 rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="w-full border p-2 rounded-md" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" id="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded-md shadow-sm" required>
              <option value="">Select a category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Hospitality">Hospitality</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="6" className="w-full border p-2 rounded-md shadow-sm"></textarea>
        </div>
        <div>
          <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
          <input type="file" name="mainImage" id="mainImage" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t mt-8">
          <button type="button" onClick={onClose} className="text-sm text-gray-600 hover:underline">Close Form</button>
          <button type="submit" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default DesignForm;