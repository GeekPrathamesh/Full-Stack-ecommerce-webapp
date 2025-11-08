import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full bg-gray-100 p-6">
      {/* Welcome Card */}
      <div className="bg-white rounded-lg shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Food Delivery Admin Panel
        </h1>
        <p className="text-gray-600 text-lg">
          Manage orders, users, restaurants, and view reports from here.
        </p>
      </div>
    </div>
  );
};

export default Home;
