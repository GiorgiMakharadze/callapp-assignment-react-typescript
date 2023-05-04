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

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let msg = "Something went wrong";

  if (err instanceof EmptyValueError) {
    statusCode = StatusCodes.BAD_REQUEST;
    msg = err.message;
  } else if (err instanceof NotFoundError) {
    statusCode = StatusCodes.NOT_FOUND;
    msg = err.message;
  } else if (err instanceof TypeError) {
    statusCode = StatusCodes.BAD_REQUEST;
    msg = err.message;
  } else if (err.message) {
    msg = err.message;
  }

  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
