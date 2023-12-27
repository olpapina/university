import { Request, Response } from 'express';
import Department from '../models/department';

class DepartmentController {

    async createDepartment(req: Request, res: Response) {

        const { title, courses } = req.body;

        const newDepartment = new Department({
            title,
            courses
        });

        try {
            const savedDepartment = await newDepartment.save();
            res
                .status(201)
                .json(savedDepartment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async updateDepartment(req: Request, res: Response) {
        const departmentId = req.params.id;
        const { title, courses } = req.body;
        try {
            const updatedDepartment = await Department.findByIdAndUpdate(
                departmentId,
                { title, courses },
                { new: true }
            );

            if (updatedDepartment) {
                res
                    .status(200)
                    .json(updatedDepartment);
            } else {
                res.status(404).json({ message: 'Department is not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async deleteDepartment(req: Request, res: Response) {
        const departmentId = req.params.id;

        try {
            const deletedDepartment = await Department.findByIdAndDelete(departmentId);

            if (deletedDepartment) {
                res
                    .json(deletedDepartment);
            } else {
                res.status(404).json({ message: 'Department is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
    async getAllDepartments(req: Request, res: Response) {
        try {
            const departments = await Department.find();
            res
                .status(200)
                .json(departments);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }

    async getDepartmentById(req: Request, res: Response) {
        const departmentId = req.params.id;

        try {
            const department = await Department.findById(departmentId);
            if (department) {
                res
                    .status(200)
                    .json(department);
            } else {
                res.status(404).json({ message: 'Department is not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error occurs' });
        }
    }
}

export default new DepartmentController();