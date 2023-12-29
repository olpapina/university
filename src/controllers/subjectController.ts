import { Request, Response, Next } from 'express';
import Subject from '../models/subject';
import log4js from '../middlewares/log4js';
import statusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class SubjectController {


    async createSubject(req: Request, res: Response, next: Next) {
        const { title, quantityOfHour, lecturer } = req.body;

        const newSubject = new Subject({
            title,
            quantityOfHour,
            lecturer
        });

        try {
            const savedSubject = await newSubject.save();
            res
                .status(201)
                .json(savedSubject);
            logger.info(`Subject was successfully added in the DB - ${savedSubject}`);
        } catch (err) {
            return next(err);
        }
    }

    async updateSubject(req: Request, res: Response, next: Next) {
        const subjectId = req.params.id;
        const { title, quantityOfHour, lecturer } = req.body;

        try {
            const updatedSubject = await Subject.findByIdAndUpdate(
                subjectId,
                { title, quantityOfHour, lecturer },
                { new: true }
            );

            if (updatedSubject) {
                res
                    .status(200)
                    .json(updatedSubject);
                logger.info(`Subject was successfully updated in the DB - ${updatedSubject}`);
            } else {
                throw new statusCodeError(404, 'Subject is not found');
            }
        } catch (err) {
            return next(err);
        }
    }

    async deleteSubject(req: Request, res: Response, next: Next) {
        const subjectId = req.params.id;

        try {
            const deletedSubject = await Subject.findByIdAndDelete(subjectId);

            if (deletedSubject) {
                res.json(deletedSubject);
                logger.info(`Subject was successfully deleted from the DB`);
            } else {
                throw new statusCodeError(404, 'Subject is not found');
            }
        } catch (err) {
            return next(err);
        }
    }

    async getAllSubjects(req: Request, res: Response, next: Next) {
        try {
            const subjects = await Subject.find();
            res
                .status(200)
                .json(subjects);
        } catch (err) {
            return next(err);
        }
    }

    async getSubjectById(req: Request, res: Response, next: Next) {
        const subjectId = req.params.id;

        try {
            const subject = await Subject.findById(subjectId);
            if (subject) {
                res
                    .status(200)
                    .json(subject);
            } else {
                throw new statusCodeError(404, 'Subject is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
}

export default new SubjectController();