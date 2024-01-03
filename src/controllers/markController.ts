import { Request, Response, Next } from 'express';
import Mark from '../models/mark';
import log4js from '../middlewares/log4js';
import statusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class MarkController {

    async createMark(req: Request, res: Response, next: Next) {

        const { title, magnitude } = req.body;

        const newMark = new Mark({
            title,
            magnitude
        });

        try {
            const savedMark = await newMark.save();
            res
                .status(201)
                .json(savedMark);
            logger.info(`Mark was successfully added in the DB - ${savedMark}`);
        } catch (err) {
            return next(err);
        }
    }

    async updateMark(req: Request, res: Response, next: Next) {
        const markId = req.params.id;
        const { title, magnitude } = req.body;
        try {
            const updatedMark = await Mark.findByIdAndUpdate(
                markId,
                { title, magnitude },
                { new: true }
            );

            if (updatedMark) {
                res
                    .status(200)
                    .json(updatedMark);
                logger.info(`Mark was successfully updated in the DB - ${updatedMark}`);
            } else {
                throw new statusCodeError(404, 'Mark is not found');
            }
        } catch (err) {
            return next(err);
        }
    }

    async deleteMark(req: Request, res: Response, next: Next) {
        const markId = req.params.id;

        try {
            const deletedMark = await Mark.findByIdAndDelete(markId);

            if (deletedMark) {
                res
                    .json(deletedMark);
                logger.info(`Mark was successfully deleted from the DB`);
            } else {
                throw new statusCodeError(404, 'Mark is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
    async getAllMarks(req: Request, res: Response) {
        try {
            const marks = await Mark.find();
            res
                .status(200)
                .json(marks);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async getMarkById(req: Request, res: Response, next: Next) {
        const markId = req.params.id;

        try {
            const mark = await Mark.findById(markId);
            if (mark) {
                res
                    .status(200)
                    .json(mark);
            } else {
                throw new statusCodeError(404, 'Mark is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
}

export default new MarkController();