import React, { useEffect, useState } from "react";

import ContactForm from "@/components/common/ContactForm";
import GuestReviews from "@/components/ui/GuestReviews";
import { usePosts } from "@/hooks/usePost";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import SpinningLoading from "@/components/common/SpinningLoading";
import BlogCard from "@/components/common/BlogCard";
import CommonFadeContainer from "@/components/common/CommonFadeContainer";
import CommonFade from "@/components/common/CommonFade";

function Service() {
  const [page, setPage] = useState(1);
  const { posts, total, loading, error, getAll } = usePosts();

  useEffect(() => {
    getAll(page, 6, "DESC", "published", 2);
  }, [page, getAll]);

  return (
    <CommonFadeContainer
      stagger={0.2}
      className="flex w-full flex-col items-center gap-4"
    >
      {loading && <SpinningLoading />}
      <CommonFade>
        <h1 className="text-primary text-center text-3xl font-bold md:text-4xl">
          HD Global Studies – Luôn đồng hành cùng bạn
        </h1>
      </CommonFade>
      <CommonFade>
        <p className="max-w-5xl text-center">
          Mỗi bước tiến, mỗi thành công của học sinh không chỉ là niềm vui, mà
          còn là động lực để HD Global Studies tiếp tục sứ mệnh luôn đồng hành
          chắp cánh ước mơ Mỹ. Chúng tôi tin rằng, với tri thức và sự hội nhập,
          thế hệ trẻ Việt Nam sẽ vươn xa, tự tin khẳng định mình trên hành trình
          chinh phục thế giới.
        </p>
      </CommonFade>
      <CommonFadeContainer
        stagger={0.2}
        className="mt-2 grid w-full grid-cols-4 gap-8"
      >
        {posts?.items?.length > 0 ? (
          posts?.items?.map((blog) => (
            <CommonFade
              className="col-span-4 md:col-span-2 xl:col-span-1"
              key={blog.id}
            >
              <BlogCard blog={blog} />
            </CommonFade>
          ))
        ) : (
          <CommonFade className="col-span-4 w-full">
            <h1 className="text-center text-sm text-gray-400">
              Hiện chưa có bài viết nào
            </h1>
          </CommonFade>
        )}
      </CommonFadeContainer>

      {/* Pagination */}
      <CommonFade className="mt-4 flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          <IoIosArrowBack />
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          disabled={page * 32 >= total}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          <IoIosArrowForward />
        </button>
      </CommonFade>
      <GuestReviews />
      <ContactForm />
    </CommonFadeContainer>
  );
}

export default Service;
