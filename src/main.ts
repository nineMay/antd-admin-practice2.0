import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

/** 生产环境 */
if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { mockXHR } = require("./mock");
  mockXHR();
}

const app = createApp(App);

function setupPlugins() {
  /** 注册全局常用的ant-design-vue组件 */
  setupAtd(app);
}
