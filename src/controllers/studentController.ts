import { Request, Response, NextFunction } from 'express';
import Student from '../models/student';
import log4js from '../middlewares/log4js';
import StatusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class StudentController {

  async createStudent(req: Request, res: Response, next: NextFunction) {
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
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async updateStudent(req: Request, res: Response, next: NextFunction) {
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
        throw new StatusCodeError(404, 'Student is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async deleteStudent(req: Request, res: Response, next: NextFunction) {
    const studentId = req.params.id;
    try {
      const deletedStudent = await Student.findByIdAndDelete(studentId);

      if (deletedStudent) {
        res
          .json(deletedStudent);
        logger.info(`Student was successfully deleted from the DB`);
      } else {
        throw new StatusCodeError(404, 'Student is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async getAllStudents(req: Request, res: Response, next: NextFunction) {
    const courseTitle = req.query.course as string;
    const markMagnitude = req.query.mark as string;
    logger.info(courseTitle, markMagnitude);
    if (courseTitle == undefined && markMagnitude == undefined) {
      try {
        const students = await Student.find();
        res
          .status(200)
          .json(students);
      } catch (err) {
        if (err instanceof Error) {
          logger.error(err.message)
          return next(err);
        }
      }
    } else {
      try {
        const students = await Student.find()
          .populate({ path: 'course', match: { title: courseTitle.toLowerCase() } })
          .populate({ path: 'marks' }).exec();
        const filteredStudents = students.reduce((filteredStudents, student) => {
          // @ts-ignore
          if (student.course && student.marks.some((mark) => mark.magnitude === parseInt(markMagnitude))) {
            filteredStudents.push(student);
          }
          return filteredStudents;
        }, [] as typeof students)

        if (filteredStudents) {
          res
            .status(200)
            .json(filteredStudents);

        } else {
          throw new StatusCodeError(404, 'Students are not found');
        }
      } catch (err) {
        if (err instanceof Error) {
          logger.error(err.message)
          return next(err);
        }
      }
    }
  }

  async getStudentById(req: Request, res: Response, next: NextFunction) {
    const studentId = req.params.id;
    try {
      const student = await Student.findById(studentId);
      if (student) {
        res
          .status(200)
          .json(student);
      } else {
        throw new StatusCodeError(404, 'Student is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async getMarksOfStudent(req: Request, res: Response, next: NextFunction) {
    const studentId = req.params.id;
    try {
      const student = await Student.findById(studentId).select('_id, marks').exec();
      if (student) {
        res
          .status(200)
          .json(student);
      } else {
        throw new StatusCodeError(404, 'Student is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }
}

export default new StudentController();