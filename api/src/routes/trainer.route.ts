import express from "express";
import TrainerController from "../controllers/trainer.controller";
const router = express.Router();
const trainerController = new TrainerController();
router.post('/create', trainerController.createTrainer);

router.get('/all', trainerController.getAllTrainers);
router.get('/:id', trainerController.getTrainerByEmpId);
router.delete('/:id', trainerController.deleteTrainer);
router.get('/:subject/topic', trainerController.getTrainerBySubject);

export default router;