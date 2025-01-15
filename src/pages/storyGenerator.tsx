import React from "react";
import BackButtonIcon from "../assets/svg/backbutton.svg";
import SaveIcon from "../assets/svg/saveicon.svg";
import ReloadIcon from "../assets/svg/reloadicon.svg";
import Logo from "../assets/svg/logo.svg";
import BookshelfIcon from "../assets/svg/bookshelf.svg";
import CoinIcon from "../assets/svg/coin.svg";
import KidIcon from "../assets/svg/kid.svg";
import StarIcon from "../assets/svg/star.svg";
import BulbIcon from "../assets/svg/bulb.svg";
import MicIcon from "../assets/svg/mic.svg";
import StarsIcon from "../assets/svg/stars.svg";
import CatIcon from "../assets/svg/cat.svg";

const StoryGenerator: React.FC = () => {
  return (
    <div className="w-[768px] h-[1024px] bg-gray-50 mx-auto overflow-hidden flex flex-col">
      {/* Top Frame */}
      <div className="w-full h-[60px] flex justify-between items-center px-4 bg-white shadow-md mt-[16px]">
        {/* Logo */}
        <img src={Logo} alt="Logo" className="h-[55px]" />

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src={BookshelfIcon} alt="Bookshelf Icon" className="h-[35px]" />
          </div>

          <div className="flex items-center space-x-2 bg-yellow-300 px-3 py-1 rounded-md">
            <img src={CoinIcon} alt="Coin Icon" className="h-[16px]" />
            <span className="text-white font-bold">100</span>
          </div>

          <img src={KidIcon} alt="Kid Icon" className="h-[50px] rounded-full" />
        </div>
      </div>

      {/* Main Content Frame */}
      <div className="w-[736px] h-[912px] bg-white rounded-lg mx-auto mt-[30px] px-4 py-4 flex flex-col space-y-4 shadow-md">
        {/* Header inside Main Frame */}
        <div className="w-full h-[56px] flex justify-between items-center border-b-4 border-gray-300 pb-4">
          <button className="w-[50px] h-[50px] flex items-center justify-center">
            <img src={BackButtonIcon} alt="Back Button" className="w-full h-full" />
          </button>

          <h2 className="text-lg font-semibold text-blue-500">Create Your Story</h2>

          <div className="flex items-center space-x-4">
            <button className="flex items-center w-[88px] h-[40px] border border-gray-300 rounded-lg px-3 space-x-2">
              <img src={SaveIcon} alt="Save Icon" className="w-5 h-5" />
              <span className="text-blue-500 text-sm font-medium">Save</span>
            </button>

            <button className="flex items-center w-[130px] h-[40px] border border-gray-300 rounded-lg px-3 space-x-2">
              <img src={ReloadIcon} alt="Reload Icon" className="w-5 h-5" />
              <span className="text-blue-500 text-sm font-medium">Start Over</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-grow space-x-4">
          {/* Left Section */}
          <div className="w-[467px] h-full bg-gray-100 p-4 rounded-md flex flex-col justify-between">
            {/* Icon and Text */}
            <div className="flex items-start space-x-2">
              <img src={CatIcon} alt="Cat Icon" className="h-8 w-8" />
              <p className="text-gray-600">
                Hi Ryan, I hear you want to make a picture book with your own story. Good! First select the characters in your book. Who is
                the main Character in our story?
              </p>
            </div>

            <div className="relative">
              {/* Textarea */}
              <textarea
                placeholder="Write your custom story..."
                className="w-[435px] h-[150px] border border-gray-300 rounded-md p-4 resize-none"
              ></textarea>

              {/* Mic Button */}
              <img src={MicIcon} alt="Mic Icon" className="absolute bottom-5 right-2 h-[50px] w-[50px] cursor-pointer" />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-[253px] flex flex-col bg-gray-100 rounded-md p-4">
            {/* "Your Characters" Header */}
            <div className="flex justify-center items-center bg-blue-500 text-white font-medium text-sm rounded-md h-[33px] w-[193px] mx-auto mb-4">
              Your Characters
              <img src={StarIcon} alt="Star Icon" className="ml-2 w-4 h-4" />
            </div>

            <div className="flex flex-col items-center justify-center h-full border border-dashed border-gray-300 rounded-md">
              <span className="text-gray-400">Start adding your favorites!</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="w-[720px] h-[50px] flex justify-between items-center mx-auto px-4">
          {/* Left Section: Bulb Icon and Text */}
          <div className="flex items-center space-x-2">
            <img src={BulbIcon} alt="Bulb Icon" className="h-[20px] w-[20px]" />
            <a href="#" className="text-blue-500 text-sm underline">
              Help me with a new story idea
            </a>
          </div>

          {/* Right Section: Generate Story Button */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 w-[234px] flex items-center justify-center space-x-2">
            <img src={StarsIcon} alt="Stars Icon" className="h-5 w-5" />
            <span>Generate Story</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryGenerator;
