import { Router } from "vue-router";
import { LOGIN_NAME, WhiteNameList } from "./constant";
import { NProgress } from "nprogress";
import { useUserStore } from "@/store/modules/user";
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";
import { Storage } from "@/utils/Storage";
import { to as _to } from "@/utils/awaitTo";

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
        }
      }
    }
  });
}
