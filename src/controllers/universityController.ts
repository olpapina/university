import { Request, Response, Next } from 'express';
import University from '../models/university';
import log4js from '../middlewares/log4js';
import statusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class UniversityController {

    async createUniversity(req: Request, res: Response, next: Next) {

        const { title, address, faculties } = req.body;

        const newUniversity = new University({
            title,
            address,
            faculties
        });

        try {
            const savedUniversity = await newUniversity.save();
            res
                .status(201)
                .json(savedUniversity);
            logger.info(`University was successfully added in the DB - ${savedUniversity}`);
        } catch (err) {
            return next(err);
        }
    }

    async updateUniversity(req: Request, res: Response, next: Next) {
        const universityId = req.params.id;
        const { title, address, faculties } = req.body;
        try {
            const updatedUniversity = await University.findByIdAndUpdate(
                universityId,
                { title, address, faculties },
                { new: true }
            );

            if (updatedUniversity) {
                res
                    .status(200)
                    .json(updatedUniversity);
                logger.info(`University was successfully updated in the DB - ${updatedUniversity}`);
            } else {
                throw new statusCodeError(404, 'University is not found');
            }
        } catch (err) {
            return next(err);
        }
    }

    async deleteUniversity(req: Request, res: Response, next: Next) {
        const universityId = req.params.id;

        try {
            const deletedUniversity = await University.findByIdAndDelete(universityId);

            if (deletedUniversity) {
                res
                    .json(deletedUniversity);
                logger.info(`University was successfully deleted from the DB`);
            } else {
                throw new statusCodeError(404, 'University is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
    async getAllUniversities(req: Request, res: Response, next: Next) {
        try {
            const universities = await University.find();
            res
                .status(200)
                .json(universities);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async getUniversityById(req: Request, res: Response, next: Next) {
        const universityId = req.params.id;

        try {
            const university = await University.findById(universityId);
            if (university) {
                res
                    .status(200)
                    .json(university);
            } else {
                throw new statusCodeError(404, 'University is not found');
            }
        } catch (err) {
            return next(err);
        }
    }
}

export default new UniversityController();