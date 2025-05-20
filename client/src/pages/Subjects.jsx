import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubjects } from '../redux/slices/subject.slice';

const Subjects = () => {
  const dispatch = useDispatch();
  const { subjects, loading, error } = useSelector(state => state.subject);

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);
  console.log(subjects);
  return (
    <>
        <Navbar />
        <div className='bg-blue-300 w-screen h-screen items-center text-center poppins-medium'>
            <div className='poppins-medium text-xl pt-10'>All Subjects Overview</div>
            <div className='mt-10'><Link to={'/subject/new'} className='px-2 py-3 text-white hover:bg-gray-800 transition-all bg-gray-900 rounded-md'>Add New Subject</Link> </div>
            <div className='justify-center items-center mt-10 flex text-xl'>
            <table border={2} className='border-2 w-1/2 h-60 bg-white'>
                <thead className='poppins-bold bg-orange-300'>
                    <tr>
                        <th className='mx-2 px-2 border-2'>Sr. No</th>
                        <th className='border-2'>Subject ID</th>
                        <th className='border-2'>Subject Name</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={4}>Loading...</td>
                      </tr>
                    )}
                    {error && (
                      <tr>
                        <td colSpan={4} className="text-red-500">{error}</td>
                      </tr>
                    )}
                    {!loading && subjects && subjects.length > 0 && subjects.map((subject, index) => (
                      <tr key={subject.id} className='border-2 py-5'>
                        <td>{index + 1}</td>
                        <td>{subject.id}</td>
                        <td>{subject.name}</td>
                      </tr>
                    ))}
                    {!loading && subjects && subjects.length === 0 && (
                      <tr>
                        <td colSpan={4}>No subjects found.</td>
                      </tr>
                    )}
                </tbody>
            </table>
            </div>
        </div>
    </>
  )
}

export default Subjects