import RichTextEditor from "@/components/common/RichTextEditor";
import React from "react";

function Service() {
  const handleSave = (content) => {
    console.log("Nội dung lưu:", content);
  };
  return <RichTextEditor onSave={handleSave} />;
}

export default Service;
