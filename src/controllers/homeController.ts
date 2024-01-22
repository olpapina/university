import { Request, Response, NextFunction } from 'express';
import log4js from '../middlewares/log4js';
import University from '../models/university';
import Faculty from '../models/faculty';
import Department from '../models/department';
import Student from '../models/student';

const logger = log4js.getLogger("file");

class HomeController {
    async getInfoHomePage(req: Request, res: Response, next: NextFunction) {
        try {
            const universities = await University.find();
            const faculties = await Faculty.find();
            const departments = await Department.find();
            const students = await Student.find();
            res.render('home', { pageTitle: 'home', univerQuantity: universities.length, facultyQuantity: faculties.length, departmentQuantity: departments.length, studentQuantity: students.length });
            
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async getUniversityByName(req: Request, res: Response, next: NextFunction) {
        const title = req.query.title as string;
        
            try {
                const university = await University.findOne({ title: title.toLowerCase() })
                .populate('faculties');
            if (university) {
                // @ts-ignore
                const facultyTitles = university.faculties.map(faculty => faculty.title);
                res.render('home', { title: "university.title", address: university.address, faculties: facultyTitles });
            } else {
                res.render('home', { message: `University with ${title} name is not found` });
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