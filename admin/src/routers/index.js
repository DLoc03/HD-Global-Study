import { PATHS } from "@/constants";
import Blog from "@/pages/Blog";
import Dashboard from "@/pages/Dashboard";
import Gallery from "@/pages/Gallery";
import Service from "@/pages/Service";

const routes = [
  {
    path: PATHS.DASHBOARD,
    page: Dashboard,
  },
  {
    path: PATHS.BLOG,
    page: Blog,
  },
  {
    path: PATHS.SERVICE,
    page: Service,
  },
  {
    path: PATHS.GALLERY,
    page: Gallery,
  },
];

export { routes };
