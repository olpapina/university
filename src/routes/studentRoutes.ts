/**
 * @swagger
 * components:
 *  schemas:
 *      Students:
 *          type: object
 *          required:
 *              - firstName
 *              - lastName
 *              - course
 *          properties:
 *              id:
 *                  type: string
 *                  description: the auto-generated id of the university
 *              firstName:
 *                  type: string
 *                  description: the name of the student
 *              lastName:
 *                  type: string
 *                  description: the name of the student
 *              course:
 *                  type: object
 *                  description: the course which student studying
 *              marks:
 *                  type: array
 *                  items:
 *                      type: object
 *                  description: the marks of the student
 */

/**
 * @swagger
 * tags:
 *  name: Students
 *  description: The students managing API
 */

/**
 * @swagger
 * /api/students:
 *  get:
 *      summary: List of all studentd
 *      tags: [Students]
 *      responses:
 *          '200':
 *              description: A list of students
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Students'
 */

/**
 * @swagger
 * /api/students:
 *  post:
 *      summary: Create a new student
 *      tags: [Students]
 *      requestBody:
 *          required: true
 *          description: New student creation
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Students'
 *      responses:
 *          '201':
 *              description: Successfully created a new student
 *          '400':
 *              description: Invalid input
 */

/**
 * @swagger
 * /api/students/{id}:
 *  put:
 *      summary: Update the student by ID
 *      tags: [Students]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            description: The ID of the student to update
 *      requestBody:
 *          description: Update some student data by ID
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Students'
 *      responses:
 *          '200':
 *              description: Successfully updated
 *          content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              $ref: '#/components/schemas/Students'
 *          '404':
 *              description: Student ID is not found
 *          '500':
 *              description: Internal Server Error
 */

/**
 *  @swagger
 * /api/students/{id}:
 *  get:
 *      summary: Get the student by ID
 *      tags: [Students]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            description: The ID of the student to get
 *      responses:
 *          '200':
 *              description: Success
 *          content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              $ref: '#/components/schemas/Students'
 *          '404':
 *              description: Student ID is not found
 *          '500':
 *              description: Internal Server Error
 */

/**
 * @swagger
 * /api/students/{id}:
 *  delete:
 *      summary: Delete the student by ID
 *      tags: [Students]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *            description: The ID of the student to delete
 *      responses:
 *          '200':
 *              description: Successfully deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                              $ref: '#/components/schemas/Students'
 *          '404':
 *              description: Students ID is not found
 *          '500':
 *              description: Internal server error
 */

/**
 * @swagger
 * /api/students/:
 *  get:
 *      summary: Student of particular course and particulars marks
 *      tags: [Students]
 *      parameters:
 *        - in: query
 *          name: course
 *          schema:
 *            type: string
 *          required: true
 *          description: The title of the course
 *        - in: query
 *          name: mark
 *          schema:
 *            type: integer
 *          required: true
 *          description: The specific mark of some subject
 *      responses:
 *          '200':
 *              description: Student of particular course and particulars marks
 *              content:
 *                  application/json:
 *                      schema:
 *                          type:
 *                             $ref: '#/components/schemas/Students'
 */

import express from 'express';
import StudentController from '../controllers/studentController';

const router = express.Router();

router.post('/', StudentController.createStudent);
router.put('/:id', StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getStudentById);
router.get('/:id/marks', StudentController.getMarksOfStudent);
router.get('/?course=:courseTitle&mark=:magnitude', StudentController.getAllStudents);

export default router;