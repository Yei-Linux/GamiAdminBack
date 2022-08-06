abstract class Singleton {
  private static instance: any;
  constructor() {
    if (Singleton.instance) {
      throw new Error("You can't create a new instance");
    }
  }

  public static getInstance<T>(instance: T): T {
    if (!Singleton.instance) {
      Singleton.instance = instance;
    }

    return Singleton.instance;
  }
}

export default Singleton;
