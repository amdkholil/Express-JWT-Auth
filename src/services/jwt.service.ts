import jwt from "jsonwebtoken";
import { SECRET_KEY_TOKEN, SECRET_KEY_REFRESH_TOKEN } from "@config";

interface JwtPayload {
    userId: number;
    email: string;
}

class JwtService {
    async generateAccessToken(payload: JwtPayload): Promise<String> {
        const token = jwt.sign(payload, SECRET_KEY_TOKEN, {
            expiresIn: "5m",
        });

        return token;
    }

    async generateRefreshToken(payload: JwtPayload): Promise<string> {
        const token = jwt.sign(payload, SECRET_KEY_REFRESH_TOKEN, {
            expiresIn: "7d",
        });

        return token;
    }

    async verifyAccessToken(token: string) {
        try {
            const payload = await jwt.verify(token, SECRET_KEY_TOKEN);
            const res = payload as JwtPayload;
            return res;
        } catch (err) {
            return null;
        }
    }
    async verifyRefreshToken(token: string) {
        try {
            const payload = await jwt.verify(token, SECRET_KEY_REFRESH_TOKEN);
            const res = payload as JwtPayload;
            return res;
        } catch (err) {
            return null;
        }
    }
}

export default JwtService;
