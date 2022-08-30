const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css:{
    loaderOptions:{
  less:{
    lessOptions:{
javascriptEnabled:true,
  modifyVars:{},
  },
    additionalData:`
@import "ant-design-vue/lib/style/themes/default.less";
    @import "~@/styles/variables.less";
  `,
    }
    }
   },
   configureWebpack: (config) => {
    // 开启顶级await
    config.experiments = {
      topLevelAwait: true,
    };
   

   

   
  },
})
