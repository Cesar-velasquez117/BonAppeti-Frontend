'use client'
import React, {useEffect, useState} from "react";
import TurnBackHeader from "@/components/getBackHeader";
import { fetchRating, fetchReviews } from "@/functions/requests";

export default function BrandPage({ searchParams}) {
    const { brandName, logoImage, url } = searchParams;
    const [rating, setRating] = useState(null);
    const [positiveReviews, setPositiveReviews] = useState([]);
    const [negativeReviews, setNegativeReviews] = useState([]);

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

    useEffect(() => {
        const fetchReviewsData = async () => {
            try {
                const reviewsData = await fetchReviews(url);
                console.log(reviewsData);
                const positiveReviewsData = reviewsData.positiveOpinionsData;
                const negativeReviewsData = reviewsData.negativeOpinionsData;
                console.log("Pase de la asignacion" + positiveReviewsData)
                setPositiveReviews(positiveReviewsData);
                setNegativeReviews(negativeReviewsData);

                } catch (error) {
                    fetchReviewsData
                    console.error("Error fetching reviews:", error);
                }
            };
            fetchReviewsData();
        }, []);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         // Fetch rating
    //         const ratingData = await fetchRating(url);
    //         setRating(ratingData);
    
    //         // Fetch reviews
    //         const reviewsData = await fetchReviews(url);
    //         const { positiveReviewsData, negativeReviewsData } = reviewsData;
    
    //         // Set positive and negative opinions
    //         setPositiveReviews(positiveReviewsData);
    //         setNegativeReviews(negativeReviewsData);
    //       } catch (error) {
    //         console.error("Error fetching data:", error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);

    return (
        <div>
            <TurnBackHeader />
            <div className="flex flex-col md:flex-row justify-center items-center mt-8">
                <div className="w-1/2 md:w-1/4 rounded-lg flex justify-center items-center bg-neutral p-4 mr-4 mb-8 md:mb-0">
                    <img src={logoImage} alt={brandName} className="h-40 w-full md:h-60 md:w-60 rounded-lg" />
                </div>
                <div className="w-1/2 rounded-lg bg-neutral p-4">
                    <h1 className="font-crimson-pro font-bold text-xl">{brandName}</h1>
                    <p className=" font-crimson-pro text-gray-700 mt-2">Description: ...</p>
                    <p className="font-crimson-pro text-gray-700 mt-2">General opinion: ...</p>
                    <p className="font-crimson-pro text-gray-700 mt-2">Rating: {rating} out of 5</p>
                </div>
            </div>
            <div className="mt-8 mx-auto w-3/4">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="font-crimson-pro text-gray-700 border-b-2">Positive Reviews</th>
                            <th className="font-crimson-pro text-gray-700 border-b-2">Negative Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Generate rows alternating between positive and negative reviews */}
                    {positiveReviews.map((positiveReview, index) => (
                        <tr key={index}>
                            <td className="font-crimson-pro text-gray-700 border-b">{positiveReview}</td>
                            <td className="font-crimson-pro text-gray-700 border-b">
                            {negativeReviews[index] || ""}
                            </td>
                        </tr>
                    ))}
                    {/* Add adicional rows for negative reviews if necessary */}
                    {negativeReviews.slice(positiveReviews.length).map((negativeReview, index) => (
                        <tr key={index}>
                            <td className="font-crimson-pro text-gray-700 border-b"></td>
                            <td className="font-crimson-pro text-gray-700 border-b">{negativeReview}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};