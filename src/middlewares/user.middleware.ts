import { NextFunction, Request, Response } from "express";

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header({
    "x-token": "abcd",
  });
  next();
};

export default userMiddleware;
