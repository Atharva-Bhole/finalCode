import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrainers } from '../redux/slices/trainer.slice'

const Trainers = () => {
  const dispatch = useDispatch();
  const { trainers, loading, error } = useSelector(state => state.trainer);
  
  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);
  console.log(trainers);
  return (
    <>
      <Navbar />
      <div className='bg-blue-300 w-screen h-screen items-center text-center poppins-medium'>
        <div className='poppins-medium text-xl pt-10'>All Subjects Overview</div>
        <div className='justify-center items-center mt-20 flex text-xl'>
          <table border={2} className='border-2 w-400 h-60 bg-white'>
            <thead className='poppins-bold bg-orange-300'>
              <tr>
                <th className='mx-2 px-2 border-2'>Sr. No</th>
                <th className='border-2'>Trainer ID</th>
                <th className='border-2'>Trainer Name</th>
                <th className='border-2'>Subject ID</th>
                <th className='border-2'>Email</th>
                <th className='border-2 mx-2'>Created At</th>
                <th className='border-2'>Updated At</th>
                <th className='border-2'>View Profile</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8}>Loading...</td>
                </tr>
              )}
              {error && (
                <tr>
                  <td colSpan={8} className="text-red-500">{typeof error === 'string' ? error : JSON.stringify(error)}</td>
                </tr>
              )}
              {!loading && Array.isArray(trainers) && trainers.length > 0 && trainers.map((trainer, index) => (
                <tr key={trainer.id} className='border-2 py-5'>
                  <td>{index + 1}</td>
                  <td>{trainer.id}</td>
                  <td>{trainer.name}</td>
                  <td>{trainer.subject_id}</td>
                  <td>{trainer.email}</td>
                  <td className='mx-2'>{new Date(trainer.created_at).toLocaleString()}</td>
                  <td>{new Date(trainer.updated_at).toLocaleString()}</td>
                  <td className='hover:scale-105 transition-all'> <Link to={`/trainer/${trainer.emp_id}`} className='rounded-md bg-gray-900 p-1 text-sm text-white'>View Profile</Link> </td>
                </tr>
              ))}
              {!loading && Array.isArray(trainers) && trainers.length === 0 && (
                <tr>
                  <td colSpan={8}>No trainers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='mt-10'>
          <Link to={'/subject/trainers'} className='bg-gray-900 transition-all text-white p-4 hover:bg-gray-800'>View in More Details about each subject</Link>
        </div>
      </div>
    </>
  )
}

export default Trainers