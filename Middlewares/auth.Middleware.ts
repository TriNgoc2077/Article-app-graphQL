import { Request, Response, NextFunction } from "express";
import User from "../Model/user.Model";

export const requireAuth = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        const user = await User.findOne({
            token: token,
            deleted: false
        }).select('-password');
        if (user) {
            (req as any)['user'] = user;
        } else {
            (req as any)['user'] = '';
        }
    } else {
        (req as any)['user'] = '';
    }
    next();
}