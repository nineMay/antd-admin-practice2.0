import { RouteRecordRaw, RouterView } from "vue-router";
import LayoutParentView from "@/layout/routerView/index.vue";
import { PAGE_NOT_FOUND_NAME } from "../constant";

const moduleName = "error";
export const errorRoute: RouteRecordRaw = {
  path: "error",
  name: moduleName,
  /** redirect: 重定向到一个新的指定url */
  redirect: "/error/404",
  component: LayoutParentView,
  meta: {
    title: "错误页",
    icon: "EditOutlined",
    /** 不在菜单中显示 */
    hideInMenu: true,
    /** 不在标签页tabs中显示 */
    hideInTabs: true,
  },
  children: [
    {
      path: "404",
      name: PAGE_NOT_FOUND_NAME,
      meta: {
        title: "404",
        icon: "UserOutlined",
        hideInMenu: true,
      },
      component: () => import("@/views/error/404.vue"),
    },
  ],
};

export const notFound: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  meta: {
    title: "NotFound",
    hideInMenu: true,
    hideInTabs: true,
  },
  redirect: "/error/404",
  children: [],
  component: () =>
    import(/* webpackChunkName: "404" */ "@/views/error/404.vue"),
};
