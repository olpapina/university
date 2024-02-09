import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import log4js from '../middlewares/log4js';
import StatusCodeError from '../middlewares/statusCodeError';

const logger = log4js.getLogger("file");

class UserController {

  async createUser(req: Request, res: Response, next: NextFunction) {
    const { username, password, role } = req.body;
    logger.info(username, password);
    const newUser = new User({
      username,
      password,
      role
    });

    try {
      const savedUser = await newUser.save();
      res
        .status(201)
        .json(savedUser);
      logger.info(`User was successfully added in the DB - ${savedUser}`);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);

      if (deletedUser) {
        res
          .json(deletedUser);
        logger.info(`User was successfully deleted from the DB`);
      } else {
        throw new StatusCodeError(404, 'User is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      res
        .status(200)
        .json(users);
      logger.info(`User were successfully got from the DB`);
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (user) {
        res
          .status(200)
          .json(user);
        logger.info(`User was successfully got from the DB`);
      } else {
        throw new StatusCodeError(404, 'User is not found');
      }
    } catch (err) {
      if (err instanceof Error) {
        logger.error(err.message)
        return next(err);
      }
    }
  }
}

export default new UserController();