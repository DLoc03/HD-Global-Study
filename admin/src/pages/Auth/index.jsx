import CommonAlert from "@/components/common/CommonAlert";
import CommonButton from "@/components/common/CommonButton";
import CommonInput from "@/components/common/CommonInput";
import { useAuth } from "@/config/api";
import { PATHS } from "@/constants";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import React, { useState } from "react";

import logo from "@assets/logo.jpg";

function Auth() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { login } = useAuth();
  const navigate = useCommonNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await login(formData);
      if (res.success) {
        setAlert({
          type: "success",
          message: "Đăng nhập thành công",
        });
        setTimeout(() => {
          navigate(PATHS.BLOG);
        }, [1500]);
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
    <div className="flex h-screen w-full items-center justify-center p-2 md:p-0">
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="shadow-main flex w-full max-w-md flex-col items-center gap-4 rounded-xl p-4">
        <img
          src={logo}
          alt="logo"
          className="h-[60px] w-[60px] rounded-full object-cover"
        />
        <h1 className="text-primary text-xl font-bold">
          Đăng nhập quản trị viên
        </h1>
        <CommonInput
          label="Tên đăng nhập"
          placeholder="Nhập tên đăng nhập"
          value={formData.username}
          onChange={(val) => handleChange("username", val)}
          className="w-full"
        />
        <CommonInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          value={formData.password}
          onChange={(val) => handleChange("password", val)}
          className="w-full"
          type="password"
        />
        <CommonButton
          className="bg-primary mt-4 w-full max-w-full rounded-full text-white"
          onClick={handleSubmit}
        >
          Đăng nhập
        </CommonButton>
      </div>
    </div>
  );
}

export default Auth;
