/**
 * @swagger
 * components:
 *  schemas:
 *      Marks:
 *          type: object
 *          required:
 *              - title
 *              - magnitude
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generated id of the mark
 *              title:
 *                  type: string
 *                  description: the title of the mark
 *              magnitude:
 *                  type: number
 *                  description: the magnitude of the mark
 */

/**
 * @swagger
 * tags:
 *  name: Marks
 *  description: The marks managing API
 */

/**
 * @swagger
 * /api/marks:
 *  get:
 *    summary: Get all marks
 *    tags: [Marks]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Marks'
 *
 *  post:
 *    summary: Create a new mark
 *    tags: [Marks]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Marks'
 *    responses:
 *      201:
 *        description: Successful created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Marks'
 *      400:
 *        description: Invalid input
 *
 * /api/marks/{id}:
 *  put:
 *    summary: Update a mark by ID
 *    tags: [Marks]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the mark to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Marks'
 *    responses:
 *      200:
 *        description: Successful updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Marks'
 *      404:
 *        description: Mark ID is not found
 *      500:
 *        description: Internal Server Error
 * 
 *  get:
 *    summary: Get a mark by ID
 *    tags: [Marks]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the mark to Get
 *    responses:
 *      200:
 *        description: Successful got
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Marks'
 *      404:
 *        description: Mark ID is not found
 *      500:
 *        description: Internal Server Error
 *
 *  delete:
 *    summary: Delete a mark by ID
 *    tags: [Marks]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the mark to delete
 *    responses:
 *      200:
 *        description: Successful deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Marks'
 *      404:
 *        description: Mark ID is not found
 *      500:
 *        description: Internal Server Error
 */

import express from 'express';
import MarkController from '../controllers/markController';

const router = express.Router();

router.post('/', MarkController.createMark);
router.put('/:id', MarkController.updateMark);
router.delete('/:id', MarkController.deleteMark);
router.get('/', MarkController.getAllMarks);
router.get('/:id', MarkController.getMarkById);

export default router;