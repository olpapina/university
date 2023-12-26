import express from 'express';
import LecturerController from '../controllers/lecturerController';

const router = express.Router();

router.post('/', LecturerController.createLecturer);
router.put('/:id', LecturerController.updateLecturer);
router.delete('/:id', LecturerController.deleteLecturer);
router.get('/', LecturerController.getAllLecturers);
router.get('/:id', LecturerController.getLecturerById);

export default router;