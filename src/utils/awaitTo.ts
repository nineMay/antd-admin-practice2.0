/**
 * @param {Promise} promise
 * @param {Object=}errorExt :可以传递给 err 对象的附加信息
 * @return {Promise}
 */
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        /** Object.assign：
         * 1.合并对象
         * 2.合并具有相同属性的对象
         * 3.集成属性和不可枚举属性是不能拷贝
         * 4.原始类型会被包装为对象
         * 5.异常会打断后续拷贝任务*/
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }
      return [err, undefined];
    });
}

export default to;
