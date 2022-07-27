export const ENVIRONMENT_NOT_FOUND =
  "You need to pass the parameter in command.Please read the docs!";
export const ENVIRONMENT_IS_NOT_THE_CORRECT_OPTION_AVAILABLE =
  "You need to pass the one of these parameters in command: 'development', 'production', 'test'.Please read the docs!";

type TErrorReq<T> = {
  res: T;
  message?: string;
};
export const MESSAGES_RESPONSE_API = {
  clientError: <T>({ res, message }: TErrorReq<T>) => ({
    res,
    code: 400,
    bodyResponse: {
      message: message ?? "Unauthorized",
    },
  }),
  unauthorized: <T>({ res, message }: TErrorReq<T>) => ({
    res,
    code: 401,
    bodyResponse: {
      message: message ?? "Unauthorized",
    },
  }),
  paymentRequired: <T>({ res, message }: TErrorReq<T>) => ({
    res,
    code: 402,
    bodyResponse: {
      message: message ?? "Payment required",
    },
  }),
  forbidden: <T>({ res, message }: TErrorReq<T>) => ({
    res,
    code: 403,
    bodyResponse: {
      message: message ?? "Forbidden",
    },
  }),
  notFound: <T>({ res, message }: TErrorReq<T>) => ({
    res,
    code: 404,
    bodyResponse: {
      message: message ?? "Not found",
    },
  }),
  conflict: <T>({ res, message }: TErrorReq<T>) => ({
    res,
    code: 409,
    bodyResponse: {
      message: message ?? "Conflict",
    },
  }),
  tooMany: <T>({ res, message }: TErrorReq<T>) => ({
    res,
    code: 429,
    bodyResponse: {
      message: message ?? "Too many requests",
    },
  }),
};
