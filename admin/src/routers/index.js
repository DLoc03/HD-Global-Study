import { PATHS } from "@/constants";
import Auth from "@/pages/Auth";
import Blog from "@/pages/Blog";
import CreateBlog from "@/pages/Blog/CreateBlog";
import EditBlog from "@/pages/Blog/EditBlog";
import Dashboard from "@/pages/Dashboard";
import Gallery from "@/pages/Gallery";
import Service from "@/pages/Service";
import Setting from "@/pages/Setting";

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
  {
    path: PATHS.SETTING,
    page: Setting,
  },
  {
    path: PATHS.CREATE_BLOG,
    page: CreateBlog,
  },
  {
    path: PATHS.EDIT_BLOG,
    page: EditBlog,
  },
];

export { routes };
