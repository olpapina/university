import { Request, Response, Next } from "express";
import statusCodeError from "../middlewares/statusCodeError";
import log4js from "./log4js";

class ErrorHandler {

    public static errorHandler(err: Error | statusCodeError, req: Request, res: Response, next: Next) {
        const logger = log4js.getLogger("file");
        if (res.headersSent) {
            return next(err)
        }
        logger.error(err);
        res.status((err as statusCodeError).statusCode);
        res.render('error', { message: err.message, error: err })
    }
}

export default ErrorHandler;