import { App } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import { whiteNameList } from "./constant";
import outsideLayout from "./outsideLayout";
import { createRouterGuards } from "./router-guards";

export const routes: Array<RouteRecordRaw> = [
  /** 路由 */
  // {
  //   path: "/",
  //   name: "Layout",
  //   component: HomeView,
  // },
  {
    path: "/",
    name: "Layout",
    redirect: "/dashboard/welcome",
    component: () => import("@/layout/index.vue"),
    meta: {
      title: "首页",
    },
    children: [],
  },
  ...outsideLayout,
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

export const router = createRouter({
  // process.env.BASE_URL
  history: createWebHistory(""),
  routes,
});

/** 重置路由器 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    /*** 不是空路由 */
    if (name && !whiteNameList.some((n) => n === name)) {
      /** hasRoute: 用于判断路由是否存在，hasRoute接收一个name字符串，返回一个boolean值 */
      /** removeRoute： 删除路由 */
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export async function setupRouter(app: App) {
  //创建路由守卫
  createRouterGuards(router, whiteNameList);
  app.use(router);
  await router.isReady();
}

export default router;
