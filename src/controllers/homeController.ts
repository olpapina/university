import { Request, Response, NextFunction } from 'express';
import log4js from '../middlewares/log4js';
import University from '../models/university';
import Faculty from '../models/faculty';
import Department from '../models/department';
import Student from '../models/student';

const logger = log4js.getLogger("file");

class HomeController {
    async getInfoHomePage(req: Request, res: Response, next: NextFunction) {
        const titleUniver = req.query.q as string;
        try {
            const universities = await University.find();
            const faculties = await Faculty.find();
            const departments = await Department.find();
            const students = await Student.find();
            if (titleUniver == undefined) {
                res.render('home', { pageTitle: 'home', univerQuantity: universities.length, facultyQuantity: faculties.length, departmentQuantity: departments.length, studentQuantity: students.length });
            } else {
                const university = await University.findOne({ title: titleUniver })
                    .populate('faculties');
                if (university) {
                    // @ts-ignore
                    const facultyTitles = university.faculties.map(faculty => faculty.title);
                    res.render('home', { pageTitle: 'home', univerQuantity: universities.length, facultyQuantity: faculties.length, departmentQuantity: departments.length, studentQuantity: students.length, title: university.title, address: university.address, faculties: facultyTitles });
                } else {
                    res.render('home', { pageTitle: 'home', univerQuantity: universities.length, facultyQuantity: faculties.length, departmentQuantity: departments.length, studentQuantity: students.length, message: `University with "${titleUniver}" name is not found` });
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async getInfoFacultiesPage(req: Request, res: Response, next: NextFunction) {
        try {
            let facultyTitles: string[] = [];
            const faculties = await Faculty.find();
            if (faculties) {
                faculties.forEach(item => facultyTitles.push(item.title));
            }
            res.render('faculties', { pageTitle: 'Faculties', faculties: facultyTitles });
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async getInfoDepertmentPage(req: Request, res: Response, next: NextFunction) {
        try {
            let departmentTitles: string[] = [];
            const departments = await Department.find();
            if (departments) {
                departments.forEach(item => departmentTitles.push(item.title));
            }
            res.render('departments', { pageTitle: 'Departments', departments: departmentTitles });
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async getInfoStudentPage(req: Request, res: Response, next: NextFunction) {
        const studentName = req.query.name as string;
        const studentLastName = req.query.lastname as string;
        try {
            let studentLastNames: string[] = [];
            const students = await Student.find();
            if (students) {
                students.forEach(item => studentLastNames.push(item.lastName));
            }
            if (studentName == undefined && studentLastName == undefined) {
                res.render('students', { pageTitle: 'Students', studentQuantity: students.length, lastNames: studentLastNames });
            } else {
                const student = await Student.findOne({ firstName: studentName, lastName: studentLastName })
                    .populate('marks');
                if (student) {
                    // @ts-ignore
                    const studentMarks = student.marks.map(mark => mark.magnitude);
                    function calculateAverage(array: any) {
                        var sum = 0;
                        for (var i = 0; i < array.length; i++) {
                            sum += array[i];
                        }
                        return sum / array.length;
                    }
                    const averageMark = calculateAverage(studentMarks);
                    res.render('students', { pageTitle: 'Students', studentQuantity: students.length, lastNames: studentLastNames, studentName: student.firstName, studentLastName: student.lastName, studentRating: averageMark });
                } else {
                    res.render('students', { pageTitle: 'Students', studentQuantity: students.length, lastNames: studentLastNames, message: `Student, ${studentName} ${studentLastName}, is not found` });
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }
}

export default new HomeController();