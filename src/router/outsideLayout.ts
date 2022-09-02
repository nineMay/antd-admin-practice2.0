import { RouteRecordRaw } from "vue-router";
import { LOGIN_NAME } from "./constant";

/**
 * layout布局之外的路由
 * RouteRecordRaw为类型校验，限制路由对象类型
 */
export const LoginRoute: RouteRecordRaw = {
  path: "/login",
  name: LOGIN_NAME,
  component: () => import("@/views/login/index.vue"),
  meta: {
    title: "登录",
  },
};

export default [LoginRoute];
