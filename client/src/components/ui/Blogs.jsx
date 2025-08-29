import React, { useEffect, useState } from "react";

import { blogs } from "@/datas/blogs.json";
import CommonSlider from "../common/CommonSlider";
import BlogCard from "../common/BlogCard";
import useResponsiveItems from "@/contexts/ResponsiveItems";
import CommonButton from "../common/CommonButton";

function Blogs() {
  const itemsPerSlide = useResponsiveItems({ base: 1, md: 2, lg: 2, xl: 4 });

  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    if (blogs) {
      setBlogList(blogs.slice(0, 4));
    }
  }, [blogs]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-primary text-center text-4xl font-bold">Blogs</h1>
      <CommonSlider
        items={blogList.map((blog) => (
          <BlogCard blog={blog} />
        ))}
        itemsPerSlide={itemsPerSlide}
      />
      <CommonButton className={"border-primary w-full rounded-full border-1"}>
        Xem thêm
      </CommonButton>
    </div>
  );
}

export default Blogs;
