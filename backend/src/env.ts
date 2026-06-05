import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 3000,

  db: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
};