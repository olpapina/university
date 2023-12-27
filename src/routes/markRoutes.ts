import express from 'express';
import MarkController from '../controllers/markController';

const router = express.Router();

router.post('/', MarkController.createMark);
router.put('/:id', MarkController.updateMark);
router.delete('/:id', MarkController.deleteMark);
router.get('/', MarkController.getAllMarks);
router.get('/:id', MarkController.getMarkById);

export default router;