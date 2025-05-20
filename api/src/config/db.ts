import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config";

const sequelize = new Sequelize({
    host: DB_HOST,
    database : DB_NAME,
    password : DB_PASSWORD,
    port : DB_PORT,
    username : DB_USER,
    logging : console.log,
    dialect : "mysql"
});

export default sequelize;
