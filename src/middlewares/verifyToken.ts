import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import log4js from './log4js';
import User from 'src/models/user';
import { DocumentType } from '@typegoose/typegoose';

const logger = log4js.getLogger("file");

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  user?: DocumentType<typeof User>;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info("Token verification");
    const cookieHeader = req.headers.cookie;
    logger.info(cookieHeader);
    if (cookieHeader) {
      const token = cookieHeader.split('universityCookie=')[1].split(';')[0];
      logger.info(token);
      if (!token) {
        logger.info("Redirect becausRedirect because user is not authorized");
        res.redirect("/auth/login");
      } else {
        logger.info("User is authorized");
        const SECRET_KEY = process.env.SECRET_KEY || "";
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;
      }
      next();
    } else {
      logger.info("Cookie doesn't exist");
      res.redirect("/auth/login");
    }
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message)
      return next(err);
    }
  }
}