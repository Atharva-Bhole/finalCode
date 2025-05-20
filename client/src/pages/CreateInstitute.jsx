import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";



const CreateInstitute = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  return (
    <div className="w-screen h-screen flex flex-col poppins-medium">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-full bg-blue-200">
        <div className="flex flex-col bg-white rounded-xl p-10 w-200 shadow-lg shadow-black">
          <h1 className="text-3xl font-sans align-top text-center">
            Register Your Institute with us
          </h1>
          <form action="" method="post" className="mt-10">
            <div className="flex flex-col text-md bold-font-sans">
              <label htmlFor="name" className="text-xl">
                Institute Name:
              </label>
              <input
                type="text"
                name="name"
                className="border-2 rounded-md h-10"
                onChange={(e) => setName(e.target.value)}
                defaultValue={name}
              />
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

            <div className='flex flex-col text-md bold-font-sans'>
                <label htmlFor="location" className='text-xl'>
                    Location :
                </label>
                <input type="text" name='location' className='border-2 rounded-md h-10' onChange={((e)=> setLocation(e.target.value))} defaultValue={location} />
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
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInstitute;
