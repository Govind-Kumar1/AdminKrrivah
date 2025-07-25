import React, { useState, useEffect } from "react";

const BlogForm = ({ mode, item = {}, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    short_des: "",
    Context: "",
    thumbnail: null,
    mainImage: null,
    date: new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        category: item.category || "",
        title: item.title || "",
        short_des: item.short_des || "",
        long_des: item.long_des || "",
        quote: item.quote || "",
        date: item.date?.substring(0, 10),
        thumbnail: null,
        mainImage: null,
      });
    }
  }, [item, mode]);

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
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">Title</label>
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
          />
        </div>

      </div>

      <div>
        <label className="block font-medium">Short Description</label>
        <textarea
          name="short_des"
          value={formData.short_des}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded"
          required
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

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
          />
        </div>
        <div>
          <label className="block font-medium">Main Image</label>
          <input
            type="file"
            name="mainImage"
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Close Form
        </button>
        <button type="submit" className="bg-[#383D34] text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
