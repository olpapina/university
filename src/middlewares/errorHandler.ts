import { Request, Response, NextFunction } from "express";
import StatusCodeError from "../middlewares/statusCodeError";
import log4js from "./log4js";

class ErrorHandler {

    public static errorHandler(err: Error | StatusCodeError, req: Request, res: Response, next: NextFunction) {
        const logger = log4js.getLogger("file");
        if (res.headersSent) {
            return next(err)
        }
        if (err instanceof StatusCodeError) {
            logger.error(err);
            res.render('error', { message: err.message, code: (err as StatusCodeError).statusCode })
        }
        else {
            process.exit(1);
        }
    }
}

export default ErrorHandler;