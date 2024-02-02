import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/', UserController.createUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

export default router;