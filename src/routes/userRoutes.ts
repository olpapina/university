/**
 * @swagger
 * components:
 *  schemas:
 *      Users:
 *          type: object
 *          required:
 *              - username
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generated id of the user
 *              username:
 *                  type: string
 *                  description: the username of the user
 *              password:
 *                  type: string
 *                  description: the password of the user
 *              role:
 *                  type: string
 *                  description: the role of the string
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Users'
 *
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      201:
 *        description: Successful created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      400:
 *        description: Invalid input
 *
 * /api/users/{id}:
 *  get:
 *    summary: Update a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the user to update
 *    responses:
 *      200:
 *        description: Successful found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: User ID is not found
 *      500:
 *        description: Internal Server Error
 *
 *  delete:
 *    summary: Delete a user by ID
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the user to delete
 *    responses:
 *      200:
 *        description: Successful deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 *      404:
 *        description: User ID is not found
 *      500:
 *        description: Internal Server Error
 */

import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/', UserController.createUser);
router.delete('/:id', UserController.deleteUser);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);

export default router;