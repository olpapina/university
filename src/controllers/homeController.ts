import { Request, Response, NextFunction } from 'express';
import log4js from '../middlewares/log4js';
import User from '../models/user';

const logger = log4js.getLogger("file");

class HomeController {
    
    async registerUser(req: Request, res: Response, next: NextFunction) {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        return res.status(200).json(user);
    }

    async isLoggedIn(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) return next(); 
        res.redirect("/login");
    }

    async loginApp(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                const result = req.body.password === user.password;
                if (result) {
                    res.render("secret");
                } else {
                    res.status(400).json({ error: "password doesn't match" });
                }
            } else {
                res.status(400).json({ error: "User doesn't exist" });
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    async logoutApp(req: Request, res: Response, next: NextFunction) {
        res.redirect("/login");
    }

    async showHomePage(req: Request, res: Response, next: NextFunction) {
        if(req.isAuthenticated()) {  
            res.send("You have already logged in. No need to login again"); 
        } else { 
        res.render("home", {pageTitle: "Home"} );
    }
    }

    async showRegisterUser(req: Request, res: Response, next: NextFunction) {
        res.render("register", {pageTitle: "Registration"});
    }

    async showLoginForm(req: Request, res: Response, next: NextFunction) {
        res.render("login", {pageTitle: "Login"});
    }
}

export default new HomeController();