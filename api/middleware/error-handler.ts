import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, EmptyValueError } from "../errors";

const errorHandlerMiddleware = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong",
  };

  if (err instanceof EmptyValueError) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = err.message;
  }

  if (err instanceof NotFoundError) {
    defaultError.statusCode = StatusCodes.NOT_FOUND;
    defaultError.msg = err.message;
  }

  if (err instanceof TypeError) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = err.message;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
