const backendUrl = 'http://localhost:3001';

export const fetchRating = async (url) => {
  try {
    // Makes the request
    const response = await fetch(`${backendUrl}/bring_rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }), 
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch rating');
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching rating: ${error.message}`);
  }
};

export const fetchReviews = async (url) => {
  try {
    const response = await fetch(`${backendUrl}/separate_reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const reviewsText = await response.text();

    //Divide the text in individual lines
    const reviewsLines = reviewsText.split('\n');

    //Initialize the arrays 
    let positiveOpinionsData = [];
    let negativeOpinionsData = [];

    //Flags to indicate if they are positive or negative reviews
    let isPositive = false;
    let isNegative = false;

    // Iterate over every single line 
    reviewsLines.forEach((line, index) => {
      // Print current line
      //console.log(`Line ${index + 1}: ${line}`);

      // Set positive reviews
      if (line.startsWith('**Buenas:**')) {
        //console.log('Detected positive reviews');
        isPositive = true;
        isNegative = false;
      }
      // Set negative reviews
      else if (line.startsWith('**Malas:**')) {
        //console.log('Detected negative reviews');
        isPositive = false;
        isNegative = true;
      }
      // If set in positive reviews, add review to positive array
      else if (isPositive && line.trim() !== '') {
        //console.log('Adding to positive reviews:', line.trim());
        positiveOpinionsData.push(line.trim());
      }
      // If set in negative reviews, add review to negative array
      else if (isNegative && line.trim() !== '') {
        //console.log('Adding to negative reviews:', line.trim());
        negativeOpinionsData.push(line.trim());
      }
    });

    console.log('Positive Reviews:', positiveOpinionsData);
    console.log('Negative Reviews:', negativeOpinionsData);

    return { positiveOpinionsData, negativeOpinionsData };
  } catch (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
};