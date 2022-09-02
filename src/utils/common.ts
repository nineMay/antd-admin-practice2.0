/**
 * @description 是否是生产环境
 */
export const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
export const IS_DEV = ["development"].includes(process.env.NODE_ENV);
