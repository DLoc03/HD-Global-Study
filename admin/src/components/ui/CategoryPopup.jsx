import React, { useState } from "react";
import CommonInput from "@/components/common/CommonInput";
import CommonButton from "@/components/common/CommonButton";
import CommonAlert from "@/components/common/CommonAlert";
import { useApi } from "@/config/api";

export default function CategoryPopup({ open, onClose, onCreated }) {
  const { post } = useApi();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  if (!open) return null;

  const handleCreate = async () => {
    if (!name.trim()) {
      setAlert({
        type: "warning",
        message: "Tên danh mục không được để trống",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await post("/category/create", { name });
      if (res.success) {
        setAlert({ type: "success", message: "Đã tạo danh mục mới" });
        onCreated({ id: res.category_id, name });
        setName("");
        setTimeout(onClose, 800);
      } else {
        setAlert({ type: "error", message: res.message });
      }
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Có lỗi xảy ra" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {alert && (
          <CommonAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        <h2 className="mb-4 text-lg font-bold">Tạo danh mục mới</h2>
        <CommonInput
          label="Tên danh mục"
          value={name}
          onChange={(val) => setName(val)}
          placeholder="Nhập tên danh mục"
        />
        <div className="mt-4 flex justify-end gap-2">
          <CommonButton
            onClick={onClose}
            className="rounded-full border px-4"
            variant="outline"
          >
            Hủy
          </CommonButton>
          <CommonButton
            onClick={handleCreate}
            disabled={loading}
            className="bg-primary rounded-full px-4 text-white"
          >
            {loading ? "Đang tạo..." : "Tạo"}
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
