/**
 * @swagger
 * components:
 *  schemas:
 *      Faculties:
 *          type: object
 *          required:
 *              - title
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the auto-generated id of the faculty
 *              title:
 *                  type: string
 *                  description: the title of the faculty
 *              departments:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: the departments of the faculty
 *              lecturers:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: the lecturers of the faculty
 */

/**
 * @swagger
 * tags:
 *  name: Faculties
 *  description: The faculties managing API
 */

/**
 *  @swagger
 * /api/faculties:
 *  get:
 *    summary: Get all faculties
 *    tags: [Faculties]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Faculties'
 *
 *  post:
 *    summary: Create a new faculty
 *    tags: [Faculties]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Faculties'
 *    responses:
 *      201:
 *        description: Successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Faculties'
 *      400:
 *        description: Invalid input
 *
 * /api/faculties/{id}:
 *  put:
 *    summary: Update a faculty by ID
 *    tags: [Faculties]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the faculty to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Faculties'
 *    responses:
 *      200:
 *        description: Successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Faculties'
 *      404:
 *        description: Faculty ID is not found
 *      500:
 *        description: Internal Server Error
 *
 *  get:
 *    summary: Update a faculty by ID
 *    tags: [Faculties]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the faculty to update
 *    responses:
 *      200:
 *        description: Successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Faculties'
 *      404:
 *        description: Lecturer ID is not found
 *      500:
 *        description: Internal Server Error
 * 
 *  delete:
 *    summary: Delete a faculty by ID
 *    tags: [Faculties]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the faculty to delete
 *    responses:
 *      200:
 *        description: Successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Faculties'
 *      404:
 *        description: Lecturer ID is not found
 *      500:
 *        description: Internal Server Error
 */

import express from 'express';
import FacultyController from '../controllers/facultyController';

const router = express.Router();

router.post('/', FacultyController.createFaculty);
router.put('/:id', FacultyController.updateFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculty);
router.get('/:id', FacultyController.getFacultyById);

export default router;