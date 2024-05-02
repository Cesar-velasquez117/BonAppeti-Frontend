'use client';
import React, {useState, useEffect} from 'react';
import Header from '@/components/header';
import Card from '@/components/card';


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const obtainedCards = [
        { brandName: "Mc Donald's", logoImage: "/images/McDonald's_logo.png" },
        { brandName: "Mister Wings", logoImage: "/images/mister-wings.png" },
        { brandName: "Domino's Pizza", logoImage: "/images/Domino's_pizza_logo.png"},
        { brandName: "El Corral", logoImage: "/images/El_corral.png"},
        { brandName: "Subway", logoImage: "/images/Subway.png"},
        { brandName: "King Papa", logoImage: "/images/Kingpapa.png"},
        { brandName: "Frisby", logoImage: "/images/Frisby.jpg"},
        { brandName: "Qbano", logoImage: "/images/Qbano.png"},
        { brandName: "Little Caesars Pizza", logoImage: "/images/Little_Caesars.png"},
        { brandName: "Burger King", logoImage: "/images/Burger-King.jpg"},
        { brandName: "Alitas Factory", logoImage: "/images/Alitas_factory.jpg"},
        { brandName: "El Gaon", logoImage: "/images/Gaon.jpg"},
        { brandName: "Tierra De Todos", logoImage: "/images/TDT.png"},
        { brandName: "Cheers Pizzeria", logoImage: "/images/Cheers.jpg"},
        { brandName: "Papa John's", logoImage: "/images/Papa_John's_Logo.png"},
        { brandName: "Presto", logoImage: "/images/presto.jpg"},
        { brandName: "Salchiburger", logoImage: "/images/Salchiburger.jpg"},
        { brandName: "El Chuzo de Nando", logoImage: "/images/Chuzo_nando.png"},
        { brandName: "Butcher", logoImage: "/images/Butcher.jpg"},
        { brandName: "NK", logoImage: "/images/NK.jpg"},
        { brandName: "Burger Stack", logoImage: "/images/Stack.jpg"},
        { brandName: "Shake Burger", logoImage: "/images/Shake.png"},
        { brandName: "La Gastro House", logoImage: "/images/Gastro.png"},
        { brandName: "Warner Foods", logoImage: "/images/Warner.jpg"},
        { brandName: "Hashtag", logoImage: "/images/Hashtag.png"},
        { brandName: "El gringo American Kitchen", logoImage: "/images/Gringo.jpg"},
      ];
      
      for (const card of obtainedCards) {
        const rating = 3.0;
        card.rating = rating;
      }

      setCards(obtainedCards);
    };

    fetchCards();
  }, []);

  const filteredCards = cards.filter(card =>
    card.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header onSearchChange={setSearchTerm}/>
      <div className="container mx-auto w-1/2 sm:w-3/4 mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-32">
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
