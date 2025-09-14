import React, { useEffect, useState } from "react";
import useResponsiveItems from "@/contexts/ResponsiveItems";
import CommonSlider from "../common/CommonSlider";
import ServiceCard from "../common/ServiceCard";
import { IMAGE_MAP, PATHS } from "@/constants";
import CommonFadeContainer from "../common/CommonFadeContainer";
import CommonFade from "../common/CommonFade";
import BlogCard from "../common/BlogCard";
import { usePosts } from "@/hooks/usePost";
import CommonButton from "../common/CommonButton";
import { useCommonNavigate } from "@/contexts/HandleNavigate";

function Services() {
  const itemsPerSlide = useResponsiveItems({ base: 2, md: 4, xl: 8 });
  const [page, setPage] = useState(1);
  const { posts, loading, error, getAll } = usePosts();
  const navigate = useCommonNavigate();

  useEffect(() => {
    getAll(page, 4, "DESC", "published", 2);
  }, [page, getAll]);
  return (
    <CommonFadeContainer
      stagger={0.3}
      className="flex w-full flex-col items-center gap-4"
    >
      <CommonFade>
        <h1 className="text-primary text-center text-4xl font-bold">
          Dịch vụ của HD Global Studies
        </h1>
      </CommonFade>

      <CommonFade>
        <h2 className="text-md max-w-5xl text-center font-light">
          Với đội ngũ chuyên gia giàu kiến thức và kinh nghiệm,{" "}
          <span className="text-primary font-bold">HD Global Studies</span>{" "}
          không chỉ giúp bạn hiện thực hóa giấc mơ vào các trường mong ước, mà
          còn tự tin hòa nhập môi trường đa văn hóa và gặt hái thành công
        </h2>
      </CommonFade>

      <CommonFade>
        <CommonFadeContainer
          stagger={0.2}
          className="grid w-full grid-cols-4 gap-4"
        >
          {posts?.items?.map((blog) => (
            <div
              className="col-span-4 md:col-span-2 xl:col-span-1"
              key={blog.id}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </CommonFadeContainer>
      </CommonFade>
      <CommonFade>
        <CommonButton
          onClick={() => navigate(PATHS.SERVICE)}
          className={"border-primary w-[200px] rounded-full border"}
        >
          Xem thêm
        </CommonButton>
      </CommonFade>
    </CommonFadeContainer>
  );
}

export default Services;
