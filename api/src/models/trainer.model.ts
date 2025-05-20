import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Subject from "./subject.model";

class Trainer extends Model{
    public id?:number;
    public emp_id!:string;
    public name!:string;
    public email!:string;
    public subject_id!: string;
    public password!:string;
    public topics?:string[];
    public readonly created_at?:Date;
    public readonly updated_at?:Date;
};


Trainer.init({
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
    },
    emp_id : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    topics : {
        type : DataTypes.JSON,
        allowNull : true
    },
    subject_id : {
        type : DataTypes.UUID,
        references : {
            model : Subject,
            key : "id"
        },
        allowNull : false
    },
    created_at : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW,
    },
    updated_at : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW,
    }
},
{
    sequelize,
    modelName : 'trainer',
    tableName : 'trainers',
    timestamps : false
});

export default Trainer;