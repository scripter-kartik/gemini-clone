import React from "react";
import gemini from '../images/gemini.png'
import profile from '../images/profile.jpeg'

function NavBar() {
  return (
    <div className="p-5 flex items-center justify-between">
      <h1 className="text-3xl mr-350">Gemini</h1>
      <div className="bg-gray-500 flex justify-center items-center rounded-2xl p-1 h-10 w-60 hover:bg-gray-400">
        <img className="w-8 h-8 mr-5" src={gemini} alt="" />
        <p className="text-0.5xl text-white">Try Gemini Advanced</p>
      </div>
      <img className="w-10 h-10 rounded-4xl" src={profile} alt="" />
    </div>
  );
}

export default NavBar;

