import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import Storecontext from "../context/Storecontext";

const Loginpopup = ({ setlogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const {cartItemsFetch} =useContext(Storecontext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (signup) {
        // Registration
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { name, email, password });
        if (res.data.success) {
          toast.success("Registration successful! Please login.");
          setSignup(false); // switch to login after signup
          cartItemsFetch()
        } else {
          toast.error(res.data.message);
        }
      } else {
        // Login
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
        if (res.data.success) {
          localStorage.setItem("token", res.data.token); // store JWT
          toast.success("Login successful!");
          setlogin(false); // close popup
          cartItemsFetch()
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error(error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#00000090] flex items-center justify-center">
      <div className="relative w-[400px] h-[400px] bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
        {/* Close icon */}
        <img
          src={assets.cross_icon}
          alt="close"
          className="absolute top-6 right-6 w-5 h-5 cursor-pointer"
          onClick={() => setlogin(false)}
        />

        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-center">{signup ? "Sign Up" : "Login"}</h2>
          <p className="text-gray-500 text-center text-sm mt-1">
            {signup ? "Create an account" : "Enter your credentials to continue"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 flex-1 justify-center"
        >
          {signup && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
          >
            {signup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center">
          {signup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setSignup(!signup)}
            className="text-indigo-600 hover:underline"
          >
            {signup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Loginpopup;
