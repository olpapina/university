import { Request, Response } from 'express';
import Student from '../models/student';

class StudentController {

    async createStudent(req: Request, res: Response) {

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
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async updateStudent(req: Request, res: Response) {
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
            } else {
                res.status(404).json({ message: 'Student is not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async deleteStudent(req: Request, res: Response) {
        const studentId = req.params.id;

        try {
            const deletedStudent = await Student.findByIdAndDelete(studentId);

            if (deletedStudent) {
                res
                    .json(deletedStudent);
            } else {
                res.status(404).json({ message: 'Student is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
    async getAllStudents(req: Request, res: Response) {
        try {
            const students = await Student.find();
            res
                .status(200)
                .json(students);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async getStudentById(req: Request, res: Response) {
        const studentId = req.params.id;

        try {
            const student = await Student.findById(studentId);
            if (student) {
                res
                    .status(200)
                    .json(student);
            } else {
                res.status(404).json({ message: 'Student is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
}

export default new StudentController();