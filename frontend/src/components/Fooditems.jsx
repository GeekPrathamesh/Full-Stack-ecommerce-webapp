import React, { useContext } from "react";
import Eachfooditem from "./Eachfooditem";
import { motion, AnimatePresence } from "framer-motion";
import Storecontext from "../context/Storecontext";
const Fooditems = ({ category, setcategory }) => {
  const { food_list } = useContext(Storecontext);
  return (
    <div className=" mb-5">
      <h1 className="text-3xl">Top Dishes near you</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-8 gap-3  mt-10">
        <AnimatePresence>
          {food_list
            .filter((item) => category === "All" || item.category === category)
            .map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Eachfooditem
                  id={item._id}
                  name={item.name}
                  image={item.imageUrl}
                  price={item.price}
                  description={item.description}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Fooditems;
