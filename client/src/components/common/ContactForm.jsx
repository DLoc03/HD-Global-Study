import React, { useEffect, useState } from "react";

import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { SlPaperPlane } from "react-icons/sl";

import { services } from "@/datas/services.json";

import { CONTACT } from "@/constants";

import CommonInput from "./CommonInput";
import CommonSelectInput from "./CommonSelectInput";
import CommonTextAutoSize from "./CommonTextAutoSize";
import CommonButton from "./CommonButton";
import CommonAlert from "./CommonAlert";

const validateForm = (formData, requiredFields = []) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!formData[field] || formData[field].toString().trim() === "") {
      errors[field] = "Ô này là này là bắt buộc";
    }
  });

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Email không hợp lệ";
  }

  return errors;
};

function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const errs = validateForm(formData, ["name", "email", "service"]);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setAlert({
        type: "error",
        message: "Vui lòng điền đầy đủ thông tin.",
      });
      return;
    }

    setAlert({
      type: "success",
      message: "Gửi thành công!",
    });
    console.log("Form now: ", formData);
  };
  return (
    <>
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div
        className={`bg-primary grid w-full grid-cols-2 items-center gap-4 rounded-xl p-4 shadow-md md:p-8`}
      >
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <h1 className="text-center text-2xl font-bold text-white md:text-left md:text-4xl">
            Kết nối với chúng tôi
          </h1>
          <p className="text-md max-w-lg text-center text-white lg:text-left">
            Đồng hành từ bước chuẩn bị đến khi bạn an tâm học tập & sinh sống
            tại Mỹ. Với đội ngũ chuyên gia giàu kinh nghiệm, HD Global Study cam
            kết mang đến giải pháp tối ưu và đáng tin cậy nhất cho hành trình
            của bạn.
          </p>
          <ul className="gap-2 text-white">
            <li>
              <a
                href={CONTACT.EMAIL}
                style={{ display: "flex", gap: "16px", alignItems: "center" }}
              >
                <MdOutlineMail fontSize={"20px"} />
                nguyenlongdien@gmail.com
              </a>
            </li>
            <li>
              <a
                href={CONTACT.PHONE_1}
                style={{ display: "flex", gap: "16px", alignItems: "center" }}
              >
                <FaPhoneAlt fontSize={"20px"} />+ 1 (702) 820-8711
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 flex h-fit w-full flex-col gap-4 rounded-xl bg-white p-4 md:p-8 lg:col-span-1">
          <h1 className="text-primary text-center text-4xl font-medium lg:text-left">
            Giấc mơ Mỹ không còn xa vời
          </h1>
          <CommonInput
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            value={formData.name}
            onChange={(val) => handleChange("name", val)}
            required
          />
          <CommonInput
            label="Email"
            placeholder="Email của bạn"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
          />
          <CommonInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
          />
          <CommonSelectInput
            label="Chọn dịch vụ tư vấn"
            options={services}
            value={formData.service.title}
            onChange={(val) => handleChange("service", val.title)}
          />
          <CommonTextAutoSize
            placeholder="Để lại cho chúng tôi lời nhắn nếu bạn muốn gửi gắm gì đó tại đây nhé"
            value={formData.message}
            onChange={(val) => handleChange("message", val)}
          />
          <CommonButton
            className={"bg-primary w-full rounded-full text-white"}
            onClick={handleSubmit}
          >
            Gửi <SlPaperPlane fontSize={"20px"} color="white" />
          </CommonButton>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
