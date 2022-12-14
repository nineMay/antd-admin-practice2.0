/**
 * @description 登录
 * @param {LoginParams} data
 * @returns
 */

import { BaseResponse, request } from "@/utils/request";

export function login(data: API.LoginParams) {
  return request<BaseResponse<API.LoginResult>>(
    {
      url: "login",
      method: "post",
      data,
    },
    {
      isGetDataDirectly: false,
    }
  );
}

/**
 * @description 获取验证码
 */
export function getImageCaptcha(params?: API.CaptchaParams) {
  return request<API.CaptchaResult>({
    url: "captcha/img",
    method: "get",
    params,
  });
}
