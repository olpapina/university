import express from 'express';
import PagesController from '../controllers/pagesController';

const router = express.Router();

router.get('/universities', PagesController.getInfoUniversitiesPage);
router.get('/universities?q=:title', PagesController.getInfoUniversitiesPage);
router.get('/faculties', PagesController.getInfoFacultiesPage);
router.get('/departments',PagesController.getInfoDepertmentPage);
router.get('/students', PagesController.getInfoStudentPage);
router.get('/', PagesController.showHomePage);

export default router;