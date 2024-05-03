import React from 'react';
import Link from 'next/link';

const Card = ({ brandName, logoImage, url }) => {
  return (
    <Link href={{
      pathname: `/main_page/${encodeURIComponent(brandName)}`,
      query: {brandName, logoImage, url},
      }} passHref>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <div className="bg-primary p-4 flex justify-between items-center">
          <div className="mr-3">
            <h1 className="font-crimson-pro text-white font-semibold">{brandName}</h1>
          </div>
          <img src={logoImage} alt="Logo" className="h-20 rounded-lg sm:h-24 mr-4" />
        </div>
      </div>
    </Link>
  );
};

export default Card;