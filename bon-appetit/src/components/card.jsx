import React from 'react';
import Link from 'next/link';

const Card = ({ brandName, logoImage, rating }) => {
  return (
    <Link href={`/main_page/${encodeURIComponent(brandName)}`}>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <div className="bg-primary p-4 flex justify-between items-center">
          <div className="mr-3">
            <h1 className="font-crimson-pro text-white font-semibold">{brandName}</h1>
            <p className="mt-6 font-crimson-pro text-white">Overall Rating: {rating}</p>
          </div>
          <img src={logoImage} alt="Logo" className="h-20 sm:h-24 mr-4" />
        </div>
      </div>
    </Link>
  );
};

export default Card;