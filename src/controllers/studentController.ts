import { Request, Response, Next } from 'express';
import Student from '../models/student';
import log4js from '../middlewares/log4js';
import statusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class StudentController {

    async createStudent(req: Request, res: Response, next: Next) {

        const { firstName, lastName, course, marks } = req.body;

        const newStudent = new Student({
            firstName,
            lastName,
            course,
            marks
        });

        try {
            const savedStudent = await newStudent.save();
            res
                .status(201)
                .json(savedStudent);
            logger.info(`Student was successfully added in the DB - ${savedStudent}`);
        } catch (err) {
            return next(err);
        }
    }

    async updateStudent(req: Request, res: Response, next: Next) {
        const studentId = req.params.id;
        const { firstName, lastName, course, marks } = req.body;
        try {
            const updatedStudent = await Student.findByIdAndUpdate(
                studentId,
                { firstName, lastName, course, marks },
                { new: true }
            );

            if (updatedStudent) {
                res
                    .status(200)
                    .json(updatedStudent);
                logger.info(`Student was successfully updated in the DB - ${updatedStudent}`);
            } else {
                throw new statusCodeError(404, 'Student is not found');
            }
        } catch (err) {
            return next(err);
        }
    }

    async deleteStudent(req: Request, res: Response, next: Next) {
        const studentId = req.params.id;

        try {
            const deletedStudent = await Student.findByIdAndDelete(studentId);

            if (deletedStudent) {
                res
                    .json(deletedStudent);
                logger.info(`Student was successfully deleted from the DB`);
            } else {
                throw new statusCodeError(404, 'Student is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
    async getAllStudents(req: Request, res: Response, next: Next) {
        try {
            const students = await Student.find();
            res
                .status(200)
                .json(students);
        } catch (err) {
            return next(err);
        }
    }

    async getStudentById(req: Request, res: Response, next: Next) {
        const studentId = req.params.id;

        try {
            const student = await Student.findById(studentId);
            if (student) {
                res
                    .status(200)
                    .json(student);
            } else {
                throw new statusCodeError(404, 'Student is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
}

export default new StudentController();