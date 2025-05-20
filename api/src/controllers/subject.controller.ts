import { Request, Response } from "express";
import Subject from "../models/subject.model";
import Trainer from "../models/trainer.model";
class SubjectController{
    createSubject = async(req : Request, res : Response):Promise<void>=>{
        try{
            const {name, description} = req.body;
            if(!name || !description){
                res.status(400).json({
                    success : false,
                    message : "Please provide complete details"
                });
                return;
            }

            const subject = await Subject.create({
                name,
                description
            });
            res.status(201).json({
                success : true,
                message : "Subject Created successfully"
            });
            return;

        }
        catch(err){
            console.error(err);
            res.status(500).json({
                success : false,
                message : "Something went wrong"
            });
            return;
        }
    };

    getAllSubjects = async(req : Request, res : Response):Promise<void>=>{
        try{
            const subjects = await Subject.findAll();
            if(!subjects){
                res.status(404).json({
                    success : false,
                    message : "Subjects not found"
                });
                return;
            }
            console.log(subjects);
            res.status(200).json({
                success : true,
                message : "Subjects found successfully",
                subjects
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

    SubjectsWithTrainers = async(req : Request, res : Response):Promise<void>=>{
        try{
            const subjects = await Subject.findAll();

            const trainers = await Trainer.findAll();
            
            if(subjects.length === 0){
                res.status(404).json({
                    success : false,
                    message : "Data not found"
                });
                return;
            }

            if(trainers.length === 0){
                res.status(404).json({
                    success : false,
                    message : "Trainers not found"
                });
                return;
            }

            res.status(200).json({
                success : true,
                message : "Data fetched successfully",
                subjects,
                trainers
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
    }
};

export default SubjectController;