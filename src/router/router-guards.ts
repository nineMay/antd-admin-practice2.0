import {
  isNavigationFailure,
  RouteLocationNormalized,
  Router,
} from "vue-router";
import { LOGIN_NAME, REDIRECT_NAME, WhiteNameList } from "./constant";
import NProgress from "nprogress"; // progress bar
import { useUserStore } from "@/store/modules/user";
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";
import { Storage } from "@/utils/Storage";
import { to as _to } from "@/utils/awaitTo";
import { useKeepAliveStore } from "@/store/modules/keepAlive";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const defaultRoutePath = "/datashboard/welcome";
export function createRouterGuards(
  router: Router,
  whiteNameList: WhiteNameList
) {
  /** 全局导航守卫beforeEach和afterEach ,他们会在路由即将改变前和改变后进行触发*/
  /** to: 即将要进入的目标路由对象 */
  /** _:当前导航即将要离开的路由对象 */
  /** next: 调用该方法后，才能进入下一个钩子函数 */
  router.beforeEach(async (to, _, next) => {
    /** 开始进度条 */
    NProgress.start();
    const useStore = useUserStore();
    const token = Storage.get(ACCESS_TOKEN_KEY, null);
    if (token) {
      /**判断即将要进入的是不是登录页 */
      if (to.name === LOGIN_NAME) {
        next({ path: defaultRoutePath });
      } else {
        /** router.hasRoute:用于判断路由是否存在 */
        const hasRoute = router.hasRoute(to.name!);
        if (useStore.menus.length === 0) {
          //从后台获取菜单
          const [err] = await _to(useStore.afterLogin());
          if (err) {
            useStore.resetToken();
            return next({ name: LOGIN_NAME });
          }
          if (!hasRoute) {
            /** 如果该路由不存在，可能是动态注册的路由，它还没准备好，需要再重定向一次到该路由 */
            next({ ...to, replace: true });
          } else {
            next();
          }
        } else {
          next();
        }
      }
    } else {
      //not LOGIN
      if (whiteNameList.some((n) => n === to.name)) {
        next();
      } else {
        next({
          name: LOGIN_NAME,
          query: { redirect: to.fullPath },
          replace: true,
        });
      }
    }
  });

  /** 获取路由对应的组件名称 */
  const getComponentName = (route: RouteLocationNormalized) => {
    return route.matched.find((item) => item.name === route.name)?.components
      ?.default.name;
  };
  router.afterEach((to, from, failure) => {
    const keepAliveStore = useKeepAliveStore();
    const token = Storage.get(ACCESS_TOKEN_KEY, null);

    if (isNavigationFailure(failure)) {
      console.error("failed navigation", failure);
    }
    /**在这里设置需要缓存的组件名称 */
    const toCompName = getComponentName(to);
    /** 判断当前页面是否开启缓存，如果开启，则将当前页面的componentName信息存入keep-alive全局状态 */
    if (to.meta?.keepAlive) {
      /** 需要缓存的组件 */
      if (toCompName) {
        keepAliveStore.add(toCompName);
      } else {
        console.warn(
          `${to.fullPath}页面组件的keepAlive为true但未设置组件名，会导致缓存失效，请检查`
        );
      }
    } else {
      /** 不需要缓存 */
      if (toCompName) {
        keepAliveStore.remove(toCompName);
      }
    }
    /** 如果进入的是Redirect页面，则也将离开页面的缓存清空（刷新页面的操作） */
    if (to.name === REDIRECT_NAME) {
      const fromCompName = getComponentName(from);
      fromCompName && keepAliveStore.remove(fromCompName);
    }
    /** 如果用户已登出，则清空所有缓存的组件 */
    if (!token) {
      keepAliveStore.clear();
    }
    NProgress.done();
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
