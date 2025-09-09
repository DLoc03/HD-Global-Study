import banner_1 from "@assets/banner/banner_1.png";
import banner_2 from "@assets/banner/banner_2.png";
import banner_3 from "@assets/banner/banner_3.png";
import banner_4 from "@assets/banner/banner_4.png";
import banner_5 from "@assets/banner/banner_5.png";

import nguyenlongdien from "@assets/photos/nguyen_long_dien.jpg";
import elizabeth from "@assets/photos/elizabeth.jpg";
import dang_khoa from "@assets/photos/dang_khoa.jpg";
import nam_truong from "@assets/photos/nam_truong.jpg";
import quang_linh from "@assets/photos/quang_linh.jpeg";
import thuy_linh from "@assets/photos/thuy_linh.jpeg";

import school from "@assets/photos/school.png";
import profile from "@assets/photos/profile.png";
import airplane from "@assets/photos/airplane.png";
import smile from "@assets/photos/smiling-face.png";

import content_1 from "@assets/photos/content_1.jpg";
import content_2 from "@assets/photos/content_2.jpg";
import content_3 from "@assets/photos/content_3.jpg";

const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  SERVICE: "/service",
  SERVICE_DETAIL: "/service/:slug",
  ADVANTAGE: "/why-choose-hd-global-study",
  BLOG: "/blogs",
  BLOG_CONTENT: "/blogs/:slug",
  GALLERY: "/gallery",
  IMAGE_LIST: "/gallery/:id",
  CONTACT: "/contact",
  REAL_STORY: "/real-life-in-american",
};

const CONTACT = {
  EMAIL: `mailto:nguyenlongdien@gmail.com?subject=${encodeURIComponent("Liên hệ tư vấn dịch vụ du học")}&body=${encodeURIComponent("Xin chào,")}`,
  AMERICAN_ADDRESS: "https://maps.app.goo.gl/89jeHswauuitovP87",
  VIETNAME_ADDRESS: "https://maps.app.goo.gl/LGyXVvRVcHbLJRUg6",
  PHONE_1: "tel:+17028208711",
  PHONE_2: "tel:+84908064656",
  FACEBOOK: "https://www.facebook.com/people/HD-GLobal-Study/61579047725784/",
};

const BANNER_MAP = [
  {
    name: "banner_1",
    src: banner_1,
    title: "Khởi đầu hành trình du học",
    subtitle: "Tương lai rộng mở đang chờ bạn",
  },
  {
    name: "banner_2",
    src: banner_2,
    title: "Trải nghiệm dịch vụ tốt nhất",
    subtitle: "Hỗ trợ toàn diện từ A đến Z",
  },
  {
    name: "banner_3",
    src: banner_3,
    title: "Lợi thế vượt trội",
    subtitle: "Đối tác tin cậy toàn cầu",
  },
  {
    name: "banner_4",
    src: banner_4,
    title: "Câu chuyện thực tế",
    subtitle: "Học viên chia sẻ trải nghiệm tại Mỹ",
  },
  {
    name: "banner_5",
    src: banner_5,
    title: "Kết nối cùng HD Global Study",
  },
];

const IMAGE_MAP = {
  elizabeth,
  nguyenlongdien,
  quang_linh,
  thuy_linh,
  dang_khoa,
  nam_truong,
  school,
  airplane,
  smile,
  profile,
  content_1,
  content_2,
  content_3,
};

const USER_MAP = [
  {
    name: "dang_khoa",
    src: dang_khoa,
    title: "Hành trình du học Mỹ của ĐĂNG KHOA",
    subtitle: "Golden West College in Huntington Beach, California.",
  },
  {
    name: "nam_truong",
    src: nam_truong,
    title: "Hành trình du học Mỹ của TRƯƠNG VIẾT NAM",
    subtitle: "Liberty Christian School  in Huntington Beach, California.",
  },
];

const MENU_MAP = [
  {
    path: PATHS.HOME,
    name: "Trang chủ",
  },
  {
    path: PATHS.ABOUT,
    name: "Giới thiệu",
  },
  {
    path: PATHS.SERVICE,
    name: "Dịch vụ tư vấn",
  },
  {
    path: PATHS.ADVANTAGE,
    name: "Tại sao chọn HD Global Study",
  },
  {
    path: PATHS.BLOG,
    name: "Blogs",
  },
  {
    path: PATHS.GALLERY,
    name: "Thư viện",
  },
];

export { PATHS, CONTACT, BANNER_MAP, IMAGE_MAP, USER_MAP, MENU_MAP };
