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
    const response = await fetch(`${backendUrl}/bring_info_from_reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json()
    const reviewsText = data[0];
    const foods = data[1];
    const generalOpinion = data[2];
    console.log(foods);
    console.log(generalOpinion);

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

    //Divide the text in individual lines
    const foodsLines = foods.split('\n');

    //Initialize the arrays 
    let positiveFoodData = [];
    let negativeFoodData = [];

    // Iterate over every single line 
    foodsLines.forEach((line, index) => {
      // Print current line
      //console.log(`Line ${index + 1}: ${line}`);

      // Set positive reviews
      if (line.startsWith('**Comidas consideradas buenas:**') || line.startsWith('**Buenas:**') || line.startsWith('**Buenas comidas:**')) {
        //console.log('Detected positive reviews');
        isPositive = true;
        isNegative = false;
      }
      // Set negative reviews
      else if (line.startsWith('**Comidas consideradas malas:**') || line.startsWith('**Malas:**') || line.startsWith('**Malas comidas:**')) {
        //console.log('Detected negative reviews');
        isPositive = false;
        isNegative = true;
      }
      // If set in positive reviews, add review to positive array
      else if (isPositive && line.trim() !== '') {
        //console.log('Adding to positive reviews:', line.trim());
        positiveFoodData.push(line.trim());
      }
      // If set in negative reviews, add review to negative array
      else if (isNegative && line.trim() !== '') {
        //console.log('Adding to negative reviews:', line.trim());
        negativeFoodData.push(line.trim());
      }
    });
    //console.log("Recomendamos:" + positiveFoodData)
    //console.log("No recomendamos:" + negativeFoodData)

    return { positiveOpinionsData, negativeOpinionsData, positiveFoodData, negativeFoodData, generalOpinion };
  } catch (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }
};