import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createTrainer } from "../redux/slices/trainer.slice";
import { getAllSubjects } from "../redux/slices/subject.slice";
import { useNavigate } from "react-router-dom";

const CreateTrainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emp_id, setEmpId] = useState();
  const [topics, setTopics] = useState([""]); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {subjects, loading, error, message} = useSelector((state)=> state.subject);

  useEffect(()=>{
    dispatch(getAllSubjects());
  }, [dispatch]);
  const [subjectId, setSubjectId] = useState(`${subjects[0]?.id}`);
  const handleTopicChange = (idx, value) => {
    const newTopics = [...topics];
    newTopics[idx] = value;
    setTopics(newTopics);
  };

  const handleAddTopic = () => {
    setTopics([...topics, ""]);
  };

  const handleRemoveTopic = (idx) => {
    const newTopics = topics.filter((_, i) => i !== idx);
    setTopics(newTopics);
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(name, email, password, subjectId, topics, emp_id);
    console.log(`Subject ID: ${subjectId}`);
    dispatch(createTrainer({
      name,
      email,
      emp_id,
      password,
      subject_id: subjectId,
      topics: topics.filter(t => t.trim() !== "") 
    })).then((res) => {
      navigate('/trainers');
    });
    setName("");
    setEmail("");
    setPassword("");
    setEmpId("");
    setTopics([""]);
    setSubjectId(subjects[0]?.id);
    console.log(subjects[0]?.id);
    console.log(subjects);
  }
  return (
    <div className="w-screen h-screen flex flex-col poppins-medium">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full bg-blue-200">
        <div className="flex flex-col bg-white rounded-xl p-10 w-200 shadow-lg shadow-black">
          <h1 className="text-3xl font-sans align-top text-center">
            Register Form
          </h1>
          <form action="" method="post" className="mt-10">
            <div className="flex flex-col text-md bold-font-sans">
              <label htmlFor="name" className="text-xl">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="border-2 rounded-md h-10"
                onChange={(e) => setName(e.target.value)}
                defaultValue={email}
              />
            </div>

                <div className='flex flex-col text-md bold-font-sans mt-5'>
                <label htmlFor="" className='text-xl'>
                    Subject:
                </label>
                <select name="subject" onChange={(e)=>setSubjectId(e.target.value)} className="h-10 border-2 rounded-md" id="subject">
                    {subjects.map((subject)=>{
                        return (
                            <option key={subject.id} onSelect={()=> setSubjectId(subject.id)} value={subject.id} id={subject.id}>{subject.name}</option>
                        )
                    })}

                    
                </select>
                {subjectId}
                </div>

            <div className='flex flex-col text-md bold-font-sans mt-5'>
              <label className='text-xl'>Topics:</label>
              {topics.map((topic, idx) => (
                <div key={idx} className="flex items-center mt-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={e => handleTopicChange(idx, e.target.value)}
                    className="border-2 rounded-md h-10 flex-1"
                    placeholder={`Topic ${idx + 1}`}
                  />
                  {topics.length > 1 && (
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 bg-red-400 text-white rounded"
                      onClick={() => handleRemoveTopic(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                onClick={handleAddTopic}
              >
                Add Topic
              </button>
            </div>
            <div className="flex flex-col text-md bold-font-sans mt-5">
              <label htmlFor="email" className="text-xl">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="border-2 rounded-md h-10"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email}
              />
            </div>

            <div className="flex flex-col text-md bold-font-sans mt-5">
              <label htmlFor="emp_id" className="text-xl">
                Employee ID:
              </label>
              <input
                type="text"
                name="emp_id"
                className="border-2 rounded-md h-10"
                onChange={(e) => setEmpId(e.target.value)}
                defaultValue={email}
              />
            </div>

            <div className="flex flex-col mt-5 text-xl">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                className="border-2 rounded-md h-10"
                onChange={(e) => setPassword(e.target.value)}
                defaultValue={password}
              />
            </div>
            <div className="mt-2">
              <Link to={"/forgot-password"} className="text-blue-500">
                Forgot your Password?
              </Link>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
                onClick={(e) => handleSubmit(e)}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTrainer;
