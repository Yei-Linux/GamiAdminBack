import singletonLogger from "../main/config/Logger";

export function catchError(errorMessage?: string) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const method = desc.value;

    desc.value = function (this: any, ...args: any[]) {
      try {
        return method.apply(this, args);
      } catch (error) {
        singletonLogger.log({
          level: "error",
          message: `${error}`,
        });
        throw new Error(errorMessage);
      }
    };

    return desc;
  };
}
