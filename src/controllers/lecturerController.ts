import { Request, Response, NextFunction } from 'express';
import Lecturer from '../models/lecturer';
import log4js from '../middlewares/log4js';
import statusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class LecturerController {

    async createLecturer(req: Request, res: Response, next: NextFunction) {
        const { firstName, lastName, faculty, courses, workTime } = req.body;

        const newLecturer = new Lecturer({
            firstName,
            lastName,
            faculty,
            courses,
            workTime
        });

        try {
            const savedLecturer = await newLecturer.save();
            res
                .status(201)
                .json(savedLecturer);
            logger.info(`Lecturer was successfully added in the DB - ${savedLecturer}`);
        } catch (err) {
            return next(err);
        }
    }

    async updateLecturer(req: Request, res: Response, next: NextFunction) {
        const lecturerId = req.params.id;
        const { firstName, lastName, faculty, courses, workTime } = req.body;

        try {
            const updatedLecturer = await Lecturer.findByIdAndUpdate(
                lecturerId,
                { firstName, lastName, faculty, courses, workTime },
                { new: true }
            );

            if (updatedLecturer) {
                res
                    .status(200)
                    .json(updatedLecturer);
                logger.info(`Lecturer was successfully updated in the DB - ${updatedLecturer}`);
            } else {
                throw new statusCodeError(404, 'Lecturer is not found');
            }
        } catch (err) {
            return next(err);
        }
    }

    async deleteLecturer(req: Request, res: Response, next: NextFunction) {
        const lecturerId = req.params.id;

        try {
            const deletedLecturer = await Lecturer.findByIdAndDelete(lecturerId);

            if (deletedLecturer) {
                res
                    .json(deletedLecturer);
                logger.info(`Lecturer was successfully deleted from the DB`);
            } else {
                throw new statusCodeError(404, 'Lecturer is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
    async getAllLecturers(req: Request, res: Response, next: NextFunction) {
        try {
            const lecturers = await Lecturer.find();
            res
                .status(200)
                .json(lecturers);
        } catch (err) {
            return next(err);
        }
    }

    async getLecturerById(req: Request, res: Response, next: NextFunction) {
        const lecturerId = req.params.id;

        try {
            const lecturer = await Lecturer.findById(lecturerId);
            if (lecturer) {
                res
                    .status(200)
                    .json(lecturer);
            } else {
                throw new statusCodeError(404, 'Lecturer is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
}

export default new LecturerController();