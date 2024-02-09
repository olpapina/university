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
import homeRouter from './routes/homeRoutes';
import userRouter from './routes/userRoutes'
import { engine } from 'express-handlebars';
import * as path from "path";
import ErrorHandler from "./middlewares/errorHandler";
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import pageRouter from './routes/pageRoutes';

const logger = log4js.getLogger("file");
dotenv.config();
const app = express();

const options = {
  swaggerDefinition: {
    info: {
      title: 'API - Universities',
      version: '1.0.0',
      description: 'API documentation'
    },
    openapi: "3.1.0",
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ['src/routes/*.ts'],
};

const specs = swaggerjsdoc(options);
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, './views'));
app.enable('view cache');
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api-docs/', swaggerui.serve, swaggerui.setup(specs));

app.use('/api/courses', courseRouter);
app.use('/api/lecturers', lecturerRouter);
app.use('/api/subjects', subjectRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/faculties', facultyRouter);
app.use('/api/marks', markRouter);
app.use('/api/students', studentRouter);
app.use('/api/universities', universityRouter);
app.use('/api/users', userRouter)
app.use('/', pageRouter);
app.use('/auth', homeRouter);
app.use(ErrorHandler.errorHandler);
process.setMaxListeners(0);

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