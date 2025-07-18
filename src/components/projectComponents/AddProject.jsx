import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);

    // Call API here to save project

    navigate("/projects"); // Go back to listing
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="max-w-3xl mx-auto grid gap-4 grid-cols-2">
        <label className="flex flex-col">
          Project Title
          <input
            name="title"
            className="border p-2"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          Date
          <input
            name="date"
            type="date"
            className="border p-2"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label className="col-span-2 flex flex-col">
          Description
          <textarea
            name="content"
            className="border p-2"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </label>

        <label className="col-span-2 flex flex-col">
          Upload Image
          <input
            name="image"
            type="file"
            onChange={handleChange}
            className="border p-2"
          />
        </label>
      </div>

      <div className="flex justify-between mt-6 max-w-3xl mx-auto">
        <button
          type="button"
          className="px-4 py-2 border rounded"
          onClick={() => navigate("/projects")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#373D35] text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
