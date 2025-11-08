import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import Storecontext from "../context/Storecontext";
import { Link } from "react-router-dom";

const Navbar = ({setlogin}) => {
  const token = localStorage.getItem("token");

const [navigate,setnavigate]=useState("home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

const {cartitems} =useContext(Storecontext);
const totalItems = Object.values(cartitems).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-row justify-between items-center min-h-[80px]  text-gray-700">
      <div>
        <Link to="/"><img src="./logo.jpg" alt="logo" className=""  width="110px"/></Link>
      </div>
      <div className="hidden md:block">
        <ul className="flex lg:gap-8 md:gap-5 cursor-pointer">
         <li ><a href="#home" className={`${ navigate === "home" ? " underline underline-offset-6 decoration-2 decoration-[tomato]" : "" }`} onClick={() => setnavigate("home")}>home</a>  </li>
          <li ><a href="#menu" className={`${ navigate === "menu" ? " underline underline-offset-6 decoration-2 decoration-[tomato]" : "" }`} onClick={()=>{setnavigate("menu")}}>menu</a></li>
          <li ><a href="#Appdown" className={`${ navigate === "mobile-app" ? " underline underline-offset-6 decoration-2 decoration-[tomato]" : "" }`} onClick={()=>{setnavigate("mobile-app")}}>mobile-app</a></li>
          <li ><a href="#contact" className={`${ navigate === "contact us" ? " underline underline-offset-6 decoration-2 decoration-[tomato]" : "" }`} onClick={()=>{setnavigate("contact us")}}>contact us</a></li>
        </ul>
      </div>
      <div className="flex lg:gap-8 gap-6  items-center justify-evenly">
        <div>
          <img src={assets.search_icon} alt="search" className="cursor-pointer w-5 lg:w-7"  />
        </div>
        <div className="relative cursor-pointer">
          <Link to="/cart"><img src={assets.basket_icon} alt="carticon" className="w-5 lg:w-7" /></Link>
          <div className="dot absolute -top-3 -right-2 bg-[tomato] h-[15px] w-[15px] rounded-full flex justify-center items-center"><p className="text-sm text-white">{totalItems===0?null:totalItems}</p></div>
        </div>

{token ? (
 <div
            className="relative"
            onClick={() => setDropdownOpen(!dropdownOpen)}
           
          >
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-8 h-8 rounded-full cursor-pointer"
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                <Link
                  to="/myorders"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload(); // optional, can remove if using state
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
) : (
  <button
    onClick={() => setlogin(true)}
    className="lg:px-5 lg:py-2 px-3 py-1 border rounded-full bg-transparent cursor-pointer hover:bg-[tomato] hover:text-white transition-colors duration-300"
  >
    Sign In
  </button>
)}
      </div>
    </div>
  );
};

export default Navbar;
