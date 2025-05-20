import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainerById } from '../redux/slices/trainer.slice';

const trainerProfile = {
  id: 1,
  name: "Varun",
  email: "varun@gmail.com",
  salary: 9,
  subject_id: 1,
  institute_id: 1,
  topic_id: 3,
  subject: "Physics",
  topic: "Vector and Kinematics",
  institute: "IIT Delhi"
};

const TrainerProfile = () => {
  const id = useParams();
  const dispatch = useDispatch();
  console.log(id.id);
  console.log(id);
  const {trainer, loading, error} = useSelector((state)=> state.trainer);
  console.log("Trainer", trainer);
  
  
  useEffect(()=>{
    dispatch(getTrainerById(id.id));
  }, [dispatch, id.id]);
  return (
    <div className='bg-blue-300 w-screen h-screen poppins-medium overflow-x-hidden'>
      <Navbar />
      <div className='ml-32 mt-10 text-left'>
        <div className='bg-white w-[700px] rounded-xl shadow-lg p-10'>
          <h1 className='poppins-bold text-4xl mb-8 text-purple-700'>Your Profile</h1>
          <div className='flex flex-row mb-6'>
            <h2 className='text-2xl w-48'>Name:</h2>
            <p className='text-xl self-center'>{trainer.name}</p>
          </div>
          <div className='flex flex-row mb-6'>
            <h2 className='text-2xl w-48'>Email:</h2>
            <p className='text-xl self-center'>{trainer.email}</p>
          </div>
          <div className='flex flex-row mb-6'>
            <h2 className='text-2xl w-48'>Subject ID:</h2>
            <p className='text-xl self-center'>{trainer.subject_id}</p>
          </div>
          <div className='flex flex-row mb-6'>
            <h2 className='text-2xl w-48'>Topic:</h2>
            <p className='text-xl self-center'>{trainer.topics.join(', ')}</p>
          </div>
          <div className='flex flex-row mb-6'>
            <h2 className='text-2xl w-48'>Trainer ID:</h2>
            <p className='text-xl self-center'>{trainer.id}</p>
          </div>
          <div className='flex flex-row mb-6'>
            <h2 className='text-2xl w-48'>Employee ID:</h2>
            <p className='text-xl self-center'>{trainer.emp_id}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainerProfile