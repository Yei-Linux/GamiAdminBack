import Express from "express";
import { MESSAGES_RESPONSE_API } from "../constants/message";
import { BaseController } from "./BaseController";

export type Errors = keyof typeof MESSAGES_RESPONSE_API;

class MessagesController {
  public handleResponseByError(
    typeError: Errors,
    res: Express.Response,
    message?: string
  ) {
    return BaseController.jsonResponse(
      MESSAGES_RESPONSE_API[typeError]<Express.Response>({ res, message })
    );
  }
}

export default MessagesController;
