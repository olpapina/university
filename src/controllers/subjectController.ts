import { Request, Response, NextFunction } from 'express';
import Subject from '../models/subject';
import log4js from '../middlewares/log4js';
import StatusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class SubjectController {


    async createSubject(req: Request, res: Response, next: NextFunction) {
        const { title, quantityOfHours, lecturer } = req.body;

        const newSubject = new Subject({
            title,
            quantityOfHours,
            lecturer
        });

        try {
            const savedSubject = await newSubject.save();
            res
                .status(201)
                .json(savedSubject);
            logger.info(`Subject was successfully added in the DB - ${savedSubject}`);
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async updateSubject(req: Request, res: Response, next: NextFunction) {
        const subjectId = req.params.id;
        const { title, quantityOfHours, lecturer } = req.body;

        try {
            const updatedSubject = await Subject.findByIdAndUpdate(
                subjectId,
                { title, quantityOfHours, lecturer },
                { new: true }
            );

            if (updatedSubject) {
                res
                    .status(200)
                    .json(updatedSubject);
                logger.info(`Subject was successfully updated in the DB - ${updatedSubject}`);
            } else {
                throw new StatusCodeError(404, 'Subject is not found');
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async deleteSubject(req: Request, res: Response, next: NextFunction) {
        const subjectId = req.params.id;

        try {
            const deletedSubject = await Subject.findByIdAndDelete(subjectId);

            if (deletedSubject) {
                res.json(deletedSubject);
                logger.info(`Subject was successfully deleted from the DB`);
            } else {
                throw new StatusCodeError(404, 'Subject is not found');
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async getAllSubjects(req: Request, res: Response, next: NextFunction) {
        try {
            const subjects = await Subject.find();
            res
                .status(200)
                .json(subjects);
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }

    async getSubjectById(req: Request, res: Response, next: NextFunction) {
        const subjectId = req.params.id;

        try {
            const subject = await Subject.findById(subjectId);
            if (subject) {
                res
                    .status(200)
                    .json(subject);
            } else {
                throw new StatusCodeError(404, 'Subject is not found');
            }
        } catch (err) {
            if (err instanceof Error) {
                logger.error(err.message)
                return next(err);
            }
        }
    }
}

export default new SubjectController();