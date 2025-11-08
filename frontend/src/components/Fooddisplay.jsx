import React from 'react'
import { menu_list } from "../assets/frontend_assets/assets";
const Fooddisplay = ({category , setcategory}) => {
  return (
     <div className="flex overflow-x-auto gap-8 pb-4 stylish-scroll">
        {menu_list.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center min-w-[150px] cursor-pointer"
             onClick={() => setcategory(item.menu_name)}
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-[100%] object-cover rounded-full shadow-md hover:scale-103 transition-transform duration-300  
                ${category === item.menu_name ? "border-4 border-orange-400" : ""}`}
            />
            <h3 className="mt-2 text-lg font-medium text-gray-700">
              {item.menu_name}
            </h3>
          </div>
        ))}
      </div>
  )
}

export default Fooddisplay
