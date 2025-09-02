import React, { useState } from "react";
import CommonInput from "@/components/common/CommonInput";
import RichTextEditor from "@/components/common/RichTextEditor";
import CommonButton from "@/components/common/CommonButton";
import { useApi } from "@/config/api";

import CommonAlert from "@/components/common/CommonAlert";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";

export default function CreateBlog() {
  const { post, loading } = useApi();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
  });

  const [alert, setAlert] = useState();

  const [preview, setPreview] = useState(null);

  const navigate = useCommonNavigate();

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleChange("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Submit form
  const handleSubmit = async () => {
    const { title, content, description, image } = formData;

    if (!title || !content) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", title);
    submitData.append("content", content);
    submitData.append("description", description);
    if (image) submitData.append("image", image);

    try {
      const res = await post("/post/create", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.success) {
        setAlert({
          type: "success",
          message: "Đã tạo bài viết mới!",
        });
        // Reset form
        setTimeout(() => {
          setFormData({ title: "", content: "", image: null });
          setPreview(null);
          navigate(PATHS.BLOG);
        }, [1000]);
      } else {
        setAlert({
          type: "error",
          message: res.message,
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: res.message,
      });
    }
  };

  return (
    <div className="mx-auto flex flex-col gap-4 p-4">
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert?.message}
          onClose={() => setAlert(null)}
        />
      )}
      <h1 className="text-2xl font-bold">Tạo bài viết mới</h1>

      {/* Title */}
      <CommonInput
        label="Tiêu đề bài viết"
        placeholder="Nhập tiêu đề"
        value={formData.title}
        onChange={(val) => handleChange("title", val)}
        className="max-w-4xl"
        required
      />

      <CommonInput
        label="Tiêu đề phụ"
        placeholder="Nhập tiêu đề"
        value={formData.description}
        onChange={(val) => handleChange("description", val)}
        required
      />

      {/* Image Upload */}
      <div className="flex max-w-md flex-col gap-2">
        <label className="text-md font-medium">Ảnh đại diện</label>
        <label className="hover:border-primary flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors">
          <p className="text-sm text-gray-500">
            {formData.image ? "Thay ảnh" : "Chọn ảnh"}
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        {/* Preview */}
        {preview && (
          <div className="mt-2">
            <p className="mb-1 text-sm text-gray-500">Xem trước:</p>
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-64 rounded-lg border border-gray-200 object-cover"
            />
            <button
              type="button"
              onClick={() => {
                handleChange("image", null);
                setPreview(null);
              }}
              className="mt-2 text-sm text-red-500 hover:underline"
            >
              Xóa ảnh
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <RichTextEditor
        initialValue={formData.content}
        onChange={(val) => handleChange("content", val)}
      />

      {/* Submit */}
      <CommonButton
        onClick={handleSubmit}
        className="bg-primary mt-4 w-full rounded-full text-white"
        disabled={loading}
      >
        {loading ? "Đang lưu..." : "Lưu bài viết"}
      </CommonButton>
    </div>
  );
}
