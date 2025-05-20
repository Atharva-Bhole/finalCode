import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getSubjectWithTrainers } from '../redux/slices/subject.slice'

const SubjectWithDets = () => {
  const dispatch = useDispatch();
  const { subjects, trainers, loading, error } = useSelector(state => state.subject);

  useEffect(() => {
    dispatch(getSubjectWithTrainers());
  }, [dispatch]);


  const teacherData = trainers.map((teacher) => {
    const subject = subjects.find((subject) => String(subject.id) === String(teacher.subject_id));
    return {
      ...teacher,
      subject_name: subject ? subject.name : 'Unknown'
    };
  });

  return (
    <>
      <Navbar />
      <div className='bg-blue-300 w-screen h-screen items-center text-center poppins-medium'>
        <div className='poppins-medium text-xl pt-10'>All Overview</div>
        <div className='mt-10'><Link to={'/subject/new'} className='px-2 py-3 text-white hover:bg-gray-800 transition-all bg-gray-900 rounded-md'>Add New Subject</Link> </div>
        <div className='justify-center items-center mt-10 flex text-xl'>
          <table border={2} className='border-2 w-300 h-60 bg-white'>
            <thead className='poppins-bold bg-orange-300'>
              <tr>
                <th className='mx-2 px-2 border-2'>Sr. No</th>
                <th className='border-2'>Teacher ID</th>
                <th className='border-2'>Teacher Name</th>
                <th className='border-2'>Teacher Email</th>
                <th className='border-2'>Subject Name</th>
                <th className='border-2'>Subject ID</th>
                <th className='border-2'>Employee ID</th>
                <th className='border-2'>Topic Name</th>
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
                  <td colSpan={8} className="text-red-500">{error}</td>
                </tr>
              )}
              {!loading && teacherData && teacherData.length > 0 && teacherData.map((teacher, index) => (
                <tr key={teacher.id || index} className='border-2 py-5'>
                  <td className='px-2'>{index + 1}</td>
                  <td className='px-2'>{teacher.id}</td>
                  <td className='px-2'>{teacher.name}</td>
                  <td className='px-2'>{teacher.email}</td>
                  <td className='px-2'>{teacher.subject_name}</td>
                  <td className='px-2'>{teacher.subject_id}</td>
                  <td className='px-2'>{teacher.emp_id}</td>

                  <td className='px-2'>{teacher.topics.join(', ')}</td>
                </tr>
              ))}
              {!loading && teacherData && teacherData.length === 0 && (
                <tr>
                  <td colSpan={8}>No trainers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default SubjectWithDets