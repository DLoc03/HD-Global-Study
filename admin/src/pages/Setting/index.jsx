import CommonAlert from "@/components/common/CommonAlert";
import CommonButton from "@/components/common/CommonButton";
import CommonFormPopup from "@/components/common/CommonFormPopup";
import CommonInput from "@/components/common/CommonInput";
import { useApi } from "@/config/api";
import React, { useState } from "react";

function Setting() {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState("username");
  const [alert, setAlert] = useState(null);

  const { post, put } = useApi();

  const [username, setUsername] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleOpen = (type) => {
    setFormType(type);
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      let res;
      if (formType === "username") {
        res = await put("/auth/change-username", { new_username: username });
      } else {
        res = await post("/auth/change-password", {
          old_password: oldPassword,
          new_password: newPassword,
        });
      }
      if (res?.success) {
        setAlert({
          type: "success",
          message: res.message,
        });
        setTimeout(() => {
          setOpen(false);
        }, [500]);
        setUsername(null);
        setNewPassword(null);
        setOldPassword(null);
      } else {
        setAlert({
          type: "error",
          message: res.message,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-white px-4 py-6">
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <h1 className="text-xl">Cập nhật tài khoản quản trị viên</h1>
      <div className="mb-4 border-b border-gray-200" />
      <div className="flex max-w-md items-center justify-between gap-2">
        <p className="text-sm">Cập nhật tên đăng nhập?</p>
        <CommonButton
          className={
            "bg-primary hover:bg-light w-[200px] rounded-full text-sm text-white"
          }
          onClick={() => handleOpen("username")}
        >
          Cập nhật ngay
        </CommonButton>
      </div>
      <div className="flex max-w-md items-center justify-between gap-2">
        <p className="text-sm">Cập nhật mật khẩu đăng nhập?</p>
        <CommonButton
          className={
            "bg-primary hover:bg-light w-[200px] rounded-full text-sm text-white"
          }
          onClick={() => handleOpen("password")}
        >
          Cập nhật ngay
        </CommonButton>
      </div>
      <CommonFormPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        title={
          formType === "username"
            ? "Cập nhật tên đăng nhập"
            : "Cập nhật mật khẩu đăng nhập"
        }
        footer={
          <>
            <CommonButton
              onClick={() => setOpen(false)}
              className="w-[60px] rounded-full bg-gray-300 text-black"
            >
              Huỷ
            </CommonButton>
            <CommonButton
              onClick={handleSubmit}
              className="bg-primary w-[60px] rounded-full text-white"
            >
              Lưu
            </CommonButton>
          </>
        }
      >
        {formType === "username" ? (
          <CommonInput
            label="Nhập tên đăng nhập mới"
            value={username}
            onChange={(val) => setUsername(val)}
            required
          />
        ) : (
          <div className="flex flex-col gap-2">
            <CommonInput
              label="Nhập mật khẩu cũ"
              value={oldPassword}
              onChange={(val) => setOldPassword(val)}
              required
            />
            <CommonInput
              label="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(val) => setNewPassword(val)}
              required
            />
          </div>
        )}
      </CommonFormPopup>
    </div>
  );
}

export default Setting;
