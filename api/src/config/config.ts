import { configDotenv } from "dotenv";

configDotenv();

export const API_PORT:number = parseInt(process.env.PORT as string);

// DB CONNECTION
export const DB_NAME:string = process.env.DB_NAME as string;
export const DB_PORT:number = parseInt(process.env.DB_PORT as string);
export const DB_HOST:string = process.env.DB_HOST as string;
export const DB_USER:string = process.env.DB_USER as string;
export const DB_PASSWORD:string = process.env.DB_PASSWORD as string;

// Encoding Salt
export const BCRYPT_SALT:number=parseInt(process.env.BCRYPT_SALT as string);

// Environment
export const ENV:string = process.env.ENV as string;


// Frontennd URL
export const CORS_ORIGIN:string = process.env.CORS_ORIGIN as string;

