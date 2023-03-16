import db from "@/config/db";
import { User } from "@/interfaces/user.interface";
import * as bcrypt from "bcrypt";

class UserModel {
    constructor() {}

    async findByEmail(email: string) {
        const user = db.select("id", "name", "email", "password").from<User>("users").where({ email: email }).first();

        return user;
    }

    async findById(userId: number) {
        const user = db.select("id", "name", "email", "password").from<User>("users").where({ id: userId }).first();

        return user;
    }

    async comparePassword(plaintText: string, hashed: string) {
        let cek: boolean = await bcrypt.compare(plaintText, hashed);

        /* Recheck if hashed password from laravel */
        if (!cek) {
            hashed = hashed.replace("$2y$", "$2a$");
            cek = await bcrypt.compare(plaintText, hashed);
        }
    }
}

export default UserModel;
