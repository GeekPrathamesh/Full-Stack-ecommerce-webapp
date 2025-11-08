import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-gray-300 p-4 sm:p-8 flex flex-col md:flex-row justify-evenly gap-4" id="contact">
      <div className="max-w-[600px] flex-col flex gap-6 p-2">
        <h1 className="text-5xl text-[tomato] font-bold">Tomato</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          debitis amet neque aspernatur quo enim cupiditate rerum delectus minus
          id sapiente totam molestias assumenda voluptatum, maiores labore
          dolorem! At explicabo facilis quibusdam provident. Vel.
        </p>
        <div className="flex gap-8 ">
          <a href="https://geekprathamesh.vercel.app" target="_blank">
            <img
              className="cursor-pointer"
              src={assets.twitter_icon}
              alt="twitter"
            />
          </a>
          <a href="https://geekprathamesh.vercel.app" target="_blank">
            <img
              className="cursor-pointer"
              src={assets.facebook_icon}
              alt="twitter"
            />
          </a>
          <a href="https://geekprathamesh.vercel.app" target="_blank">
            <img
              className="cursor-pointer"
              src={assets.linkedin_icon}
              alt="twitter"
            />
          </a>
        </div>
        <hr className="h-1 w-3/4 block mr-auto md:hidden" />
      </div>
      <div className="p-2 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">COMPANY</h1>
        <ul className="flex flex-col gap-2">
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
        <hr className="h-1 w-3/4 block mr-auto md:hidden" />
      </div>
      <div className="p-2 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">GET IN TOUCH</h1>{" "}
        <ul className="flex flex-col gap-2">
          <li>+9423 341615</li>
          <li>contact@tomato.com</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
