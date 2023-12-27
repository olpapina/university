import express from 'express';
import FacultyController from '../controllers/facultyController';

const router = express.Router();

router.post('/', FacultyController.createFaculty);
router.put('/:id', FacultyController.updateFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getFacultyById);

export default router;