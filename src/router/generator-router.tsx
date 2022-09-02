import { isUrl } from "@/utils/is";
import { Result } from "ant-design-vue";
import { isRuntimeOnly } from "vue";
import { RouteRecordRaw, RouterView } from "vue-router";
import router, { routes } from ".";
import { REDIRECT_ROUTE } from "./staticModules/besidesLayout";
import { errorRoute, notFound } from "./staticModules/error";
import NotFound from "@/views/error/404.vue";
import { constantRouterComponents } from "./asyncModules";
import { PermissionType } from "@/core/permission/modules/types";
import common from "@/router/staticModules";
import { uniqueSlash } from "@/utils/urlUtils";
import outsideLayout from "./outsideLayout";

//需要放在所有路由之后的路由
const endRoutes: RouteRecordRaw[] = [REDIRECT_ROUTE, errorRoute, notFound];

export function filterAsyncRoute(
  routes: API.Menu[],
  parentRoute: API.Menu | null = null,
  lastNamePath: string[] = []
): RouteRecordRaw[] {
  return routes
    .filter(
      (item) =>
        item.type !== 2 && item.isShow && item.parentId == parentRoute?.id
    )
    .map((item) => {
      const { router, viewPath, name, icon, orderNum, keepalive } = item;
      let fullPath = "";
      /** lastNamePath.at(-1):用于获取最后的字符串 */
      // const pathPrefix = lastNamePath.at(-1) || "";
      const pathPrefix = lastNamePath[lastNamePath.length - 1] || "";

      // console.log(lastNamePath.at(-1), lastNamePath[-1]);

      if (isUrl(router)) {
        fullPath = router;
      } else {
        fullPath = router.startsWith("/") ? router : `/${router}`;
        fullPath = router.startsWith(pathPrefix)
          ? fullPath
          : pathPrefix + fullPath;
        /** new Set数组去重 */
        fullPath = [...new Set(uniqueSlash(fullPath).split("/"))].join("/");
      }
      let realRoutePath = router;
      if (parentRoute) {
        if (fullPath.startsWith(parentRoute?.router)) {
          realRoutePath = fullPath.split(parentRoute.router)[1];
        } else if (!isUrl(parentRoute.router) && !isUrl(router)) {
          realRoutePath = router;
        }
      }
      realRoutePath = realRoutePath.startsWith("/")
        ? realRoutePath.slice(1)
        : realRoutePath;
      const route: Partial<RouteRecordRaw> = {
        path: realRoutePath,
        // name: `${viewPath ? toHump(viewPath) : fullPath}-${item.id}`,
        name: fullPath,
        meta: {
          orderNum,
          title: name,
          type: item.type,
          perms: [],
          icon,
          namePath: lastNamePath.concat(fullPath),
          keepAlive: keepalive,
        },
      };

      //如果是目录
      if (item.type === 0) {
        const children = filterAsyncRoute(
          routes,
          item,
          lastNamePath.concat(fullPath)
        );
        if (children?.length) {
          route.component = RouterView;
          route.children = children;
          route.redirect = { name: children[0].name };
        } else {
          route.component = (
            <Result
              status="500"
              title={name}
              sub-title="目录类型菜单不是真实页面，请为当前目录添加野蛮级子菜单或更改当前菜单类型。"
            />
          );
        }
        return route;
      } else if (item.type === 1) {
        const Component = constantRouterComponents[viewPath] || NotFound;
        route.component = Component;
        const perms = routes
          .filter((n) => n.parentId === item.id)
          .flatMap((n) => n.perms?.split(","));
        if (route.meta && perms) {
          /** 设置当前页面所拥有的权限 */
          route.meta.perms = perms as PermissionType[];
        }
        return route;
      }
      return undefined;
    })
    .filter((item): item is RouteRecordRaw => !!item);
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = (asyncMenus: API.Menu[]) => {
  try {
    const routeList = filterAsyncRoute(asyncMenus);
    // ！：将变量转换为boolean类型，并取反
    // ！！：做类型判断，例如：if(!!a){//a 有值的时候才执行}
    const layout = routes.find((item) => item.name === "Layout")!;
    // 给公共路由添加namePath
    generatorNamePath(common);
    const menus = [...common, ...routeList, ...endRoutes];
    layout.children = menus;
    const removeRoute = router.addRoute(layout);
    /** 获取所有没有包含children的路由，上面addRoute的时候，vue-router已经帮我们拍平了所有路由 */
    const filterRoutes = router
      .getRoutes()
      .filter(
        (item) =>
          (!item.children.length ||
            Object.is(item.meta?.hideChildrenInMenu, true)) &&
          !outsideLayout.some((n) => n.name === item.name)
      );
    /** 清空所有路由 */
    removeRoute();
    layout.children = [...filterRoutes];
    /** 重新添加拍平后的路由 */
    router.addRoute(layout);
    console.log("所有路由", router.getRoutes());
    return Promise.resolve({
      menus,
      routes: layout.children,
    });
  } catch (error) {
    console.error("生成路由时出错", error);
    /** 返回错误原因 */
    return Promise.reject(`生成路由时出错: ${error}`);
  }
};

/**
 * 主要方便控制a-menu的open-keys，即控制左侧菜单应当展开那些菜单
 * @param {RouteRecordRaw[]} routers 需要添加namePath的路由
 * @param {string[]} namePath
 */
export const generatorNamePath = (
  routers: RouteRecordRaw[],
  namePath?: string[],
  parent?: RouteRecordRaw
) => {
  routes.forEach((item) => {
    if (item.meta && typeof item.name === "string") {
      item.meta.namePath = Array.isArray(namePath)
        ? namePath.concat(item.name)
        : [item.name];
      item.meta.fullPath = parent?.meta?.fullPath;
    }
  });
};
