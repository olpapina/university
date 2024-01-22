import express from 'express';
import HomeController from '../controllers/homeController';

const router = express.Router();

router.get('/home', HomeController.getInfoHomePage);

router.get('/home?q=:title', HomeController.getUniversityByName);

router.get('/faculties', (req, res) => {
    res.render('faculties', { pageTitle: 'Faculties' });
});

router.get('/departments', (req, res) => {
    res.render('departments', { pageTitle: 'Departments' });
});

router.get('/students', (req, res) => {
    res.render('students', { pageTitle: 'Students' });
});

export default router;