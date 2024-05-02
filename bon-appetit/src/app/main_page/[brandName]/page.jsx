'use client'
import React, {useEffect, useState} from "react";
import TurnBackHeader from "@/components/getBackHeader";
import { fetchRating } from "@/functions/requests";

export default function BrandPage({ searchParams}) {
    const { brandName, logoImage, url } = searchParams;
    const [rating, setRating] = useState(null);

    useEffect(() => {
        const fetchRatingData = async () => {
            try {
                const ratingData = await fetchRating(url);
                setRating(ratingData); 
            } catch (error) {
                fetchRatingData();
                console.error("Error fetching rating:", error);
            }
        };

        fetchRatingData();

    }, []);

    return (
        <div>
            <TurnBackHeader />
            <div className="flex flex-col md:flex-row justify-center items-center mt-8">
                <div className="w-1/2 md:w-1/4 rounded-lg flex justify-center items-center bg-neutral p-4 mr-4 mb-8 md:mb-0">
                    <img src={logoImage} alt={brandName} className="h-40 w-full md:h-60 md:w-60 rounded-lg" />
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