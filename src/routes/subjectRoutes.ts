/**
 * @swagger
 * components:
 *  schemas:
 *      Subjects:
 *          type: object
 *          required:
 *              - title
 *              - quantityOfHours
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generated id of the subject
 *              title:
 *                  type: string
 *                  description: the title of the subject
 *              quantityOfHours:
 *                  type: number
 *                  description: the magnitude of the subject
 *              lecturer:
 *                  type: number
 *                  description: the magnitude of the subject
 */

/**
 * @swagger
 * tags:
 *  name: Subjects
 *  description: The subjects managing API
 */

/** 
 * @swagger
 * /api/subjects:
 *  get:
 *    summary: Get all subjects
 *    tags: [Subjects]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Subjects'
 *
 *  post:
 *    summary: Create a new subject
 *    tags: [Subjects]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Subjects'
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Subjects'
 *
 * /api/subjects/{id}:
 *  put:
 *    summary: Update a subject by ID
 *    tags: [Subjects]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the subject to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Subjects'
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Subjects'
 * 
 *  get:
 *    summary:  Get a subject by ID
 *    tags: [Subjects]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the subject to get
 *    responses:
 *      200:
 *        description: Successful got
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Subjects'
 *
 *  delete:
 *    summary: Delete a subject by ID
 *    tags: [Subjects]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the subject to delete
 *    responses:
 *      200:
 *        description: Successful deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Subjects'
 */

import express from 'express';
import SubjectController from '../controllers/subjectController';

const router = express.Router();

router.post('/', SubjectController.createSubject);
router.put('/:id', SubjectController.updateSubject);
router.delete('/:id', SubjectController.deleteSubject);
router.get('/', SubjectController.getAllSubjects);
router.get('/:id', SubjectController.getSubjectById);

export default router;