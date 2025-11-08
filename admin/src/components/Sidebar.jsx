import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[20%] h-screen border border-gray-300 border-t-0">
      <div className="pt-12 pl-[20%] text-lg flex flex-col gap-8">
        <NavLink to="/add"  className="flex gap-4 border border-r-0 px-3 py-2 items-center ">
          <img src={assets.add_icon} alt="add icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink to="/list" className="flex gap-4 border border-r-0 px-3 py-2 items-center">
          <img src={assets.order_icon} alt="add icon" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink to="/orders" className="flex gap-4 border border-r-0 px-3 py-2 items-center">
       
          <img src={assets.order_icon} alt="add icon" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
