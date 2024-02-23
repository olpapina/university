import express from 'express';
import PagesController from '../controllers/pagesController';
import { auth } from '../middlewares/verifyToken'

const router = express.Router();

router.get('/universities', auth, PagesController.getInfoUniversitiesPage);
router.get('/universities?q=:title', auth, PagesController.getInfoUniversitiesPage);
router.get('/faculties', auth, PagesController.getInfoFacultiesPage);
router.get('/departments', auth, PagesController.getInfoDepertmentPage);
router.get('/students', auth, PagesController.getInfoStudentPage);
router.get('/', auth, PagesController.showHomePage);

export default router;