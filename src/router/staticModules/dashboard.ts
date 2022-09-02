import { t } from "@/hooks/useI18n";
import { RouteRecordRaw, RouterView } from "vue-router";
import LayoutParentView from "@/layout/routerView/index.vue";

const moduleName = "dashboard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: moduleName,
    redirect: "/dashboard/welcome",
    component: LayoutParentView,
    meta: {
      title: t("routes.dashboard.dashboard"),
      icon: "icon-shouye",
    },
    children: [
      {
        path: "welcome",
        name: `${moduleName}-welcome`,
        meta: {
          title: t("routes.dashboard.workbench"),
          icon: "icon-shouye",
        },
        component: () => import("@/views/dashboard/welcome/index.vue"),
      },
    ],
  },
];

export default routes;
