import CommonButton from "@/components/common/CommonButton";
import { useApi } from "@/config/api";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import CommonBack from "@/components/common/CommonBack";
import SpinningLoading from "@/components/common/SpinningLoading";
import ImageCard from "@/components/common/ImageCard";
import CommonAlert from "@/components/common/CommonAlert";
import { FaPen } from "react-icons/fa";
import CommonFormPopup from "@/components/common/CommonFormPopup";
import CommonInput from "@/components/common/CommonInput";
import { useCommonNavigate } from "@/contexts/HandleNavigate";
import { PATHS } from "@/constants";
import Pagination from "@/components/common/Pagination";

function ImageList() {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [images, setImages] = useState();
  const { get, post, put, del, loading } = useApi();
  const [reload, setReload] = useState(false);

  const [formType, setFormType] = useState();
  const [openForm, setOpenForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const [alert, setAlert] = useState();

  const fileInputRef = useRef(null);

  const [name, setName] = useState();

  const navigate = useCommonNavigate();

  useEffect(() => {
    if (!id) return null;
    const fetchAlbum = async () => {
      try {
        const res = await get(`/album/get?id=${id}`);
        if (res?.success) setAlbum(res.album);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAlbum();
  }, [reload, get, id]);

  useEffect(() => {
    if (!id) return;
    const fetchImages = async () => {
      try {
        const res = await get("/image/list", {
          params: {
            album_id: id,
            page: currentPage,
            limit,
            status: "published",
          },
        });
        setImages({
          items: res.items || [],
          totalPage: res.totalPage || 1,
          currentPage: res.currentPage || 1,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchImages();
  }, [id, get, reload, currentPage]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name)
      setAlert({
        type: "warning",
        message: "Vui lòng nhập tiêu đề cho bức ảnh này!",
      });

    const formData = new FormData();
    formData.append("album_id", id);
    formData.append("title", file.name);
    formData.append("image", file);

    try {
      const res = await post("/image/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.success) {
        setAlert({
          type: "success",
          message: res.message,
        });
        setReload((prev) => !prev);
      } else {
        setAlert({
          type: "error",
          message: res.message,
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: res.message,
      });
    } finally {
      e.target.value = "";
    }
  };

  const handleOpenUpdate = () => {
    setFormType("edit");
    setOpenForm(true);
  };

  const handleOpenHide = () => {
    setFormType("hide");
    setOpenForm(true);
  };

  const handleOpenDelete = () => {
    setFormType("delete");
    setOpenForm(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await put(`/album/update?id=${album?.id}`, {
        name,
      });
      if (res?.success) {
        setAlert({
          type: "success",
          message: res.message,
        });
        setTimeout(() => {
          setOpenForm(false);
        }, 500);
        setReload((prev) => !prev);
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

  const handleHide = async () => {
    try {
      const res = await post(
        `/album/updateStatus?id=${album?.id}&status=draft`,
      );
      if (res?.success) {
        navigate(PATHS.ALBUM_ALL);
        setAlert({
          type: "success",
          message: res.message,
        });
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

  const handleUnhide = async () => {
    try {
      const res = await post(
        `/album/updateStatus?id=${album?.id}&status=published`,
      );
      if (res?.success) {
        navigate(PATHS.ALBUM_ALL);
        setAlert({
          type: "success",
          message: res.message,
        });
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
      const res = await del(`/album/delete?id=${album?.id}`);
      if (res?.success) {
        navigate(PATHS.ALBUM_ALL);
        setAlert({
          type: "success",
          message: res.message,
        });
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
    <div className="flex w-full flex-col gap-4">
      {loading && <SpinningLoading />}
      {alert && (
        <CommonAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <CommonBack />
      <div className="flex items-start justify-between border-b-1 border-gray-200 pb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-primary text-2xl font-bold">{album?.name}</h1>
          {album?.description && (
            <p className="my-2 font-light italic">{album.description}</p>
          )}
          <p className="text-sm text-gray-500">Ngày tạo: {album?.created_at}</p>
          <p className="text-sm text-gray-500">
            Cập nhật lần cuối: {album?.updated_at}
          </p>
          <CommonButton
            className={
              "border-primary text-primary rounded-full border-1 text-sm hover:border-amber-500 hover:text-amber-500"
            }
            onClick={handleOpenUpdate}
          >
            <FaPen />
            Chỉnh sửa
          </CommonButton>
        </div>
        <div className="flex flex-col gap-2">
          <CommonButton
            className={
              "bg-primary hover:bg-light rounded-full px-4 text-sm text-white"
            }
            onClick={handleUploadClick}
          >
            <FaRegPlusSquare />
            Tải lên ảnh mới
          </CommonButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <CommonButton
            className={
              "border-primary text-primary rounded-full border-1 text-sm hover:border-amber-500 hover:text-amber-500"
            }
            onClick={
              album?.status === "published" ? handleOpenHide : handleUnhide
            }
          >
            {album?.status === "published" ? "Ẩn album" : "Hiển thị album"}
          </CommonButton>
          <CommonButton
            className={
              "rounded-full border-1 border-red-500 text-sm text-red-500 hover:border-amber-500 hover:text-amber-500"
            }
            onClick={handleOpenDelete}
          >
            Xoá album
          </CommonButton>
        </div>
      </div>
      <div className="w-full">
        {images?.totalItem === 0 ? (
          <h1 className="text-center text-gray-500">
            Album <span className="font-bold">{album?.name}</span> hiện chưa có
            ảnh
          </h1>
        ) : (
          <div className="grid w-full grid-cols-6 gap-8">
            <h1 className="text-primary text-md col-span-6 text-center">
              Danh sách ảnh album{" "}
              <span className="font-bold">{album?.name}</span>
            </h1>
            {images?.items?.map((image) => (
              <div
                key={image.id}
                className="col-span-6 md:col-span-3 xl:col-span-1"
              >
                <ImageCard image={image} onReload={() => setReload(!reload)} />
              </div>
            ))}
          </div>
        )}
      </div>
      <CommonFormPopup
        title={
          formType === "hide"
            ? "Bạn có chắc muốn ẩn album này?"
            : formType === "delete"
              ? "Bạn có chắc muốn xoá album này? Toàn bộ ảnh trong album đều sẽ bị xoá?"
              : "Chỉnh sửa album"
        }
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
        className={"max-w-sm"}
        footer={
          <>
            <CommonButton
              className={"bg-primary w-full rounded-full text-white"}
              onClick={
                formType === "hide"
                  ? handleHide
                  : formType === "delete"
                    ? handleDelete
                    : handleUpdate
              }
            >
              {formType === "hide"
                ? "Ẩn album"
                : formType === "delete"
                  ? "Xoá album"
                  : "Cập nhật"}
            </CommonButton>
            <CommonButton
              className={"border-primary w-full rounded-full border"}
              onClick={() => setOpenForm(false)}
            >
              Huỷ
            </CommonButton>
          </>
        }
      >
        {formType === "edit" && (
          <CommonInput
            label="Tiêu đề album mới"
            placeholder="Nhập tiêu đề mới"
            value={name}
            onChange={(val) => setName(val)}
          />
        )}
      </CommonFormPopup>
      {images?.totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPage={images.totalPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

export default ImageList;
