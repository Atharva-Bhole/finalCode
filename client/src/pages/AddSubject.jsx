import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { createSubject } from '../redux/slices/subject.slice';



const AddSubject = () => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!subject || !description){
            alert("Please fill all the fields");
            return;
        }
        dispatch(createSubject({
            name: subject,
            description: description
        })).then(() => {
            setSubject("");
            setDescription("");
            navigate('/subject/all');
        });
    }
    return (
        <div className='w-screen h-screen flex flex-col poppins-medium'>
            <Navbar />
            <div className='flex flex-col justify-center items-center h-full bg-blue-200'>
            <div className='flex flex-col bg-white rounded-xl p-10 w-200 shadow-lg shadow-black'>
                <h1 className='text-3xl font-sans align-top text-center'>Add a New Subject</h1>
                <form action="" method='post' className='mt-10'>
                    <div className='flex flex-col text-md bold-font-sans'>
                    <label htmlFor="subjectName" className='text-xl'>
                        Subject Name:
                    </label>
                    <input
                        type="text"
                        name='subject'
                        className='border-2 rounded-md h-10'
                        onChange={((e)=> setSubject(e.target.value))}
                        value={subject}
                    />
                    </div>

                    <div className='flex flex-col text-md bold-font-sans'>
                    <label htmlFor="subjectDescription" className='text-xl'>
                        Subject Description:
                    </label>
                    <input
                        type="text"
                        name='description'
                        className='border-2 rounded-md h-10'
                        onChange={((e)=> setDescription(e.target.value))}
                        value={description}
                    />
                    </div>
                    <div className='mt-10'>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all'
                            onClick={handleSubmit}
                        >
                            Add Subject
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AddSubject