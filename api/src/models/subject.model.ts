import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Subject extends Model{
    public id?:number;
    public name!:string;
    public description!:string;
    public readonly created_at?:Date;
    public readonly updated_at?:Date;
};

Subject.init({
    id : {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    created_at : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW,
    },
    updated_at : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.NOW
    },
},
{
    sequelize,
    modelName : 'subject',
    tableName : 'subjects',
    timestamps : false
});

export default Subject;