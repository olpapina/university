import express from 'express';
import HomeController from '../controllers/homeController';

const router = express.Router();

router.get('/register', HomeController.showRegisterUser);
router.post('/register', HomeController.registerUser);
router.get('/login', HomeController.showLoginForm);
router.post('/login', HomeController.loginApp);
router.get('/logout', HomeController.logoutApp);

export default router;