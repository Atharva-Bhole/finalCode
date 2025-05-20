import e, { Request, Response } from "express";
import Trainer from "../models/trainer.model";
import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "../config/config";
import Subject from "../models/subject.model";
import { createTrainerRequestBody } from "../types/trainer.types";
class TrainerController {
    createTrainer = async(req : Request<{},{}, createTrainerRequestBody>, res : Response):Promise<void>=>{
        try{
            const {emp_id, name, email, password, topics, subject_id} = req.body;
            console.log(req.body);
            if(!emp_id || !name || !email || !password || !subject_id){
                res.status(400).json({
                    success : false,
                    message : "Please provide complete details"
                });
                return;
            }
            const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);
            const trainer = await Trainer.create({
                emp_id : String(emp_id),
                name,
                email,
                password : hashedPassword,
                topics,
                subject_id
            });

            res.status(201).json({
                success : true,
                message : "Trainer created successfully",
                trainer
            });

            return;
        }catch(err){
            console.error(err);
            res.status(500).json({
                success : false,
                message : "Something went wrong",
                error : err
            });
        }
    };

    getAllTrainers = async(req : Request, res : Response):Promise<void> =>{
        try{
            const trainers = await Trainer.findAll();
            res.status(200).json({
                success : true,
                message : "Trainers fetched successfully",
                trainers: Array.isArray(trainers) ? trainers : []
            });
            return;
        }catch(err){
            console.error(err);
            res.status(500).json({
                success : false,
                message : "Something went wrong",
                error : err
            });
            return;
        }
    }

    deleteTrainer = async(req : Request, res : Response):Promise<void>=>{
        try{
            const id = req.params.id;
            if(!id){
                res.status(400).json({
                    success : false,
                    message : "Please provide trainer id to delete"
                });
                return;
            }

            await Trainer.destroy({
                where : {
                    id : id
                }
            });

            res.status(200).json({
                success : true,
                message : "Trainer deleted successfully"
            });
            return;
        }catch(err){
            console.error(err);
            res.status(500).json({
                success : false,
                message : "Something went wrong",
                error : err
            });
            return;
        }
    }

    getTrainerByEmpId = async(req : Request, res : Response):Promise<void>=>{
        try{
            const emp_id = req.params.id;
            if(!emp_id){
                res.status(400).json({
                    succeess : false,
                    message : "Please provide trainer employee id"
                });
                return;
            }

            const trainer = await Trainer.findOne({
                where : {
                    emp_id
                },
            });
            console.log(trainer);
            if(!trainer){
                res.status(404).json({
                    success : false,
                    message : "Trainer not found"
                });
                return;
            }

            res.status(200).json({
                success : true,
                message : "Trainer found successfully",
                trainer
            });
            return;
        }catch(err){
            console.error(err);
            res.status(500).json({
                success : false,
                message : "Something went wrong",
                error : err
            });
            return;
        }
    };

    getTrainerBySubject = async(req : Request, res : Response):Promise<void>=>{
        try{
            const subjectName = req.params.id;
            if(!subjectName){
                res.status(400).json({
                    success : false,
                    message : "Please provide subject name"
                });
                return;
            }

            const subject = await Subject.findOne({
                where : {
                    name : subjectName
                }
            });
            if(!subject){
                res.status(404).json({
                    success : false,
                    message : "Subject not found"
                });
                return;
            }

            const trainer = await Trainer.findAll({
                where : {
                    subject_id : subject.id
                }
            });
            if(!trainer){
                res.status(404).json({
                    success : false,
                    message : "Trainer not found for the specific subject"
                });
                return;
            }

            res.status(200).json({
                success : true,
                message : "Trainers found successfully",
                trainers : trainer
            });
            return;
        }catch(err){
            console.error(err);
            res.status(500).json({
                success : false,
                message : "Something went wrong"
            });
            return;
        }
    };
};

export default TrainerController;