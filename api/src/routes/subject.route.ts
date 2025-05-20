import express from "express";
import SubjectController from "../controllers/subject.controller";

const subjectController = new SubjectController();

const router = express.Router();

router.post('/', subjectController.createSubject);
router.get('/', subjectController.getAllSubjects);
router.get('/trainer', subjectController.SubjectsWithTrainers);

export default router;
