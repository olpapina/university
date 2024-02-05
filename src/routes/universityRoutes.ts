/**
 * @swagger
 * components:
 *  schemas:
 *      Universities:
 *          type: object
 *          required:
 *              - title
 *              - address
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the auto-generated id of the university
 *              title:
 *                  type: string
 *                  description: the title of the university
 *              address:
 *                  type: string
 *                  description: the address of the university
 *              faculties:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: the faculties of the university
 */

/**
 * @swagger
 * tags:
 *  name: Universities
 *  description: The universities managing API
 */

/**
 * @swagger
 * /api/universities:
 *  get:
 *      summary: List of all universities
 *      tags: [Universities]
 *      responses:
 *          '200':
 *              description: A list of universities
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Universities'
 */

/**
 * @swagger
 * /api/universities:
 *  post:
 *      summary: Create a new university
 *      tags: [Universities]
 *      requestBody:
 *          required: true
 *          description: New university creation
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Universities'
 *      responses:
 *          '201':
 *              description: Successfully created a new university
 *          '400':
 *              description: Invalid input
 */

/**
 * @swagger
 * /api/universities/{id}:
 *  put:
 *      summary: Update the university by ID
 *      tags: [Universities]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            description: The ID of the university to update
 *      requestBody:
 *          description: Update some university data by ID
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Universities'
 *      responses:
 *          '200':
 *              description: Successfully updated
 *          content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              $ref: '#/components/schemas/Universities'
 *          '404':
 *              description: University ID is not found
 *          '500':
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/universities/{id}:
 *  get:
 *      summary: Get the university by ID
 *      tags: [Universities]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            description: The ID of the university to get
 *      responses:
 *          '200':
 *              description: Success
 *          content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              $ref: '#/components/schemas/Universities'
 *          '404':
 *              description: University ID is not found
 *          '500':
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/universities/{id}:
 *  delete:
 *      summary: Delete the university by ID
 *      tags: [Universities]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            description: The ID of the university to delete
 *      responses:
 *          '200':
 *              description: Successfully deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              $ref: '#/components/schemas/Universities'
 *          '404':
 *              description: University ID is not found
 *          '500':
 *              description: Internal server error
 */

import express from 'express';
import UniversityController from '../controllers/universityController';

const router = express.Router();

router.post('/', UniversityController.createUniversity);
router.put('/:id', UniversityController.updateUniversity);
router.delete('/:id', UniversityController.deleteUniversity);
router.get('/', UniversityController.getAllUniversities);
router.get('/:id', UniversityController.getUniversityById);

export default router;