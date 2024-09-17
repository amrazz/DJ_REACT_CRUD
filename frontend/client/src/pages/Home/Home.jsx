import React from 'react'

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-purple-600 p-6 rounded-lg shadow-xl text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full">PRO</span>
      </div>
      <div className="flex flex-col items-center">
        <img src="/path-to-avatar.jpg" alt="Profile Avatar" className="w-24 h-24 rounded-full mb-3"/>
        <h3 className="text-lg font-semibold">Ricky Park</h3>
        <p className="text-sm">front-end developer new york</p>
      </div>
      <div className="flex space-x-2 mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Message</button>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">Following</button>
      </div>
      <div className="mt-auto">
        <h4 className="font-semibold text-lg mt-6 mb-2">SKILLS</h4>
        {/* List of skills */}
        {['UI/UX', 'Front End Development', 'HTML', 'CSS', 'JavaScript', 'React', 'Node'].map(skill => (
          <span key={skill} className="inline-block bg-purple-800 rounded-full px-3 py-1 text-sm mr-2 mb-2">{skill}</span>
        ))}
      </div>
    </div>
  );
};

export default Home
