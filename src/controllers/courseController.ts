import { Request, Response, Next } from 'express';
import Course from '../models/course';
import log4js from '../middlewares/log4js';
import statusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class CourseController {

    async createCourse(req: Request, res: Response, next: Next) {

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
            return next(err);
        }
    }

    async updateCourse(req: Request, res: Response, next: Next) {
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
                throw new statusCodeError(404, 'Course is not found');
            }
        } catch (err) {
            return next(err);
        }
    }

    async deleteCourse(req: Request, res: Response, next: Next) {
        const courseId = req.params.id;

        try {
            const deletedCourse = await Course.findByIdAndDelete(courseId);

            if (deletedCourse) {
                res
                    .json(deletedCourse);
                logger.info(`Course was successfully deleted from the DB`);
            } else {
                throw new statusCodeError(404, 'Course is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
    async getAllCourses(req: Request, res: Response, next: Next) {
        try {
            const courses = await Course.find();
            res
                .status(200)
                .json(courses);
        } catch (err) {
            return next(err);
        }
    }

    async getCourseById(req: Request, res: Response, next: Next) {
        const courseId = req.params.id;

        try {
            const course = await Course.findById(courseId);
            if (course) {
                res
                    .status(200)
                    .json(course);
            } else {
                throw new statusCodeError(404, 'Course is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
}

export default new CourseController();