import express from "express";

class GlobalRouter {
  private static instance: express.Router | null = null;
  constructor() {
    if (GlobalRouter.instance) {
      throw new Error("You can't create a new instance");
    }
  }

  public static getInstance(instance: express.Router): express.Router {
    if (!GlobalRouter.instance) {
      GlobalRouter.instance = instance;
    }

    return GlobalRouter.instance;
  }
}

export const globalRouter: express.Router = GlobalRouter.getInstance(
  express.Router()
);
