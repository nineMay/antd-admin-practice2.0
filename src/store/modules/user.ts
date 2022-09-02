import { defineStore } from "pinia";
// import { useWsStore } from './ws';
import type { RouteRecordRaw } from "vue-router";
import { store } from "@/store";
// import { login } from '@/api/login';
import { ACCESS_TOKEN_KEY } from "@/enums/cacheEnum";
import { Storage } from "@/utils/Storage";
import { login } from "@/api/login";
import { getInfo, logout, permmenu } from "@/api/account";
import { resetRouter } from "@/router";
import { useWsStore } from "./ws";
import { generatorDynamicRouter } from "@/router/generator-router";
// import { logout, getInfo, permmenu } from '@/api/account';
// import { generatorDynamicRouter } from '@/router/generator-router';
// import { resetRouter } from '@/router';

interface UserState {
  token: string;
  name: string;
  avatar: string;
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: string[];
  menus: RouteRecordRaw[];
  userInfo: Partial<API.AdminUserInfo>;
}

// export const useUserStore = defineStore({
//   id: "user",
//   state: (): UserState => ({
//     token: Storage.get(ACCESS_TOKEN_KEY, null),
//     name: "amdin",
//     avatar: "",
//     perms: [],
//     menus: [],
//     userInfo: {},
//   }),
//   getters: {
//     getToken(): string {
//       return this.token;
//     },
//     getAvatar(): string {
//       return this.avatar;
//     },
//     getName(): string {
//       return this.name;
//     },
//     getPerms(): string[] {
//       return this.perms;
//     },
//   },
//   actions: {
//     /** 清空token及用户信息 */
//     resetToken() {
//       this.avatar = this.token = this.name = "";
//       this.perms = [];
//       this.menus = [];
//       this.userInfo = {};
//       Storage.clear();
//     },
//     /** 登录成功保存token */
//     setToken(token: string) {
//       this.token = token ?? "";
//       const ex = 7 * 24 * 60 * 60 * 1000;
//       Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
//     },
//     /** 登录 */
//     async login(params: API.LoginParams) {
//       try {
//         const { data } = await login(params);
//         this.setToken(data.token);
//         return this.afterLogin();
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     },
//     /** 登录成功之后, 获取用户信息以及生成权限路由 */
//     async afterLogin() {
//       try {
//         const wsStore = useWsStore();
//         const [userInfo, { perms, menus }] = await Promise.all([
//           getInfo(),
//           permmenu(),
//         ]);
//         this.perms = perms;
//         this.name = userInfo.name;
//         this.avatar = userInfo.headImg;
//         this.userInfo = userInfo;
//         // 生成路由
//         const generatorResult = await generatorDynamicRouter(menus);
//         this.menus = generatorResult.menus.filter(
//           (item) => !item.meta?.hideInMenu
//         );
//         !wsStore.client && wsStore.initSocket();

//         return { menus, perms, userInfo };
//       } catch (error) {
//         return Promise.reject(error);
//         // return this.logout();
//       }
//     },
//     /** 登出 */
//     async logout() {
//       await logout();
//       const wsStore = useWsStore();
//       wsStore.closeSocket();
//       this.resetToken();
//       resetRouter();
//     },
//   },
// });

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    name: "admin",
    avatar: "",
    perms: [],
    menus: [],
    userInfo: {},
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getName(): string {
      return this.name;
    },
    getPerms(): string[] {
      return this.perms;
    },
  },
  actions: {
    /** 清空token及用户信息 */
    resetToken() {
      this.avatar = this.token = this.name = "";
      this.perms = [];
      this.menus = [];
      this.userInfo = {};
      Storage.clear();
    },
    /** 登录成功保存token */
    setTopken(token: string) {
      this.token = token ?? ""; //判断token有没有值，若没有值，则赋值'';
      /** 设置缓存过期时间 */
      const ex = 7 * 24 * 60 * 60 * 1000;
      Storage.set(ACCESS_TOKEN_KEY, this.token, ex);
    },
    /** 登录 */
    async login(params: API.LoginParams) {
      try {
        const { data } = await login(params);
        this.setTopken(data.token);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /** 登录成功之后，获取用户信息以及生成权限路由 */
    async afterLogin() {
      try {
        const wsStore = useWsStore();
        // promise.all():将多个Promise实例，包装成一个新的Promise实例。
        const [userInfo, { perms, menus }] = await Promise.all([
          getInfo(),
          permmenu(),
        ]);
        this.perms = perms;
        this.name = userInfo.name;
        this.avatar = userInfo.headImg;
        this.userInfo = userInfo;
        /** 生成路由 */
        const generatorResult = await generatorDynamicRouter(menus);
        this.menus = generatorResult.menus.filter(
          (item) => !item.meta?.hideInMenu
        );
        !wsStore.client && wsStore.initSocket();
        return { menus, perms, userInfo };
      } catch (error) {
        /** Promise.reject：返回报错原因 */
        return Promise.reject(error);
      }
    },
    /** 登出 */
    async logout() {
      await logout();
      const wsStore = useWsStore();
      wsStore.closeSocket();
      this.resetToken();
      resetRouter();
    },
  },
});
