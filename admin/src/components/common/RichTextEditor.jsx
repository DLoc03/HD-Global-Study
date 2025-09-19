import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver/theme";
import "tinymce/models/dom/model";
import "tinymce/skins/ui/oxide/skin.min.css";

import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";

export default function RichTextEditor({ initialValue = "", onChange }) {
  const [content, setContent] = useState(initialValue);
  const editorRef = useRef(null);

  useEffect(() => setContent(initialValue), [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onChange?.(newContent);
  };

  return (
    <div className="w-full">
      <Editor
        value={content}
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          license_key: "gpl",
          base_url: "/tinymce",
          suffix: ".min",
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code fullscreen preview | image",
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === "image") {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              input.onchange = function () {
                const file = this.files[0];
                const reader = new FileReader();

                reader.onload = function (e) {
                  const img = new Image();
                  img.src = e.target.result;

                  img.onload = function () {
                    const MAX_WIDTH = 600;
                    let width = img.width;
                    let height = img.height;

                    if (width > MAX_WIDTH) {
                      height = (height / width) * MAX_WIDTH;
                      width = MAX_WIDTH;
                    }

                    const canvas = document.createElement("canvas");
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    const resizedBase64 = canvas.toDataURL(file.type, 0.8);
                    callback(resizedBase64, { alt: file.name });
                  };
                };

                reader.readAsDataURL(file);
              };

              input.click();
            }
          },
        }}
      />
    </div>
  );
}
