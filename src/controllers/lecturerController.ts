import { Request, Response } from 'express';
import Lecturer from '../models/lecturer';

class LecturerController {

    async createLecturer(req: Request, res: Response) {
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
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async updateLecturer(req: Request, res: Response) {
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
            } else {
                res.status(404).json({ message: 'Lecturer is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async deleteLecturer(req: Request, res: Response) {
        const lecturerId = req.params.id;

        try {
            const deletedLecturer = await Lecturer.findByIdAndDelete(lecturerId);

            if (deletedLecturer) {
                res
                .json(deletedLecturer);
            } else {
                res.status(404).json({ message: 'Lecturer is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
    async getAllLecturers(req: Request, res: Response) {
        try {
            const lecturers = await Lecturer.find();
            res
            .status(200)
            .json(lecturers);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async getLecturerById(req: Request, res: Response) {
        const lecturerId = req.params.id;

        try {
            const lecturer = await Lecturer.findById(lecturerId);
            if (lecturer) {
                res
                .status(200)
                .json(lecturer);
            } else {
                res.status(404).json({ message: 'Lecturer is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
}

export default new LecturerController();