import { Request, Response, NextFunction } from 'express';
import Faculty from '../models/faculty';
import log4js from '../middlewares/log4js';
import statusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class FacultyController {

    async createFaculty(req: Request, res: Response, next: NextFunction) {

        const { title, departments, lecturers } = req.body;

        const newFaculty = new Faculty({
            title,
            departments,
            lecturers
        });

        try {
            const savedFaculty = await newFaculty.save();
            res
                .status(201)
                .json(savedFaculty);
            logger.info(`Faculty was successfully added in the DB - ${savedFaculty}`);
        } catch (err) {
            return next(err);
        }
    }

    async updateFaculty(req: Request, res: Response, next: NextFunction) {
        const facultyId = req.params.id;
        const { title, departments, lecturers } = req.body;
        try {
            const updatedFaculty = await Faculty.findByIdAndUpdate(
                facultyId,
                { title, departments, lecturers },
                { new: true }
            );

            if (updatedFaculty) {
                res
                    .status(200)
                    .json(updatedFaculty);
                logger.info(`Faculty was successfully updated in the DB - ${updatedFaculty}`);
            } else {
                throw new statusCodeError(404, 'Faculty is not found');
            }
        } catch (err) {
            return next(err);
        }
    }

    async deleteFaculty(req: Request, res: Response, next: NextFunction) {
        const facultyId = req.params.id;

        try {
            const deletedFaculty = await Faculty.findByIdAndDelete(facultyId);

            if (deletedFaculty) {
                res
                    .json(deletedFaculty);
                logger.info(`Faculty was successfully deleted from the DB`);
            } else {
                throw new statusCodeError(404, 'Faculty is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
    async getAllFaculty(req: Request, res: Response, next: NextFunction) {
        try {
            const faculties = await Faculty.find();
            res
                .status(200)
                .json(faculties);
        } catch (err) {
            return next(err);
        }
    }

    async getFacultyById(req: Request, res: Response, next: NextFunction) {
        const facultyId = req.params.id;

        try {
            const faculty = await Faculty.findById(facultyId);
            if (faculty) {
                res
                    .status(200)
                    .json(faculty);
            } else {
                throw new statusCodeError(404, 'Faculty is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
}

export default new FacultyController();