import Express from "express";
import singletonLogger from "../main/config/Logger";
import MessagesController from "./MessagesController";

type TApiRequestParams = {
  req: Express.Request;
  res: Express.Response;
};

type TJsonResponse = {
  res: Express.Response;
  code: number;
  bodyResponse: Record<string, any>;
};

export abstract class BaseController extends MessagesController {
  public static jsonResponse({ res, code, bodyResponse }: TJsonResponse) {
    res.status(code).json(bodyResponse);
  }

  public fail(res: Express.Response, error: Error | string) {
    BaseController.jsonResponse({
      res,
      code: 500,
      bodyResponse: {
        message: error.toString(),
      },
    });
  }

  public ok<T>(res: Express.Response, dto: T) {
    if (!!dto) {
      BaseController.jsonResponse({
        res,
        code: 200,
        bodyResponse: dto,
      });

      return;
    }
    res.sendStatus(200);
  }

  public async execute(
    params: TApiRequestParams,
    callback: (...props: Array<any>) => Promise<void | any>
  ): Promise<void | any> {
    try {
      await callback(params);
    } catch (error) {
      singletonLogger.log({
        level: "error",
        message: `[BaseController]: Uncaught controller error`,
      });
      this.fail(params.res, `[BaseController]: Uncaught controller error`);
    }
  }
}
