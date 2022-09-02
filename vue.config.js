const { defineConfig } = require('@vue/cli-service');
const port = process.env.port || process.env.npm_config_port || 8080; // dev port
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
  devServer: {
    port,
    client: {
      progress: true,
    },
    // watchOptions: {
    //   // 开发时，自动保存代码导致构建频繁且会报错，又不想手动保存，则可以开启延迟构建
    //   aggregateTimeout: 1500,
    //   ignored: /node_modules/,
    // },
    proxy: {
      // '/mock-api': {
      //   target: `http://localhost:${port}`,
      //   changeOrigin: true,
      //   logLevel: 'debug',
      //   pathRewrite: {
      //     '^/mock-api': ''
      //   }
      // },
      '^/api': {
        // target: process.env.VUE_APP_API_URL,
        target: 'https://nest-api.buqiyuan.site/api/',
        // target: 'http://localhost:7001 ',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '',
        },
      },
      '^/ws-api': {
        target: 'wss://nest-api.buqiyuan.site',
        // target: 'http://localhost:7002',
        changeOrigin: true, //是否允许跨域
        wss: true,
        logLevel: 'debug',
      },
    },
    // setupMiddlewares: require('./src/mock/mock-server.js'),
  },
})
