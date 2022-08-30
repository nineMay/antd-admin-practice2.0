import { createStore } from "vuex";
import { createPinia } from "pinia";
import type { App } from "vue";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
