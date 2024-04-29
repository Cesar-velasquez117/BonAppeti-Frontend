import React from 'react';

const Card = ({ brandName, logoImage, rating }) => {
  return (
    <div className="bg-primary rounded-lg overflow-hidden shadow-md">
      <div className=" p-4 flex justify-between items-center">
        <div className="mx-4 rounded-lg">
          <h1 className="text-white font-crimson-pro font-semibold">{brandName}</h1>
          <p className="mt-6 font-crimson-pro text-white">Overall Rating: {rating}</p>
        </div>
        <img src={logoImage} alt="Logo" className="h-20 rounded-lg sm:h-24 mr-4" />
      </div>
    </div>
  );
};

export default Card;