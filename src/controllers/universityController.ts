import { Request, Response } from 'express';
import University from '../models/university';

class UniversityController {

    async createUniversity(req: Request, res: Response) {

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
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async updateUniversity(req: Request, res: Response) {
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
            } else {
                res.status(404).json({ message: 'University is not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async deleteUniversity(req: Request, res: Response) {
        const universityId = req.params.id;

        try {
            const deletedUniversity = await University.findByIdAndDelete(universityId);

            if (deletedUniversity) {
                res
                .json(deletedUniversity);
            } else {
                res.status(404).json({ message: 'University is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
    async getAllUniversities(req: Request, res: Response) {
        try {
            const universities = await University.find();
            res
            .status(200)
            .json(universities);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async getUniversityById(req: Request, res: Response) {
        const universityId = req.params.id;

        try {
            const university = await University.findById(universityId);
            if (university) {
                res
                .status(200)
                .json(university);
            } else {
                res.status(404).json({ message: 'University is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
}

export default new UniversityController();