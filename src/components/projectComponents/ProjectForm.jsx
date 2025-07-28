// src/components/project/ProjectForm.jsx

import React, { useEffect, useState } from "react";

const ProjectForm = ({ mode, item = {}, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    short_des: "",
    long_des: "",
    thumbnail: null,
    brochure: null,
    images: [],
    Amenities: "",
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData((prev) => ({
        ...prev,
        title: item.title || "",
        category: item.category || "",
        date: item.createdAt?.split("T")[0] || "",
        location: item.location || "",
        short_des: item.short_des || "",
        long_des: item.long_des || "",
        Amenities: item.Amenities?.map((a) => a.title).join(", ") || "",
        thumbnail: null,
        brochure: null,
        images: [],
      }));
    }
  }, [item, mode]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      if (name === "images") {
        setFormData((prev) => ({
          ...prev,
          images: Array.from(files).slice(0, 10),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preparedData = {
      ...formData,
      Amenities: formData.Amenities.split(",").map((a) => a.trim()),
    };
    onSubmit(preparedData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            placeholder="E.g. Residential, Commercial"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Publication Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium">Short Description</label>
        <input
          type="text"
          name="short_des"
          value={formData.short_des}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Blog Thumbnail</label>
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
        />
      </div>

      <div>
        <label className="block font-medium">Amenities</label>
        <input
          type="text"
          name="Amenities"
          value={formData.Amenities}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          placeholder="Comma separated values (e.g., Pool, Gym, Lift)"
        />
      </div>

      <div>
        <label className="block font-medium">Context</label>
        <textarea
          name="long_des"
          value={formData.long_des}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          rows={5}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">
            Upload Image <span className="text-sm">(Upto 10)</span>
          </label>
          <input
            type="file"
            name="images"
            onChange={handleChange}
            multiple
            accept="image/*"
            className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
          />
        </div>

        <div>
          <label className="block font-medium">Upload Brochure</label>
          <input
            type="file"
            name="brochure"
            onChange={handleChange}
            accept="application/pdf"
            className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
          />
        </div>
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

export default ProjectForm;
