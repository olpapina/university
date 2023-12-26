import express from 'express';
import SubjectController from '../controllers/subjectController';

const router = express.Router();

router.post('/', SubjectController.createSubject);
router.put('/:id', SubjectController.updateSubject);
router.delete('/:id', SubjectController.deleteSubject);
router.get('/', SubjectController.getAllSubjects);
router.get('/:id', SubjectController.getSubjectById);

export default router;