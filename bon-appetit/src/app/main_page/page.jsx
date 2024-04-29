import React from 'react';
import Header from '@/components/header';
import Card from '@/components/card';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto w-1/2 sm:w-3/4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-32">
        <Card
          brandName="Mc Donald's"
          logoImage="/images/McDonald's_logo.png"
          rating={3.5}
        />
        <Card
          brandName="Mister Wings"
          logoImage="/images/mister-wings.png"
          rating={4.0}
        />
      </div>
    </div>
  );
};

export default HomePage;
