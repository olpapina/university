const express = require('express');
const mongoose = require('mongoose');
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
        await mongoose
            .connect(`mongodb://${process.env.SERVER}/${process.env.DB_NAME}`);
        logger.info('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            logger.info(`Listerning port ${process.env.PORT}`);
        });
    } catch (error: any) {
        logger.error('DB connection error:', error);
    }
    finally {
        process.exit(1);
    }
}

start();