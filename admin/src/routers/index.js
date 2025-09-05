import { PATHS } from "@/constants";
import Blog from "@/pages/Blog";
import CreateBlog from "@/pages/Blog/CreateBlog";
import EditBlog from "@/pages/Blog/EditBlog";
import Category from "@/pages/Category";
import Dashboard from "@/pages/Dashboard";
import Gallery from "@/pages/Gallery";
import ImageList from "@/pages/Gallery/_id";
import ImageHiding from "@/pages/Gallery/ImageHiding";
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
    path: PATHS.HIDING_BLOG,
    page: Blog,
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
  {
    path: PATHS.ALBUM_ALL,
    page: Gallery,
  },
  {
    path: PATHS.IMAGE_LIST,
    page: ImageList,
  },
  {
    path: PATHS.HIDING_ALBUM,
    page: Gallery,
  },
  {
    path: PATHS.HIDING_IMAGE,
    page: ImageHiding,
  },
  {
    path: PATHS.CATEGORY,
    page: Category,
  },
];

export { routes };
