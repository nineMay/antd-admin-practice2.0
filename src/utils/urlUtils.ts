/**
 * 将对象添加当做参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj obj参数对象
 * @returns {string} 拼接后的对象
 * 案例：
 * let obj={a:'3',b:'4'}
 * setObjToUrlParams('www.baidu.com',obj)
 * 执行后，拼接好的url为www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: object): string {
  let parameters = "";
  let url = "";
  for (const key in obj) {
    parameters += `${key}=${encodeURIComponent(obj[key])}&`;
  }
  parameters = parameters.replace(/&$/, "");
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, "?") + parameters;
  }
  return url;
}

/**
 * 将路径中重复的正斜杆替换成单个斜杆隔开的字符串
 * @param path 要处理的路径
 * @return {string} 将/去重后的结果
 */
export const uniqueSlash = (path: string) =>
  path.replace(/(https?:\/)|(\/)+/g, "$1$2");
