import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { TextAlign } from "@tiptap/extension-text-align";

function MenuBar({ editor, onSave }) {
  if (!editor) return null;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-wrap gap-2 border-b p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="rounded border px-2 py-1 font-bold"
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="rounded border px-2 py-1 italic"
      >
        i
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="rounded border px-2 py-1 underline"
      >
        U
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className="rounded border px-2 py-1 line-through"
      >
        S
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className="rounded border px-2 py-1"
      >
        ⬅️
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className="rounded border px-2 py-1"
      >
        ⬆️
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className="rounded border px-2 py-1"
      >
        ➡️
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className="rounded border px-2 py-1"
      >
        ☰
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="rounded border px-2 py-1"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="rounded border px-2 py-1"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="rounded border px-2 py-1"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="rounded border px-2 py-1"
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="rounded border px-2 py-1"
      >
        “ ”
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="rounded border px-2 py-1 font-mono"
      >
        {"</>"}
      </button>

      <label className="cursor-pointer rounded border px-2 py-1">
        📷
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </label>

      {onSave && (
        <button
          onClick={() => onSave(editor.getHTML())}
          className="ml-auto rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
        >
          Lưu
        </button>
      )}
    </div>
  );
}

export default function RichTextEditor({ onSave }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Soạn thảo nội dung ở đây...</p>",
  });

  return (
    <div className="rounded-lg border p-2 shadow">
      <MenuBar editor={editor} onSave={onSave} />
      <EditorContent
        editor={editor}
        className="prose min-h-[200px] max-w-none p-2"
      />
    </div>
  );
}
