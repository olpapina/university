import { Request, Response } from 'express';
import Faculty from '../models/faculty';

class FacultyController {

    async createFaculty(req: Request, res: Response) {

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
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async updateFaculty(req: Request, res: Response) {
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
            } else {
                res.status(404).json({ message: 'Faculty is not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async deleteFaculty(req: Request, res: Response) {
        const facultyId = req.params.id;

        try {
            const deletedFaculty = await Faculty.findByIdAndDelete(facultyId);

            if (deletedFaculty) {
                res
                    .json(deletedFaculty);
            } else {
                res.status(404).json({ message: 'Faculty is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
    async getAllFaculty(req: Request, res: Response) {
        try {
            const faculties = await Faculty.find();
            res
                .status(200)
                .json(faculties);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async getFacultyById(req: Request, res: Response) {
        const facultyId = req.params.id;

        try {
            const faculty = await Faculty.findById(facultyId);
            if (faculty) {
                res
                    .status(200)
                    .json(faculty);
            } else {
                res.status(404).json({ message: 'Faculty is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
}

export default new FacultyController();