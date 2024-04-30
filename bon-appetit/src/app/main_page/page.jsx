'use client';
import React, {useState} from 'react';
import Header from '@/components/header';
import Card from '@/components/card';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const cards = [
    { brandName: "Mc Donald's", logoImage: "/images/McDonald's_logo.png", rating: 3.5 },
    { brandName: "Mister Wings", logoImage: "/images/mister-wings.png", rating: 4.0 }
  ];

  const filteredCards = cards.filter(card =>
    card.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <Header onSearchChange={setSearchTerm}/>
      <div className="container mx-auto w-1/2 sm:w-3/4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-32">
        {filteredCards.map((card, index) => (
          <Card
            key={index}
            brandName={card.brandName}
            logoImage={card.logoImage}
            rating={card.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
