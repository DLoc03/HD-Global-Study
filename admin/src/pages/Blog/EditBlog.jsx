import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommonInput from "@/components/common/CommonInput";
import RichTextEditor from "@/components/common/RichTextEditor";
import CommonButton from "@/components/common/CommonButton";
import CommonAlert from "@/components/common/CommonAlert";
import { useApi } from "@/config/api";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";

export default function EditBlog() {
  const { id } = useParams();
  const { post, put, get, loading } = useApi();
  const navigate = useCommonNavigate();

  const [alert, setAlert] = useState();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
    existingImage: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await get("/post/get", { params: { id } });
        if (res?.success) {
          const blog = res.post;
          setFormData({
            title: blog.title || "",
            description: blog.description || "",
            content: blog.content || "",
            image: null,
            existingImage: blog.image || null,
          });
          setPreview(blog.image || null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBlog();
  }, [id, get]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleChange("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(formData.existingImage);
    }
  };

  const handleSubmit = async () => {
    const { title, content, description, image } = formData;

    if (!title || !content) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung");
      return;
    }

    const submitData = new FormData();
    submitData.append("id", id);
    submitData.append("title", title);
    submitData.append("content", content);
    submitData.append("description", description);
    if (image) submitData.append("image", image);

    try {
      const res = await post("/post/update", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.success) {
        setAlert({
          type: "sucess",
          message: res.message,
        });
        setTimeout(() => {
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
    }
  };

  return (
    <div className="mx-auto flex flex-col gap-4 p-4">
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <h1 className="text-2xl font-bold">
        {id ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
      </h1>

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
        placeholder="Nhập tiêu đề phụ"
        value={formData.description}
        onChange={(val) => handleChange("description", val)}
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
                setPreview(formData.existingImage);
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
