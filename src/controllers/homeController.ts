import { Request, Response, NextFunction } from 'express';
import log4js from '../middlewares/log4js';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { SECRET_KEY } from '../middlewares/verifyToken';
import jwt from 'jsonwebtoken';

const logger = log4js.getLogger("file");

class HomeController {

    async registerUser(req: Request, res: Response, next: NextFunction) {
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
                res.send({ redirectUrl: '/' })
            }

        } catch (error) {
            return res.status(500).json({ error: "An error occurred while creating the user" });
        }
    }

    async isLoggedIn(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) return next();
        res.redirect("/auth/login");
    }

    async loginApp(req: Request, res: Response, next: NextFunction) {
        logger.info(req.body.username, req.body.password);
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                logger.info(`Sucseccfully found ${user}`);
                const isMatch = bcrypt.compareSync(req.body.password, user.password);

                if (isMatch) {
                    logger.info(`Password is approved`);
                    const accessToken = this.generateAccessToken(user.id, user.username, user.role);
                    res.cookie("accessToken", accessToken, { maxAge: 900000, httpOnly: true, });
                    res.send({ redirectUrl: '/' })
                    return user;
                } else {
                    logger.error(`password doesn't match`);
                    res.send({ redirectUrl: '/auth/login' })
                }
            } else {
                logger.info("User doesn't exist");
                res.send({ redirectUrl: '/auth/login' })
            }
        } catch (error) {
            if (error instanceof Error) {
                logger.error(error.message)
                return next(error);
            }
        }
    }
    async generateAccessToken(id:string, username:string, role:string){
        const user = {id, username, role};
        return jwt.sign({user}, SECRET_KEY);
      };

    async logoutApp(req: Request, res: Response, next: NextFunction) {
        res.render("logout", { pageTitle: "Logout" });
    }

    async showRegisterUser(req: Request, res: Response, next: NextFunction) {
        res.render("register", { pageTitle: "Registration" });
    }

    async showLoginForm(req: Request, res: Response, next: NextFunction) {
        res.render("login", { pageTitle: "Login" });
    }
}

export default new HomeController();