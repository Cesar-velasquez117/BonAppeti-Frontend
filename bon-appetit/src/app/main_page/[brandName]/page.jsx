import React from "react";
import TurnBackHeader from "@/components/getBackHeader";

export default function BrandPage({ searchParams}) {
    const { brandName, logoImage, rating } = searchParams;

    return (
        <div>
            <TurnBackHeader />
            <div className="flex flex-col md:flex-row justify-center items-center mt-8">
                <div className="w-1/4 rounded-lg flex justify-center items-center bg-neutral p-4 mr-4 mb-8 md:mb-0">
                    <img src={logoImage} alt={brandName} className="h-60 w-60 rounded-lg" />
                </div>
                <div className="w-1/2 rounded-lg bg-neutral p-4">
                    <h1 className="font-crimson-pro font-bold text-xl">{brandName}</h1>
                    <p className=" font-crimson-pro text-gray-700 mt-2">Descripción de la cadena...</p>
                    <p className="font-crimson-pro text-gray-700 mt-2">Opinión general...</p>
                    <p className="font-crimson-pro text-gray-700 mt-2">Rating: {rating}</p>
                </div>
            </div>
        </div>
    );
};