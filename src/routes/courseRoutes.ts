/**
 * @swagger
 * components:
 *  schemas:
 *      Courses:
 *          type: object
 *          required:
 *              - title
 *              - yearOfStudying
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the auto-generated id of the course
 *              title:
 *                  type: string
 *                  description: the title of the course
 *              subjects:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: the subjects of the course
 *              yearOfStudying:
 *                  type: number
 *                  description: the year of the course
 */

/**
 * @swagger
 * tags:
 *  name: Courses
 *  description: The courses managing API
 */

/**
* @swagger
 * /api/courses:
 *  get:
 *    summary: Get all courses
 *    tags: [Courses]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Courses'
 *
 *  post:
 *    summary: Create a new course
 *    tags: [Courses]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Courses'
 *    responses:
 *      201:
 *        description: Successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Courses'
 *      400:
 *        description: Invalid input
 * 
 * /api/courses/{id}:
 *  put:
 *    summary: Update a course by ID
 *    tags: [Courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the course to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Courses'
 *    responses:
 *      200:
 *        description: Successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Courses'
 *      404:
 *        description: Course ID is not found
 *      500:
 *        description: Internal Server Error
 * 
 *  get:
 *    summary: Get a course by ID
 *    tags: [Courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the course to get
 *    responses:
 *      200:
 *        description: Successfully got
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Courses'
 *      404:
 *        description: Course ID is not found
 *      500:
 *        description: Internal Server Error
 *
 *  delete:
 *    summary: Delete a course by ID
 *    tags: [Courses]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the course to delete
 *    responses:
 *      200:
 *        description: Successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Courses'
 *      404:
 *        description: Course ID is not found
 *      500:
 *        description: Internal Server Error
 */

import express from 'express';
import CourseController from '../controllers/courseController';

const router = express.Router();

router.post('/', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourseById);

export default router;