import express from 'express';
import PagesController from '../controllers/pagesController';
import HomeController from '../controllers/homeController';

const router = express.Router();

router.get('/universities', PagesController.getInfoUniversitiesPage);

router.get('/universities?q=:title', PagesController.getInfoUniversitiesPage);

router.get('/faculties', PagesController.getInfoFacultiesPage);

router.get('/departments',PagesController.getInfoDepertmentPage);

router.get('/students', PagesController.getInfoStudentPage);

router.get("/", HomeController.showHomePage);

router.get("/register", HomeController.showRegisterUser);

router.post("/register", HomeController.registerUser);

router.get('/login', HomeController.showLoginForm);

router.post('./login', HomeController.loginApp)

router.get('./logout', HomeController.logoutApp);

router.get("/users", HomeController.registerUser);

export default router;