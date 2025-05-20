export type createTrainerRequestBody = {
    name : string;
    emp_id : string | number;
    email : string;
    password : string;
    topics : string[];
    subject_id : string;
}