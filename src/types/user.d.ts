// 用户信息
export type User = {
  // /** token令牌 */
  // token: string
  // /** 用户ID */
  // id: string
  // /** 用户名称 */
  // account: string
  // /** 手机号 */
  // mobile: string
  // /** 头像 */
  // avatar: string
  /** 全职/兼职 */
  userType: string
}
import 'pinia'

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: boolean | {
      key?: string
      storage?: Storage
      paths?: string[]
    }
  }
}
