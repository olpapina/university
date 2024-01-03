// import express from "express";
import express from "express";
import mongoose from "mongoose";
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

const logger = log4js.getLogger("file");
dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'html');
app.use(express.json());
app.use('/api/courses', courseRouter);
app.use('/api/lecturers', lecturerRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/faculties', facultyRouter);
app.use('/api/marks', markRouter);
app.use('/api/students', studentRouter);
app.use('/api/universities', universityRouter);

const start = async () => {
    try {
        if (process.env.DB_CONN_STRING) {
            await mongoose
                .connect(process.env.DB_CONN_STRING), {useNewUrsParser: true, useUnifiedTopology: true};
                logger.info('Connected to MongoDB');
                app.listen(process.env.PORT, () => {
                logger.info(`Listerning port ${process.env.PORT}`);
            });

            console.log('CONN_STRING: ', process.env.DB_CONN_STRING);
        }
    } catch (error: any) {
        const err = error as Error;
        console.log('ERRROR!', err.message);
    }
}

start();