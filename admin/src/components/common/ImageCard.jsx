import React, { useEffect, useRef, useState } from "react";

import { IoMdMore } from "react-icons/io";
import ImageOverview from "./ImageOverview";
import CommonFormPopup from "./CommonFormPopup";
import CommonButton from "./CommonButton";
import CommonAlert from "./CommonAlert";
import { useApi } from "@/config/api";

function ImageCard({ image, isShowHide = true, onReload }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});
  const [selectedImage, setSelectedImage] = useState();
  const [openImage, setOpenImage] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState();
  const [alert, setAlert] = useState();

  const [albums, setAlbums] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState();

  const { post, del, get, put, loading } = useApi();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openMenuId &&
        menuRefs.current[openMenuId] &&
        !menuRefs.current[openMenuId].contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleOpenView = (image) => {
    setSelectedImage(image);
    setOpenImage(true);
  };

  const handleOpenHide = (id) => {
    setFormType("hide");
    setOpenForm(true);
    setSelectedImage(id);
  };

  const handleOpenDelete = (id) => {
    setFormType("delete");
    setOpenForm(true);
    setSelectedImage(id);
  };

  const handleOpenMove = async (image) => {
    setFormType("move");
    setOpenForm(true);
    setSelectedImage(image?.id);

    try {
      const res = await get("/album/getAll");
      if (res?.success) setAlbums(res.items);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMove = async () => {
    if (!selectedAlbumId) return;
    try {
      const res = await put("/image/move", {
        id: selectedImage,
        album_id: selectedAlbumId,
      });
      if (res?.success) {
        setAlert({ type: "success", message: res.message });
        setTimeout(() => setOpenForm(false), 500);
        onReload?.();
      } else {
        setAlert({ type: "error", message: res.message });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateStatus = async (id, isHide) => {
    try {
      const res = await post(
        `/image/updateStatus?id=${id}&status=${isHide ? "draft" : "published"}`,
      );
      if (res?.success) {
        setAlert({
          type: "success",
          message: res.message,
        });
        setTimeout(() => {
          setOpenForm(false);
        }, 500);
        onReload?.();
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

  const handleDelete = async () => {
    try {
      const res = await del(`/image/delete?id=${selectedImage}`);
      if (res?.success) {
        setAlert({ type: "success", message: res.message });
        setTimeout(() => {
          setOpenForm(false);
        }, 500);
        onReload?.();
      } else {
        setAlert({ type: "error", message: res.message });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="shadow-main flex h-[220px] flex-col gap-4 rounded-xl bg-white p-4"
      ref={(el) => (menuRefs.current[image?.id] = el)}
    >
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <img
        src={image?.image_data}
        alt={image?.title}
        className="max-h-[140px] min-h-[140px] w-full cursor-pointer rounded-xl object-cover"
        onClick={() => handleOpenView(image)}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-primary line-clamp-1 max-w-[100px] text-sm overflow-ellipsis">
          {image?.title}
        </h1>
        <IoMdMore
          fontSize={"22px"}
          className="relative cursor-pointer hover:text-amber-500"
          onClick={() => toggleMenu(image?.id)}
        />
      </div>
      {openMenuId === image?.id && (
        <div className="shadow-main absolute mt-46 ml-40 w-40 rounded-lg bg-white">
          <ul>
            <li
              onClick={() => handleOpenMove(image)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              Thay đổi album
            </li>

            <li
              onClick={
                isShowHide
                  ? () => handleOpenHide(image?.id)
                  : () => handleUpdateStatus(image?.id, false)
              }
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              {isShowHide ? "Ẩn hiển thị" : "Hiển thị"}
            </li>

            <li
              onClick={() => handleOpenDelete(image?.id)}
              className="cursor-pointer px-4 py-2 text-red-500 hover:bg-red-100"
            >
              Xoá
            </li>
          </ul>
        </div>
      )}
      <ImageOverview
        image={selectedImage}
        open={openImage}
        onClose={() => setOpenImage(false)}
      />
      <CommonFormPopup
        title={
          formType === "hide"
            ? "Bạn có chắc muốn ẩn bức ảnh này?"
            : "Bạn có chắc muốn xoá bức ảnh này"
        }
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
        className={"max-w-sm"}
        footer={
          <>
            <CommonButton
              className="bg-primary w-full rounded-full text-white"
              onClick={
                formType === "hide"
                  ? () => handleUpdateStatus(selectedImage, true)
                  : formType === "delete"
                    ? handleDelete
                    : formType === "move"
                      ? handleMove
                      : null
              }
            >
              {formType === "hide"
                ? "Ẩn"
                : formType === "delete"
                  ? "Xoá"
                  : formType === "move"
                    ? "Di chuyển"
                    : ""}
            </CommonButton>

            <CommonButton
              className={
                "border-primary text-primary w-full rounded-full border"
              }
              onClick={() => setOpenForm(false)}
            >
              Huỷ
            </CommonButton>
          </>
        }
      >
        {formType === "move" && (
          <div className="flex flex-col gap-2">
            <label>Chọn album mới</label>
            <select
              className="rounded-md border p-2"
              value={selectedAlbumId || ""}
              onChange={(e) => setSelectedAlbumId(Number(e.target.value))}
            >
              <option value="">-- Chọn album --</option>
              {albums.map((album) => (
                <option key={album?.id} value={album?.id}>
                  {album.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </CommonFormPopup>
    </div>
  );
}

export default ImageCard;
