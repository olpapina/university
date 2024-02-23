/**
 * @swagger
 * components:
 *  schemas:
 *      Departments:
 *          type: object
 *          required:
 *              - title
 *          properties:
 *              _id:
 *                  type: string
 *                  description: the auto-generated id of the department
 *              title:
 *                  type: string
 *                  description: the title of the department
 *              courses:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: the courses of the department
 */

/**
 * @swagger
 * tags:
 *  name: Departments
 *  description: The departments managing API
 */

/**
 * @swagger
 * /api/departments:
 *  get:
 *    summary: Get all departments
 *    tags: [Departments]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Departments'
 *
 *  post:
 *    summary: Create a new department
 *    tags: [Departments]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Departments'
 *    responses:
 *      201:
 *        description: Successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Departments'
 *      400:
 *        description: Invalid input
 * 
 * /api/departments/{id}:
 *  put:
 *    summary: Update a department by ID
 *    tags: [Departments]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the department to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Departments'
 *    responses:
 *      200:
 *        description: Successfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Departments'
 *      404:
 *        description: Department ID is not found
 *      500:
 *        description: Internal Server Error
 * 
 *  get:
 *    summary: Get a department by ID
 *    tags: [Departments]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the department to get
 *    responses:
 *      200:
 *        description: Successfully got
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Departments'
 *      404:
 *        description: Department ID is not found
 *      500:
 *        description: Internal Server Error
 * 
 *  delete:
 *    summary: Delete a department by ID
 *    tags: [Departments]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of the department to delete
 *    responses:
 *      200:
 *        description: Successfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Departments'
 *      404:
 *        description: Department ID is not found
 *      500:
 *        description: Internal Server Error
 */

import express from 'express';
import DepartmentController from '../controllers/departmentController';

const router = express.Router();

router.post('/', DepartmentController.createDepartment);
router.put('/:id', DepartmentController.updateDepartment);
router.delete('/:id', DepartmentController.deleteDepartment);
router.get('/', DepartmentController.getAllDepartments);
router.get('/:id', DepartmentController.getDepartmentById);

export default router;