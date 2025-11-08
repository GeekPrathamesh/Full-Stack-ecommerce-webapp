

import {  useState } from "react";
import Fooddisplay from "./Fooddisplay";
import Fooditems from "./Fooditems";

const Exploremenu = () => {
  const [category, setcategory] = useState("All");
  return (
    <div className="flex flex-col gap-6 mt-7" id="menu">
      <h1 className="text-3xl font-medium">Explore our menu</h1>
      <p className="w-[60%] text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptatibus
        cupiditate pariatur assumenda, magnam culpa.
      </p>

      {/* Scrollable Menu seen here */}
     <Fooddisplay category={category} setcategory={setcategory} />
     <Fooditems  category={category} setcategory={setcategory}/>
    </div>
  );
};

export default Exploremenu;
