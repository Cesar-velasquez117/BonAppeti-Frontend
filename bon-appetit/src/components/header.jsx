import { useClient } from 'next/client';
import React, {useState} from 'react';

const Header = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  }

  return (
    <header className="bg-primary py-4 flex justify-between items-center">
      <div className="ml-4">
        <img src="/images/logo.png" alt="Logo" className="h-16 w-auto" />
      </div>
      <div className="flex-grow mx-4 relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-3/5 px-4 py-2 rounded-lg bg-secondary text-black placeholder-gray-400 focus:outline-none focus:ring focus:ring-black"
        />
      </div>
    </header>
  );
};

export default Header;