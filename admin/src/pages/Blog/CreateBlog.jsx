import React, { useState, useEffect } from "react";
import CommonInput from "@/components/common/CommonInput";
import RichTextEditor from "@/components/common/RichTextEditor";
import CommonButton from "@/components/common/CommonButton";
import { useApi } from "@/config/api";
import CommonAlert from "@/components/common/CommonAlert";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";
import CommonBack from "@/components/common/CommonBack";
import CategoryPopup from "@/components/ui/CategoryPopup";

export default function CreateBlog() {
  const { post, get, loading } = useApi();
  const navigate = useCommonNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
    category_id: "",
  });

  const [alert, setAlert] = useState();
  const [preview, setPreview] = useState(null);

  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await get("/category/");
        if (res?.success) {
          setCategories(res.items || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, [get]);

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
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    const { title, content, description, image, category_id } = formData;
    if (!title || !content) {
      setAlert({
        type: "warning",
        message: "Tên blog/nội dung không được để trống",
      });
      return;
    }
    if (!category_id) {
      setAlert({ type: "warning", message: "Vui lòng chọn danh mục" });
      return;
    }

    const submitData = new FormData();
    submitData.append("title", title);
    submitData.append("content", content);
    submitData.append("description", description);
    submitData.append("category_id", category_id);
    if (image) submitData.append("image", image);

    try {
      const res = await post("/post/create", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.success) {
        setAlert({ type: "success", message: "Đã tạo bài viết mới!" });
        setTimeout(() => {
          setFormData({ title: "", content: "", image: null, category_id: "" });
          setPreview(null);
          navigate(PATHS.BLOG);
        }, 1000);
      } else {
        setAlert({ type: "error", message: res.message });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Có lỗi xảy ra khi lưu" });
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

      <CommonBack />
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
        placeholder="Nhập tiêu đề phụ"
        value={formData.description}
        onChange={(val) => handleChange("description", val)}
      />

      {/* Category */}
      <div className="flex items-end gap-2">
        <div className="flex flex-col">
          <label className="text-md mb-1 font-medium">Danh mục</label>
          <select
            className="rounded-md border bg-white px-3 py-2"
            value={formData.category_id}
            onChange={(e) => handleChange("category_id", e.target.value)}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <CommonButton
          onClick={() => setShowModal(true)}
          className="bg-primary rounded-md px-3 py-2 text-white"
        >
          + Tạo mới
        </CommonButton>
      </div>

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

      <CommonButton
        onClick={handleSubmit}
        className="bg-primary mt-4 w-full rounded-full text-white"
        disabled={loading}
      >
        {loading ? "Đang lưu..." : "Lưu bài viết"}
      </CommonButton>

      {/* Modal */}
      <CategoryPopup
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreated={(newCat) => {
          setCategories((prev) => [...prev, newCat]);
          handleChange("category_id", newCat.id);
        }}
      />
    </div>
  );
}
