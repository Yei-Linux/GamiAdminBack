import "reflect-metadata";
import { globalRouter } from "../pojos/GlobalRouter";
import { ERouterBinder } from "../types";

function execute(target: any, basePath: string, classInstance: any) {
  for (const key in target.prototype) {
    const handler = function (this: any, ...args: any[]) {
      const result = target.prototype[key].apply(classInstance, args);
      return result;
    };
    const path = Reflect.getMetadata("route", target.prototype, key);
    const method: ERouterBinder = Reflect.getMetadata(
      "method",
      target.prototype,
      key
    );

    if (path && method) {
      const fullPath = `${basePath}${path}`;
      globalRouter[method](fullPath, handler);
    }
  }
}

type Constructor = { new (...args: any[]): {} };

export function Controller(basePath: string) {
  return function <T extends Constructor>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        execute(constructor, basePath, this);
      }
    };
  };
}
