import JwtService from "@/services/jwt.service";
import { NextFunction, Request, Response } from "express";

const jwtService = new JwtService();

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });

    const [type, token] = authHeader.split(" ");
    if (type != "Bearer" || !token) return res.status(401).json({ msg: "Unauthorized" });

    const xToken = req.cookies.xToken;
    if (!xToken) return res.status(401).json({ msg: "Unauthorized" });

    const jwtService = new JwtService();
    const payload = await jwtService.verifyAccessToken(token);
    if (!payload) return res.status(401).json({ msg: "Unauthorized" });

    req.body.userId = payload.userId;
    req.body.email = payload.email;

    next();
}

export default authMiddleware;
