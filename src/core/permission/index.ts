import { useUserStore } from "@/store/modules/user";
import { TreeSelectProps } from "ant-design-vue";
import { App } from "vue";
import { permissions } from "./modules/";
import { PermissionType } from "./modules/types";

type DataNode = NonNullable<TreeSelectProps["treeData"]>[number];

/**
 * @description 将权限列表转成级联选择器要求的数据格式
 */
export const formarPermsToCascader = () => {
  return Object.keys(permissions).reduce<DataNode[]>((prev, moduleKey) => {
    const module = permissions[moduleKey];
    Object.keys(module).forEach((key) => {
      /** reduce包含四个参数：
       * ① perviousValue：上一次的计算结果的返回值；
       * ②currentValue：数组中正在处理的元素。若指定了初始值，则值则为数组索引为 0 的元素，否则为 1
       * ③currentIndex：数组中正在处理的元素的索引。若指定了初始值，则起始索引为 0，否则为 1
       * ④array：被遍历的对象数组
       *
       */
      module[key]
        .split(":")
        .reduce((p: any, k: any, currentIndex: number, arr) => {
          const value = arr.slice(0, currentIndex + 1).join(":");
          const index = p.findIndex((item) => item?.value === value);
          if (Number.isInteger(index) && index !== -1) {
            return p[index].children;
          } else {
            const item: DataNode = {
              // key: k,
              title: k,
              label: k,
              value,
              children: [],
            };
            p.push(item);
            return item.children!;
          }
        }, prev);
    });
    return prev;
  }, []);
};

/**
 * 验证权限
 * @param {PermissionType} perm 权限码
 * @returns {boolean}
 */
export const verifyAuth = (perm: PermissionType) => {
  const permCode = perm.split(".").join(":");
  const permissionList = useUserStore().perms;
  return permissionList.some((n) => n === permCode);
};

export default {
  install(app: App) {
    app.config.globalProperties.$auth = verifyAuth;
  },
};
