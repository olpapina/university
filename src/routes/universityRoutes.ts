import express from 'express';
import UniversityController from '../controllers/universityController';

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
 *              id:
 *                  type: string
 *                  description: the auto-generated id of the university
 *     
 *              title:
 *                  type: string
 *                  description: the title of the university
 *              address:
 *                  type: string
 *                  description: the address of the university
 */

/**
 * @swagger
 * tags:
 *  name: Universities
 *  description: The universities managing API
 * /api/universities:
 *  get:
 *      summary: List of all universities
 *      tags: [Universities]
 *      responses:
 *          200:
 *              description: the list of the universities
 *              content:
 *                  application/json:
 *                      schema: array
 *                      items:
 *                          $ref: '#/components/schemas/Universities'
 */

const router = express.Router();

router.post('/', UniversityController.createUniversity);
router.put('/:id', UniversityController.updateUniversity);
router.delete('/:id', UniversityController.deleteUniversity);
router.get('/', UniversityController.getAllUniversities);
router.get('/:id', UniversityController.getUniversityById);

export default router;