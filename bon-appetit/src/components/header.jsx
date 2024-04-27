import React from 'react';


const Header = () => {
  return (
    <header className="bg-primary py-4 flex justify-between items-center">
      <div className="ml-4">
        <img src="/images/logo.png" alt="Logo" className="h-16 w-auto" />
      </div>
      <div className="flex-grow mx-4 relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-3/5 px-4 py-2 rounded-lg bg-secondary text-black placeholder-gray-400 focus:outline-none focus:ring focus:ring-black"
        />
      </div>
    </header>
  );
};

export default Header;