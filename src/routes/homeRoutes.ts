import express from 'express';
import HomeController from '../controllers/homeController';

const router = express.Router();

router.get('/home', HomeController.getInfoHomePage);

router.get('/home?q=:title', HomeController.getInfoHomePage);

router.get('/faculties', HomeController.getInfoFacultiesPage);

router.get('/departments', HomeController.getInfoDepertmentPage);

router.get('/students', (req, res) => {
    res.render('students', { pageTitle: 'Students' });
});

export default router;