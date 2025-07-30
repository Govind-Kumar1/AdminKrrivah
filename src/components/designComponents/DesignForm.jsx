import React, { useState, useEffect } from "react";

const DesignForm = ({ mode, item = {}, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    pageName: "design",
    image: null,
    component: ""
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        pageName: item.pageName || "design",
        image: null, // file input cannot be pre-filled
        component: item.component || ""
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
        <label className="block font-medium mb-1">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded bg-[#383D34] text-white"
        />

        {/* Show preview for existing image in edit mode */}
        {item?.imageUrl && (
          <img
            src={item.imageUrl}
            alt="Existing"
            height={200}
            width={200}
            className="mt-2"
          />
        )}

        {/* Show preview of newly selected image */}
        {formData.image && typeof formData.image !== "string" && (
          <img
            src={URL.createObjectURL(formData.image)}
            alt="Preview"
            height={200}
            width={200}
            className="mt-2"
          />
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Component</label>
        <input
          type="text"
          name="component"
          value={formData.component}
          onChange={handleChange}
          className="border px-3 py-2 w-full rounded bg-white text-black"
        />
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

export default DesignForm;
