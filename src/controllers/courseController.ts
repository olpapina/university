import { Request, Response, NextFunction } from 'express';
import Course from '../models/course';
import log4js from '../middlewares/log4js';
import StatusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class CourseController {

    async createCourse(req: Request, res: Response, next: NextFunction) {
        const { title, subjects, yearOfStudying } = req.body;

        const newCourse = new Course({
            title,
            subjects,
            yearOfStudying
        });

        try {
            const savedCourse = await newCourse.save();
            res
                .status(201)
                .json(savedCourse);
            logger.info(`Course was successfully added in the DB - ${savedCourse}`);
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async updateCourse(req: Request, res: Response, next: NextFunction) {
        const courseId = req.params.id;
        const { title, subjects, yearOfStudying } = req.body;
        try {
            const updatedCourse = await Course.findByIdAndUpdate(
                courseId,
                { title, subjects, yearOfStudying },
                { new: true }
            );

            if (updatedCourse) {
                res
                    .status(200)
                    .json(updatedCourse);
                logger.info(`Course was successfully updated in the DB - ${updatedCourse}`);

            } else {
                throw new StatusCodeError(404, 'Course is not found');
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async deleteCourse(req: Request, res: Response, next: NextFunction) {
        const courseId = req.params.id;

        try {
            const deletedCourse = await Course.findByIdAndDelete(courseId);

            if (deletedCourse) {
                res
                    .json(deletedCourse);
                logger.info(`Course was successfully deleted from the DB`);
            } else {
                throw new StatusCodeError(404, 'Course is not found');
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async getAllCourses(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await Course.find();
            res
                .status(200)
                .json(courses);
            logger.info(`Courses were successfully got from the DB`);
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async getCourseById(req: Request, res: Response, next: NextFunction) {
        const courseId = req.params.id;
        try {
            const course = await Course.findById(courseId);
            if (course) {
                res
                    .status(200)
                    .json(course);
                logger.info(`Course was successfully got from the DB`);
            } else {
                throw new StatusCodeError(404, 'Course is not found');
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }
}

export default new CourseController();