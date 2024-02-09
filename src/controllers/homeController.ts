import { Request, Response, NextFunction } from 'express';
import log4js from '../middlewares/log4js';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const logger = log4js.getLogger("file");

class HomeController {

    async registerUser(req: Request, res: Response) {
        const username = req.body.usrname;
        const password = req.body.psw;
        logger.info(username, password);

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        try {
            const newUser = new User({ username, password })
            const user = await newUser.save()
            if (user) {
                logger.info(`Sucseccfully created ${user}`);
                res.redirect('/auth/login');
            }

        } catch (error) {
            return res.status(500).json({ error: "An error occurred while creating the user" });
        }
    }

    async loginApp(req: Request, res: Response, next: NextFunction) {
        const SECRET_KEY = process.env.SECRET_KEY || "";
        logger.info(req.body.username, req.body.password);
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                logger.info(`Sucseccfully found ${user}`);
                const isMatch = bcrypt.compareSync(req.body.password, user.password);
                if (isMatch) {
                    logger.info(`Password is approved`);
                    const token = jwt.sign({ _id: user._id?.toString(), username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '400m' });
                    res.cookie('universityCookie', token, { maxAge: 900000, httpOnly: true });
                    logger.info(`${token}`);
                    res.redirect('/');
                } else {
                    logger.error(`Password doesn't match`);
                    res.redirect('/auth/login');
                }
            } else {
                logger.info("User doesn't exist");
                res.redirect('/auth/login');
            }
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message)
                return next(error);
            }
        }
    }

    async logoutApp(req: Request, res: Response) {
        res.clearCookie("universityCookie");
        res.render("logout", { pageTitle: "Logout" });
    }

    async showRegisterUser(req: Request, res: Response) {
        res.render("register", { pageTitle: "Registration" });
    }

    async showLoginForm(req: Request, res: Response) {
        res.render("login", { pageTitle: "Login" });
    }
}

export default new HomeController();