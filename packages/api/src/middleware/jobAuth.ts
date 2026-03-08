import type { Request, Response, NextFunction } from "express";
import { ApiError } from "./errorHandler.js";

const JOB_API_KEY = process.env.JOB_API_KEY;

export async function jobAuth(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const key = req.headers["x-job-api-key"] as string | undefined;
  if (!JOB_API_KEY || key !== JOB_API_KEY) {
    return next(new ApiError(401, "Invalid or missing job API key", "UNAUTHORIZED"));
  }
  next();
}
