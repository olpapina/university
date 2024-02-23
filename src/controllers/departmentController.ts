import { Request, Response, NextFunction } from 'express';
import Department from '../models/department';
import log4js from '../middlewares/log4js';
import StatusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class DepartmentController {

  async createDepartment(req: Request, res: Response, next: NextFunction) {

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
      logger.info(`Department was successfully added in the DB - ${savedDepartment}`);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async updateDepartment(req: Request, res: Response, next: NextFunction) {
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
        logger.info(`Department was successfully updated in the DB - ${updatedDepartment}`);
      } else {
        throw new StatusCodeError(404, 'Department is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    const departmentId = req.params.id;

    try {
      const deletedDepartment = await Department.findByIdAndDelete(departmentId);

      if (deletedDepartment) {
        res
          .json(deletedDepartment);
        logger.info(`Department was successfully deleted from the DB`);
      } else {
        throw new StatusCodeError(404, 'Department is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async getAllDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await Department.find();
      res
        .status(200)
        .json(departments);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async getDepartmentById(req: Request, res: Response, next: NextFunction) {
    const departmentId = req.params.id;

    try {
      const department = await Department.findById(departmentId);
      if (department) {
        res
          .status(200)
          .json(department);
      } else {
        throw new StatusCodeError(404, 'Department is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }
}

export default new DepartmentController();