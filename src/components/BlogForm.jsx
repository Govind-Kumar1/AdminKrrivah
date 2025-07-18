import React, { useState } from 'react';

const BlogForm = ({ onSave, onClose }) => {
  // Form ke saare fields ke liye initial state
  const initialFormState = {
    title: '',
    category: '',
    publicationDate: '',
    shortDescription: '',
    context: '',
    blogThumbnail: null,
    mainImage: null,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Form me kuch bhi change hone par state update karega
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Form submit hone par data save karega
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold mb-6 border-b pb-4">Add/Edit Blog</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded-md shadow-sm" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded-md shadow-sm" required>
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Architecture">Architecture</option>
                <option value="Interior Design">Interior Design</option>
                </select>
            </div>
            <div>
                <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700 mb-1">Publication Date</label>
                <input type="date" name="publicationDate" id="publicationDate" value={formData.publicationDate} onChange={handleChange} className="w-full border p-2 rounded-md shadow-sm" required />
            </div>
        </div>

        <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <input type="text" name="shortDescription" id="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full border p-2 rounded-md shadow-sm" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="blogThumbnail" className="block text-sm font-medium text-gray-700 mb-1">Blog Thumbnail</label>
                <input type="file" name="blogThumbnail" id="blogThumbnail" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
            </div>
            <div>
                <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700 mb-1">Main Image</label>
                <input type="file" name="mainImage" id="mainImage" onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
            </div>
        </div>

        <div>
            <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-1">Context</label>
            <textarea name="context" id="context" value={formData.context} onChange={handleChange} rows="8" className="w-full border p-2 rounded-md shadow-sm"></textarea>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t mt-8">
            <button type="button" onClick={onClose} className="text-sm text-gray-600 hover:underline">
                Close Form
            </button>
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                Submit
            </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;