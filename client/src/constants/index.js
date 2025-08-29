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

const PATHS = {
  HOME: "/",
  ABOUT: "/about",
  SERVICE: "/service",
  ADVANTAGE: "/why-choose-hd-global-study",
  GUEST_RATING: "/guest-rating",
  GALLERY: "/gallery",
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
    title: "Kết nối cùng chúng tôi",
  },
];

const IMAGE_MAP = {
  elizabeth,
  nguyenlongdien,
  quang_linh,
  thuy_linh,
  dang_khoa,
  nam_truong,
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
    title: "Hành trình du học Mỹ của NAM TRƯƠNG",
    subtitle: "Liberty Christian School  in Huntington Beach, California.",
  },
];

export { PATHS, CONTACT, BANNER_MAP, IMAGE_MAP, USER_MAP };
