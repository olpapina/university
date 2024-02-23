/**
 * @swagger
 * components:
 *  schemas:
 *      Lecturers:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - faculty
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generated id of the lecturer
 *              firstName:
 *                  type: string
 *                  description: the name of the lecturer
 *              lastName:
 *                  type: string
 *                  description: the name of the lecturer
 *              faculty:
 *                  type: object
 *                  description: the faculty where the lecturer teaches
 *              courses:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: the courses where the lecturer teaches
 */

/**
 * @swagger
 * tags:
 *  name: Lecturers
 *  description: The lecturers managing API
 */

/**
 * @swagger
 * /api/lecturers:
 *  get:
 *    summary: Get all lecturers
 *    tags: [Lecturers]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Lecturers'
 *
 *  post:
 *    summary: Create a new lecturer
 *    tags: [Lecturers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Lecturers'
 *    responses:
 *      201:
 *        description: Successful created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Lecturers'
 *      400:
 *        description: Invalid input
 *
 * /api/lecturers/{id}:
 *  put:
 *    summary: Update a lecturer by ID
 *    tags: [Lecturers]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the lecturer to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Lecturers'
 *    responses:
 *      200:
 *        description: Successful updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Lecturers'
 *      404:
 *        description: Lecturer ID is not found
 *      500:
 *        description: Internal Server Error
 * 
 *  get:
 *    summary: Geta lecturer by ID
 *    tags: [Lecturers]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the lecturer to get
 *    responses:
 *      200:
 *        description: Successfully got
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Lecturers'
 *      404:
 *        description: Lecturer ID is not found
 *      500:
 *        description: Internal Server Error
 *
 *  delete:
 *    summary: Delete a lecturer by ID
 *    tags: [Lecturers]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the lecturer to delete
 *    responses:
 *      200:
 *        description: Successfully delete
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Lecturers'
 *      404:
 *        description: Lecturer ID is not found
 *      500:
 *        description: Internal Server Error
 */

import express from 'express';
import LecturerController from '../controllers/lecturerController';

const router = express.Router();

router.post('/', LecturerController.createLecturer);
router.put('/:id', LecturerController.updateLecturer);
router.delete('/:id', LecturerController.deleteLecturer);
router.get('/', LecturerController.getAllLecturers);
router.get('/:id', LecturerController.getLecturerById);

export default router;