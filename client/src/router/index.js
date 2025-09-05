import { PATHS } from "@/constants";
import About from "@/pages/About";
import Advantage from "@/pages/Advantage";
import Blog from "@/pages/Blogs";
import BlogContent from "@/pages/Blogs/_id";
import Gallery from "@/pages/Gallery";
import AlbumDetail from "@/pages/Gallery/_id";

import Home from "@/pages/Home";
import Service from "@/pages/Services";
import ServiceDetail from "@/pages/Services/_id";

const routes = [
  {
    path: PATHS.HOME,
    page: Home,
  },
  {
    path: PATHS.ABOUT,
    page: About,
  },
  {
    path: PATHS.SERVICE,
    page: Service,
  },
  {
    path: PATHS.SERVICE_DETAIL,
    page: ServiceDetail,
  },
  {
    path: PATHS.ADVANTAGE,
    page: Advantage,
  },
  {
    path: PATHS.BLOG,
    page: Blog,
  },
  {
    path: PATHS.GALLERY,
    page: Gallery,
  },
  {
    path: PATHS.BLOG_CONTENT,
    page: BlogContent,
  },
  {
    path: PATHS.IMAGE_LIST,
    page: AlbumDetail,
  },
];

export { routes };
