import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { API_PORT, CORS_ORIGIN } from "./config/config";

import trainerRoutes from "./routes/trainer.route";
import subjectRoutes from "./routes/subject.route";
import sequelize from "./config/db";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
}));

app.use(morgan("dev"));
app.use(helmet());

app.use('/api/v1/trainer', trainerRoutes);
app.use('/api/v1/subject', subjectRoutes);


app.listen(API_PORT, async()=>{
    // await sequelize.sync({force : true});
    console.log(`Server is running on port ${API_PORT}`);
    console.log(`CORS origin: ${process.env.CORS_ORIGIN}`);
})