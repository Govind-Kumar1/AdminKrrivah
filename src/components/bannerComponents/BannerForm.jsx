import React, { useState, useEffect } from "react";

const BannerForm = ({ mode, item = {}, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    brand: "",
    title: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        brand: item.brand || "",
        title: item.title || "",
        description: item.description || "",
        image: item.imageUrl, // Don't prefill file
      });
    }
  }, [mode, item]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block font-medium">Brand Name</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Short Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Main Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
        />
        <img src={`${formData.image}`} alt="image" height={200} width={200} />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Close Form
        </button>
        <button
          type="submit"
          className="bg-[#383D34] text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default BannerForm;
