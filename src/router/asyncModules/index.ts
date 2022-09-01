//生成组件图
export const constantRouterComponents = {};

const modulesFiles = require.context(".", true, /\.ts$/);

// keys()：返回所有的键
modulesFiles.keys().forEach((path) => {
  if (path.startsWith("./index.")) {
    return;
  }
  const value = modulesFiles(path).default;
  Object.entries(value).forEach(([path, comp]) => {
    constantRouterComponents[path] = comp;
  });
});
