// src/api/user.ts
import { request } from '@/untils/request'
import type { User } from '@/types/user'

// 定义接口参数和响应类型
// interface ReqSendSms {
//   mobile: string
//   type: 'login' | 'register'
// }
//
// interface ResSendSms {
//   code: string
// }

// 发送短信验证码
// export const sendSmsApi = (data: ReqSendSms) => {
//   return request<ResSendSms>('/sendSms', 'POST', data)
// }
//
// // 手机号登录
// export const loginByMobileApi = (data: { mobile: string; code: string }) => {
//   return request<User>('/login', 'POST', data)
// }
//
// // 获取用户信息
// export const getUserInfoApi = () => {
//   return request<User>('/patient/userInfo', 'GET')
// }
