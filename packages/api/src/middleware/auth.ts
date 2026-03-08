import type { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase.js";
import { ApiError } from "./errorHandler.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return next(new ApiError(401, "Authentication required", "UNAUTHORIZED"));
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return next(new ApiError(401, "Invalid or expired token", "UNAUTHORIZED"));
    }

    req.userId = user.id;
    next();
  } catch (err) {
    next(err);
  }
}

export async function optionalAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace(/^Bearer\s+/i, "");

  if (!token) return next();

  try {
    const { data: { user } } = await supabase.auth.getUser(token);
    if (user) req.userId = user.id;
  } catch {
    // Ignore auth errors for optional auth
  }
  next();
}
