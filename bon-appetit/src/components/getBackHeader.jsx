import React from 'react';
import Link from 'next/link';

const TurnBackHeader = () => {
  return (
    <header className="bg-primary py-4 flex justify-between items-center">
      <Link href={`/main_page`}>
        <svg  xmlns="http://www.w3.org/2000/svg"  width="40"  height="40"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l4 4" /><path d="M5 12l4 -4" /></svg>
      </Link>
    </header>
  );
};

export default TurnBackHeader;