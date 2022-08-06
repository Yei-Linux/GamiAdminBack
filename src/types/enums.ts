export enum ERouterBinder {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
  patch = "patch",
}
type TRouterBinder = typeof ERouterBinder;
export type TKeysRouterBinder = keyof TRouterBinder;
