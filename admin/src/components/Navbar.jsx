import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Navbar = () => {
  
  return (
    <div className="flex justify-between items-center px-15 border-b border-b-gray-400 h-20 ">
      
      <Link to="/"><img src={assets.logo} alt="logo admin" className="h-[55px]" /></Link>
      <img src="https://www.shutterstock.com/image-photo/funny-cat-selfie-260nw-2620446955.jpg" alt="img person" className="h-[55px] rounded-full" />
    </div>
  );
};

export default Navbar;
