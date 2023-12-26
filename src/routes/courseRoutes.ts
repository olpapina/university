import express from 'express';
import CourseController from '../controllers/courseController';

const router = express.Router();

router.post('/', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);

export default router;