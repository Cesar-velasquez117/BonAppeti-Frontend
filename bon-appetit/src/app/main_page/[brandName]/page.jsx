'use client'
import React, {useEffect, useState} from "react";
import TurnBackHeader from "@/components/getBackHeader";
import { fetchRating, fetchReviews } from "@/functions/requests";

export default function BrandPage({ searchParams}) {
    const { brandName, logoImage, url } = searchParams;
    const [rating, setRating] = useState(null);
    const [positiveReviews, setPositiveReviews] = useState([]);
    const [negativeReviews, setNegativeReviews] = useState([]);
    const [generalOpinion, setGeneralOpinion] = useState('');
    const [goodFoods, setGoodFoods] = useState([]);
    const [badFoods, setBadFoods] = useState([]);

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
        const fetchReviewsData = async () => {
            try {
                const reviewsData = await fetchReviews(url);
                console.log(reviewsData);
                const positiveReviewsData = reviewsData.positiveOpinionsData;
                const negativeReviewsData = reviewsData.negativeOpinionsData;
                const goodFoodData = reviewsData.positiveFoodData;
                const badFoodData = reviewsData.negativeFoodData;
                const opinionData = reviewsData.generalOpinion;
                setPositiveReviews(positiveReviewsData);
                setNegativeReviews(negativeReviewsData);
                setGoodFoods(goodFoodData);
                setBadFoods(badFoodData);
                setGeneralOpinion(opinionData);

                } catch (error) {
                    fetchReviewsData
                    console.error("Error fetching reviews:", error);
                }
            };
            fetchReviewsData();
    }, []);

    // useEffect(() => {
    //     const fetchReviewsData = async () => {
    //         try {
    //             const reviewsData = await fetchReviews(url);
    //             console.log(reviewsData);
    //             const positiveReviewsData = reviewsData.positiveOpinionsData;
    //             const negativeReviewsData = reviewsData.negativeOpinionsData;
    //             const goodFoodData = reviewsData.positiveFoodData;
    //             const badFoodData = reviewsData.negativeFoodData;
    //             const opinionData = reviewsData.generalOpinion;
    //             setPositiveReviews(positiveReviewsData);
    //             setNegativeReviews(negativeReviewsData);
    //             setGoodFoods(goodFoodData);
    //             setBadFoods(badFoodData);
    //             setGeneralOpinion(opinionData);

    //             } catch (error) {
    //                 fetchReviewsData
    //                 console.error("Error fetching reviews:", error);
    //             }
    //         };
    //         fetchReviewsData();
    //     }, []);

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
                    <p className="font-crimson-pro text-gray-700 mt-2">General opinion: {generalOpinion}</p>
                    <p className="font-crimson-pro text-gray-700 mt-2">Rating: {rating} out of 5</p>
                </div>
            </div>
            <h2 className="font-crimson-pro font-bold text-2xl mt-8 mb-4 text-center">Reviews</h2>
            <div className="mt-8 mx-auto w-3/4 bg-neutral rounded-lg p-4">
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
            <h2 className="font-crimson-pro font-bold text-2xl mt-8 mb-4 text-center">Food Recomendations</h2>
            <div className="mt-8 mx-auto w-3/4 bg-neutral rounded-lg p-4 mb-8">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="font-crimson-pro text-gray-700 border-b-2">Good Food</th>
                            <th className="font-crimson-pro text-gray-700 border-b-2">Bad Food</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Generate rows alternating between positive and negative reviews */}
                    {goodFoods.map((goodFood, index) => (
                        <tr key={index}>
                            <td className="font-crimson-pro text-gray-700 border-b">{goodFood}</td>
                            <td className="font-crimson-pro text-gray-700 border-b">
                            {badFoods[index] || ""}
                            </td>
                        </tr>
                    ))}
                    {/* Add adicional rows for negative reviews if necessary */}
                    {badFoods.slice(goodFoods.length).map((badFood, index) => (
                        <tr key={index}>
                            <td className="font-crimson-pro text-gray-700 border-b"></td>
                            <td className="font-crimson-pro text-gray-700 border-b">{badFood}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};