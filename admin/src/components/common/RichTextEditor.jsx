import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

// Core & theme
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver/theme";
import "tinymce/models/dom/model";

// Skins (UI)
import "tinymce/skins/ui/oxide/skin.min.css";

// Plugins
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
import CommonButton from "./CommonButton";

export default function RichTextEditor({ initialValue = "", onChange }) {
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onChange?.(newContent);
  };

  return (
    <div className="w-full">
      <Editor
        value={content}
        onEditorChange={handleEditorChange}
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
            "undo redo | blocks | " +
            "bold italic underline strikethrough forecolor backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | " +
            "link image table | removeformat | code fullscreen preview help",
          skin: false,
          content_css: false,
        }}
      />
    </div>
  );
}
