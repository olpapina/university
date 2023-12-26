import { Request, Response } from 'express';
import Subject from '../models/subject';

class SubjectController {


    async createSubject(req: Request, res: Response) {
        const { title, quantityOfHour, lecturer } = req.body;
      
        const newSubject = new Subject({
            title,
            quantityOfHour,
            lecturer
        });
      
        try {
          const savedSubject = await newSubject.save();
          res
          .status(201)
          .json(savedSubject);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    
      async updateSubject(req: Request, res: Response) {
        const subjectId = req.params.id;
        const { title, quantityOfHour, lecturer } = req.body;
    
        try {
          const updatedSubject = await Subject.findByIdAndUpdate(
            subjectId,
            { title, quantityOfHour, lecturer },
            { new: true }
          );
    
          if (updatedSubject) {
            res
            .status(200)
            .json(updatedSubject);
          } else {
            res.status(404).json({ message: 'Subject is not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error occurs' });
        }
      }
    
      async deleteSubject(req: Request, res: Response) {
        const subjectId = req.params.id;
    
        try {
          const deletedSubject = await Subject.findByIdAndDelete(subjectId);
    
          if (deletedSubject) {
            res.json(deletedSubject);
          } else {
            res.status(404).json({ message: 'Subject is not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error occurs' });
        }
      }

    async getAllSubjects(req: Request, res: Response) {
        try {
          const subjects = await Subject.find();
          res
          .status(200)
          .json(subjects);
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error occurs' });
        }
      }
    
      async getSubjectById(req: Request, res: Response) {
        const subjectId = req.params.id;
    
        try {
          const subject = await Subject.findById(subjectId);
          if (subject) {
            res
            .status(200)
            .json(subject);
          } else {
            res.status(404).json({ message: 'Subject is not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error occurs' });
        }
      }    
}

export default new SubjectController();