import knex from "knex";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from "./index";

const config = {
    client: "mysql",
    connection: {
        charset: "utf8",
        timezone: "UTC",
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    },
};

const db = knex(config);

export default db;
