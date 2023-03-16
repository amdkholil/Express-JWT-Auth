import db from "@/config/db";
import { User } from "@/interfaces/user.interface";
import UserModel from "@/models/user.model";
import JwtService from "@/services/jwt.service";
import { Request, Response } from "express";

class UserController {
    async login(req: Request, res: Response) {
        const userModel = new UserModel();
        const jwtService = new JwtService();
        const { email, password } = req.body;
        const user: User | null = await userModel.findByEmail(email);

        /* check email */
        if (!user) return res.status(401).json({ msg: "Email atau password tidak valid!" });

        /* check password */
        if (!userModel.comparePassword(password, user.password))
            return res.status(401).json({ msg: "Email atau password tidak valid!" });
        delete user.password;

        /* generate token & append to header of response*/
        const payload = { userId: user.id, email: user.email };
        const token = await jwtService.generateAccessToken(payload);
        const xToken = await jwtService.generateRefreshToken(payload);
        user.token = token.toString();
        res.cookie("xToken", xToken, { httpOnly: true });

        return res.json(user);
    }

    async refreshToken(req: Request, res: Response) {
        const jwtService = new JwtService();
        const userModel = new UserModel();

        const refreshToken = req.cookies.xToken;
        if (!refreshToken) return res.status(401).json({ msg: "Unauthorized" });
        const payload = await jwtService.verifyRefreshToken(refreshToken);
        if (!payload) return res.status(401).json({ msg: "Unauthorized" });

        const user = await userModel.findById(payload.userId);
        if (!user) return res.status(401).json({ msg: "Unauthorized" });

        const newPayload = { userId: user.id, email: user.email };
        const xToken = await jwtService.generateRefreshToken(newPayload);
        const token = await jwtService.generateAccessToken(newPayload);
        res.cookie("xToken", xToken, { httpOnly: true });
        return res.json({ token: token });
    }

    async getUsers(req: Request, res: Response) {
        const query = await db.select("id", "name", "email").from<User>("users");

        res.send(query);
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("xToken");
        return res.json({
            msg: "logout success",
        });
    }
}

export default new UserController();
