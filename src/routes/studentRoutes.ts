import express from 'express';
import StudentController from '../controllers/studentController';

const router = express.Router();

router.post('/', StudentController.createStudent);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getStudentById);

export default router;