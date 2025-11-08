import React, { useContext, useEffect, useState } from "react";
import Storecontext from "../context/Storecontext";
import { Link } from "react-router-dom";
import { address } from "framer-motion/client";
import axios from "axios";

const Placeorder = () => {
  const { food_list, cartitems, addtoCart, removefromCart, cartTotal } =
    useContext(Storecontext);

  const [data, setdata] = useState({
    firstName: "",
    lastName: "",

    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const submitformorder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((each) => {
      if (cartitems[each._id] > 0) {
        let abcd = each;
        abcd["quantity"] = cartitems[each._id];
        orderItems.push(abcd);
      }
    });
     let orderData={
    amount:cartTotal()+2,
    items:orderItems,
    address:data

  }
  try {
  let response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/order/place`,
    orderData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.data.success) {
    window.location.replace(response.data.session_url);
  } else {
    alert("Payment session could not be created.");
  }
} catch (error) {
  console.error("Order Error:", error);
  alert("Something went wrong. Please try again.");
}

  };
  return (
    <form onSubmit={submitformorder}>
      <div className="min-h-[75vh] flex flex-col sm:flex-row justify-baseline gap-10 py-[60px]  ">
        <div className="w-full sm:w-1/2 flex flex-col  gap-6">
          <h1 className="text-3xl font-medium">Delivery Information</h1>
          <div className="flex gap-4">
            <input
              required
              onChange={onchangeHandler}
              name="firstName"
              value={data.firstName}
              type="text"
              placeholder="first name"
              className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
            />
            <input
              required
              onChange={onchangeHandler}
              name="lastName"
              value={data.lastName}
              type="text"
              placeholder="last name"
              className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
            />
          </div>
          <div className="flex flex-col gap-6">
            <input
              required
              onChange={onchangeHandler}
              name="email"
              value={data.email}
              type="email"
              placeholder="john@gmail.com"
              className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
            />
            <input
              required
              onChange={onchangeHandler}
              name="street"
              value={data.street}
              type="text"
              placeholder="street"
              className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
            />
          </div>
          <div className="flex gap-4">
            <input
              required
              onChange={onchangeHandler}
              name="city"
              value={data.city}
              type="text"
              placeholder="city"
              className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
            />
            <input
              required
              onChange={onchangeHandler}
              name="state"
              value={data.state}
              type="text"
              placeholder="state"
              className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
            />
          </div>
          <div className="flex gap-4">
            <input
              required
              onChange={onchangeHandler}
              name="pincode"
              value={data.pincode}
              type="number"
              placeholder="pincode"
              className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
            />
            <input
              required
              name="country"
              value={data.country}
              onChange={onchangeHandler}
              type="text"
              placeholder="country"
              className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
            />
          </div>
          <input
            required
            name="phone"
            value={data.phone}
            onChange={onchangeHandler}
            type="number"
            placeholder="phone number"
            className="border rounded border-gray-400 w-full px-4 py-2   hover:ring-2 hover:ring-[tomato]"
          />
        </div>

        {/* ---------------------------------------------------  */}

        <div className="w-full flex flex-col gap-2 text-gray-700 sm:w-[40%]">
          <h1 className="text-3xl font-medium mb-2">Cart Totals</h1>
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${cartTotal()}</p>
          </div>
          <hr className="border-t border-gray-300 my-2" />
          <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>${cartTotal() === 0 ? 0 : 2}</p>
          </div>
          <hr className="border-t border-gray-300 my-2" />

          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>${cartTotal() === 0 ? 0 : cartTotal() + 2}</p>
          </div>
          <div className="mt-2">
            {" "}
            <button type="submit" className="bg-[tomato] px-4 py-2 rounded">
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
