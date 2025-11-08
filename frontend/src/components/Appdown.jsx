import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Appdown = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 my-8 rounded-2xl" id="Appdown">
      {/* Heading */}
      <p className="text-2xl md:text-4xl font-semibold text-center">
        For a Better Experience, Download <br />
        <span className="text-[tomato]">Tomato App</span>
      </p>

      {/* Store Buttons */}
      <div className="flex gap-6">
        <a
          href="https://play.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={assets.play_store}
            alt="Google Play Store"
            className="h-12 md:h-16 cursor-pointer hover:scale-105 transition-transform"
          />
        </a>
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={assets.app_store}
            alt="Apple App Store"
            className="h-12 md:h-16 cursor-pointer hover:scale-105 transition-transform"
          />
        </a>
      </div>
    </div>
  );
};

export default Appdown;
