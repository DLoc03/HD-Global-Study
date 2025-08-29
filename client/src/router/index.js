import { PATHS } from "@/constants";
import About from "@/pages/About";
import Advantage from "@/pages/Advantage";
import Blog from "@/pages/Blogs";
import Gallery from "@/pages/Gallery";

import Home from "@/pages/Home";
import Service from "@/pages/Services";

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
];

export { routes };
