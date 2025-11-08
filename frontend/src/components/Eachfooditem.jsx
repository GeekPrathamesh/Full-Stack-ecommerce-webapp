import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { assets } from "../assets/frontend_assets/assets";
import Storecontext from "../context/Storecontext";

const Eachfooditem = ({ id, name, price, description, image }) => {

  const {cartitems,addtoCart,removefromCart}=useContext(Storecontext)
  return (
    <div className="shadow-md">
      <div className="relative">
        <img src={`${import.meta.env.VITE_API_URL}/images/`+image} alt="food_image" className="rounded-t-2xl w-full" />
        <AnimatePresence mode="wait">
          {!cartitems[id] ? (
            <motion.img
              key="add-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                addtoCart(id);
              }}
              src={assets.add_icon_white}
              alt="add to cart"
              className="rounded-full w-[40px] absolute right-4 bottom-4 transition-transform duration-200 hover:scale-110"
            />
          ) : (
            <motion.div
              key="counter"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute right-4 bottom-4 flex items-center gap-4 bg-white px-3 py-2 rounded-full shadow w-[120px] justify-between"
            >
              {/* Decrement button */}
              <img
                className="w-[30px] cursor-pointer"
                onClick={() =>
                  removefromCart(id)
                }
                src={assets.remove_icon_red}
                alt="remove"
              />

              {/* Count */}
              <p className="text-lg font-semibold">{cartitems[id]}</p>

              {/* Increment button */}
              <img
                className="w-[30px] cursor-pointer"
                onClick={() => addtoCart(id)}
                src={assets.add_icon_green}
                alt="add"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className=" p-4 flex flex-col gap-1">
        <div className="flex flex-col md:flex-row justify-between gap-1 w-[100px] md:w-auto"> 
          <p className="font-bold text-xl text-gray-700">{name}</p>
          <img src={assets.rating_starts} alt="rating" className="h-[20px]" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="mt-3 text-[tomato] text-2xl">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Eachfooditem;
