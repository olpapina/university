import { Request, Response } from 'express';
import Mark from '../models/mark';

class MarkController {

    async createMark(req: Request, res: Response) {

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
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async updateMark(req: Request, res: Response) {
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
            } else {
                res.status(404).json({ message: 'Mark is not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async deleteMark(req: Request, res: Response) {
        const markId = req.params.id;

        try {
            const deletedMark = await Mark.findByIdAndDelete(markId);

            if (deletedMark) {
                res
                    .json(deletedMark);
            } else {
                res.status(404).json({ message: 'Mark is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
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

    async getMarkById(req: Request, res: Response) {
        const markId = req.params.id;

        try {
            const mark = await Mark.findById(markId);
            if (mark) {
                res
                    .status(200)
                    .json(mark);
            } else {
                res.status(404).json({ message: 'Mark is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
}

export default new MarkController();