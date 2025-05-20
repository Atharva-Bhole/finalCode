import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-16 items-center">
        <div className="flex flex-col items-start space-y-6">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-2">Welcome to NexaNova</h1>
          <p className="text-lg text-gray-700">
            Discover the next generation of innovation. NexaNova brings you cutting-edge solutions to empower your business and creativity.
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Fast & Reliable Services</li>
            <li>Innovative Ideas</li>
            <li>Secure & Trusted</li>
            <li>Global Reach</li>
          </ul>
          <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src="https://picsum.photos/seed/picsum/200/300"
            alt="Innovation"
            className="rounded-2xl shadow-2xl w-full max-w-md"
          />
        </div>
      </div>
    </div>
  )
}

export default Home