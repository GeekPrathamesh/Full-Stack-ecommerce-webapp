import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Header = () => {
  return (
    <section className="pt-6 w-full" id="home">
      <div className="relative w-full h-[50vh] md:h-[70vh]"> 
   
        
        <img
          src={assets.header_img}
          alt="headerimg"
          className="w-full h-full object-cover rounded-xl" // Image fills container
        />
        
        {/* Overlay text */}
        <div className="flex flex-col gap-3 md:gap-6 md:w-[60%] w-[80%] absolute bottom-4 left-5 md:bottom-12 md:left-10 text-white">
            <div><h1 className="text-4xl md:text-6xl font-bold fade-in-text">Order your</h1>
          <h1 className="text-4xl md:text-6xl font-bold fade-in-text">favourite food here</h1></div>
          
          
          <p className="max-w-[500px] text-sm md:text-base fade-in-text ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cum
            facere omnis voluptatum ducimus eius saepe perferendis deserunt.
            Deleniti accusantium nobis
          </p>
          
          <div>
            <button
              className="lg:px-5 lg:py-2 px-3 py-1 rounded-full bg-white text-gray-700 font-medium cursor-pointer 
              hover:text-orange-500 transition-colors duration-300"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
