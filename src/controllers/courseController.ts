import { Request, Response } from 'express';
import Course from '../models/course';

class CourseController {

    async createCourse(req: Request, res: Response) {

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
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async updateCourse(req: Request, res: Response) {
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
            } else {
                res.status(404).json({ message: 'Course is not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async deleteCourse(req: Request, res: Response) {
        const courseId = req.params.id;

        try {
            const deletedCourse = await Course.findByIdAndDelete(courseId);

            if (deletedCourse) {
                res
                .json(deletedCourse);
            } else {
                res.status(404).json({ message: 'Course is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
    async getAllCourses(req: Request, res: Response) {
        try {
            const courses = await Course.find();
            res
            .status(200)
            .json(courses);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async getCourseById(req: Request, res: Response) {
        const courseId = req.params.id;

        try {
            const course = await Course.findById(courseId);
            if (course) {
                res
                .status(200)
                .json(course);
            } else {
                res.status(404).json({ message: 'Course is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
}

export default new CourseController();