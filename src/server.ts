import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import log4js from "./middlewares/log4js";
import courseRouter from './routes/courseRoutes';
import lecturerRouter from './routes/lecturerRoutes';
import subjectRouter from './routes/subjectRoutes';
import departmentRouter from './routes/departmentRoutes';
import facultyRouter from './routes/facultyRoutes';
import markRouter from './routes/markRoutes';
import studentRouter from './routes/studentRoutes';
import universityRouter from './routes/universityRoutes';
import { engine } from 'express-handlebars';
import * as path from "path";

const logger = log4js.getLogger("file");
dotenv.config();
const app = express();
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, './views'));
app.enable('view cache');
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/courses', courseRouter);
app.use('/api/lecturers', lecturerRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/faculties', facultyRouter);
app.use('/api/marks', markRouter);
app.use('/api/students', studentRouter);
app.use('/api/universities', universityRouter);

app.get('/', (req, res) => {
    res.render('home');
});

const start = async () => {
    try {
        if (process.env.DB_CONN_STRING) {
            await mongoose
                .connect(process.env.DB_CONN_STRING), { useNewUrsParser: true, useUnifiedTopology: true };
            logger.info('Connected to MongoDB');
            app.listen(process.env.PORT, () => {
                logger.info(`Listerning port ${process.env.PORT}`);
            });
        }
    } catch (error) {
        logger.error('Connection error - is not connected to the DB');
    }
}

start();