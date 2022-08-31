<template> 
  <ConfigProvider :locale="getAntdLocale">
    <router-view #="{ Component }">
      <component :is="Component" />
    </router-view>
    <LockScreen />
  </ConfigProvider>
</template>


<script setup lang='ts'>
    import { ConfigProvider } from 'ant-design-vue';
import { useLocale } from '@/locales/useLocale';
import { useRoute } from 'vue-router';
import { watchEffect } from 'vue';
import { transformI18n } from './hooks/useI18n';
import { LockScreen } from '@/components/basic/lockscreen';

const route = useRoute();
    const {getAntdLocale}=useLocale();

    watchEffect(() => {
    if (route.meta?.title) {
      // 翻译网页标题
      document.title = transformI18n(route.meta.title);
    }
  });
</script>


<style lang='less' >

</style>
