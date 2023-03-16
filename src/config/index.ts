import { config } from "dotenv";
config();

export const { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, SECRET_KEY_TOKEN, SECRET_KEY_REFRESH_TOKEN } =
    process.env;
