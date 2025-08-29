const convertDateTime = (date) => {
  return new Date(date).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};

const validateForm = (formData) => {};

export { convertDateTime };
