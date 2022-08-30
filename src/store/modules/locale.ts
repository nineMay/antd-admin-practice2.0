import { LOCALE_KEY } from "@/enums/cacheEnum";
import type { LocaleType } from "@/locales/config";
import { defineStore } from "pinia";
import { Storage } from "@/utils/Storage";
import { store } from "@/store";

interface LocaleState {
  locale: LocaleType;
}

export const useLocaleStore = defineStore({
  id: "locale",
  state: (): LocaleState => ({
    locale: Storage.get(LOCALE_KEY, "zh_CN"),
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale ?? "zh_CN";
    },
  },
  actions: {
    setLocale(locale: LocaleType) {
      this.locale = locale;
      Storage.set(LOCALE_KEY, locale);
    },
  },
});

export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
