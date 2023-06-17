import { Request } from "express";

export interface AuthenticatedRequest extends Request {
    userID?: string;
}