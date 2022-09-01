import { RouteRecordRaw, RouterView } from "vue-router";
import { REDIRECT_NAME } from "../constant";
import LayoutParentView from "@/layout/routerView/index.vue";
import router from "..";
/** 主要用于刷新当前页面 */
export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: "/redirect",
  component: LayoutParentView,
  name: "RedirectTo",
  meta: {
    title: REDIRECT_NAME,
    /** 不在面包屑导航中显示 */
    hideInBreadcrumb: true,
    hideInMenu: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: REDIRECT_NAME,
      component: LayoutParentView,
      meta: {
        title: REDIRECT_NAME,
        /** 不在菜单中显示 */
        hideInMenu: true,
      },
      beforeEnter: (to) => {
        const { params, query } = to;
        const { path, redirectType = "path" } = params;
        /** Reflect.deleteProperty: 用于删除对象上的属性，返回一个bool值，表示是否删除成功
         * 需要两个参数，第一个参数是要删除属性的对象，是目标对象
         * 第二个参数表示要删除的属性名称
         */
        // 这里表示要删除对象params中的_redirect_type属性
        Reflect.deleteProperty(params, "_redirect_type");
        Reflect.deleteProperty(params, "path");

        const _path = Array.isArray(path) ? path.join("/") : path;
        setTimeout(() => {
          if (redirectType === "name") {
            /**
             * router.push(): 导航到指定url，这个方法会向history栈中添加一条心的记录，当点击浏览器后退按钮时，会回到之前的url;
             * router.replace():和router.push()很像，唯一不同的是，他不会向history栈中添加新的记录，而是替换掉当前的history记录
             * router.go():这个方法的参数是一个整数，意思是在history记录中向前进或向后退多少步，类似window.history.go(num)
             */
            router.replace({
              name: _path,
              query,
              params,
            });
          } else {
            router.replace({
              path: _path.startsWith("/") ? _path : `/${_path}`,
              query,
            });
          }
        });
      },
    },
  ],
};
