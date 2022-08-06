import "reflect-metadata";
import { ERouterBinder, TKeysRouterBinder } from "../types";

function routerBinder(path: string, method: TKeysRouterBinder) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata("route", path, target, key);
    Reflect.defineMetadata("method", method, target, key);

    const realMethod = desc.value;

    desc.value = function (this: any, ...args: any[]) {
      const result = realMethod.apply(this, args);
      return result;
    };
    return desc;
  };
}

export function Get(path: string) {
  return routerBinder(path, ERouterBinder.get);
}

export function Post(path: string) {
  return routerBinder(path, ERouterBinder.post);
}

export function Put(path: string) {
  return routerBinder(path, ERouterBinder.put);
}

export function Delete(path: string) {
  return routerBinder(path, ERouterBinder.delete);
}

export function Patch(path: string) {
  return routerBinder(path, ERouterBinder.patch);
}
