import express from 'express';
import UniversityController from '../controllers/universityController';

const router = express.Router();

router.post('/', UniversityController.createUniversity);
router.put('/:id', UniversityController.updateUniversity);
router.delete('/:id', UniversityController.deleteUniversity);
router.get('/', UniversityController.getAllUniversities);
router.get('/:id', UniversityController.getUniversityById);

export default router;