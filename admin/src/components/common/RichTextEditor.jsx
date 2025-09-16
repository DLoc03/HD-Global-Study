import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useApi } from "@/config/api";

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
import SpinningLoading from "./SpinningLoading";

export default function RichTextEditor({ initialValue = "", onChange }) {
  const [content, setContent] = useState(initialValue);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editorCallback, setEditorCallback] = useState(null);
  const { get, loading } = useApi();
  const editorRef = useRef(null);

  useEffect(() => setContent(initialValue), [initialValue]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    onChange?.(newContent);
  };

  const fetchAlbums = async () => {
    try {
      const res = await get("/album/getAll");
      if (res.success) setAlbums(res.items);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAlbumImages = async (albumId) => {
    try {
      const res = await get(`/image/byAlbum?album_id=${albumId}`);
      if (res.success) setAlbumImages(res.items);
    } catch (err) {
      console.error(err);
    }
  };

  const openAlbum = (album) => {
    setSelectedAlbum(album);
    fetchAlbumImages(album.id);
  };

  const insertImage = (url) => {
    const editor = editorRef.current;
    if (editor) {
      editor.insertContent(`<img src="${url}" />`);
      setShowModal(false);
      setSelectedAlbum(null);
    }
  };

  return (
    <div className="w-full">
      <Editor
        value={content}
        tabIndex={-10}
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          license_key: "gpl",
          base_url: "/admin/tinymce",
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
            "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | code fullscreen preview | selectImage",

          setup: (editor) => {
            editorRef.current = editor;

            editor.ui.registry.addButton("selectImage", {
              text: "Chọn ảnh từ Album",
              icon: "image",
              onAction: () => {
                fetchAlbums();
                setShowModal(true);
              },
            });
          },
          image_title: true,
          file_picker_types: "image",
          automatic_uploads: false,
          file_picker_callback: (callback, value, meta) => {
            setEditorCallback(() => callback);
            fetchAlbums();
            setShowModal(true);
            if (meta.filetype === "image") {
              return false;
            }
          },
        }}
      />

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="z-[10000] max-h-[80vh] w-3/4 overflow-y-auto rounded bg-white p-4">
            {!selectedAlbum ? (
              <>
                <h3 className="mb-2 font-bold">Chọn album</h3>
                <div className="grid grid-cols-3 gap-2">
                  {albums.map((alb) => (
                    <div
                      key={alb.id}
                      className="cursor-pointer rounded-full border-2 border-gray-200 p-2 text-center"
                      onClick={() => openAlbum(alb)}
                    >
                      Album {alb.title || alb.name || `Album ${alb.id}`}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="mb-2 font-bold">
                  {selectedAlbum.title || selectedAlbum.name} - Chọn ảnh
                </h3>
                <div className="my-8 grid grid-cols-3 gap-2">
                  {loading ? (
                    <div className="col-span-3">
                      <SpinningLoading />
                    </div>
                  ) : albumImages.length > 0 ? (
                    albumImages.map((img) => (
                      <img
                        key={img.id}
                        src={img.image_data}
                        alt={img.name || ""}
                        className="hover:border-primary col-span-1 cursor-pointer border p-1"
                        onClick={() => insertImage(img.image_data)}
                      />
                    ))
                  ) : (
                    <h1 className="text-sm text-gray-400">
                      Hiện album này không có ảnh
                    </h1>
                  )}
                </div>
                <button
                  className="mt-2 rounded bg-gray-200 p-2"
                  onClick={() => setSelectedAlbum(null)}
                >
                  Quay lại album
                </button>
              </>
            )}

            <button
              className="mt-2 ml-4 rounded bg-gray-200 p-2"
              onClick={() => {
                setShowModal(false);
                setSelectedAlbum(null);
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
