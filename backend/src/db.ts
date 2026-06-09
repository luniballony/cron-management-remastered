import pg from "pg";
import {env} from "./env"


const { Pool } = pg;

export const db = new Pool ({
    user : env.db.user,
    host : env.db.host,
    database : env.db.name,
    password : env.db.password,
    port : env.db.port
})
