// // Import React (if using in a file where it's required)
// import React from 'react';

// // Define endpoint URL here
// const endpointUrl = `https://test.api.amadeus.com/v1/security/oauth2/token`;

// // Define header parameters here
// const headerParameters = {
//   'Content-Type': 'application/x-www-form-urlencoded', // Adjusted to match your `bodyParameters` format
// };

// // Define body parameters here
// const bodyParameters = new URLSearchParams({
//   grant_type: 'client_credentials',
//   client_id: 'RQursV2oo3cP2aRqEtL7ogzGcYxr9ngW',
//   client_secret: 'NgjcYauVGrMBfbpM'
// });

// // Setting API call options
// const options = {
//   method: 'POST',
//   headers: headerParameters,
//   body: bodyParameters,
// };

// // Function to make API call
// async function generateAccessToken() {
//   try {
//     const response = await fetch(endpointUrl, options);
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // React Component
// const AmadeusApp = () => {
//   React.useEffect(() => {
//     generateAccessToken();
//   }, []);

//   return (
//     <div>
//       <h1>Amadeus API Authentication</h1>
//     </div>
//   );
// };

// export default AmadeusApp;



// AmadeusApp.js

const API_KEY = 'RQursV2oo3cP2aRqEtL7ogzGcYxr9ngW';
const API_SECRET = 'NgjcYauVGrMBfbpM';

let cachedToken = null;

async function getAccessToken(apiKey, apiSecret) {
  if (cachedToken) return cachedToken;

  const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: apiKey,
      client_secret: apiSecret,
    }),
  });
  const data = await response.json();
  cachedToken = data.access_token;
  return cachedToken;
}

async function handleResponse(url, options) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  }

async function fetchFromAmadeus(endpoint, queryParameters) {
    const ACCESS_TOKEN = await getAccessToken(API_KEY, API_SECRET);
    if (!ACCESS_TOKEN) return { error: 'Failed to get access token' };
  
    const url = new URL(endpoint);
    url.search = new URLSearchParams(queryParameters).toString();
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    };
  
    try {
      return await handleResponse(url, options);
    } catch (error) {
      return { error: error.message };
    }
  }
  

const AmadeusApp = async () => {
  const endpoints = {
    flightOffers: 'https://test.api.amadeus.com/v2/shopping/flight-offers',
    flightStatus: 'https://test.api.amadeus.com/v2/schedule/flights',
    airportsAndCities: 'https://test.api.amadeus.com/v1/reference-data/locations',
    hotels: 'https://test.api.amadeus.com/v1/reference-data/locations/hotel',
    hotelRatings: 'https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments',
    touristSpots: 'https://test.api.amadeus.com/v1/reference-data/locations/pois',
    toursAndActivities: 'https://test.api.amadeus.com/v1/shopping/activities',
    tripPurpose: 'https://test.api.amadeus.com/v1/travel/predictions/trip-purpose',
    tripRecommendations: 'https://test.api.amadeus.com/v1/reference-data/recommended-locations',
  };

  const queryParameters = {
    flightOffers: {
      originLocationCode: 'NYC',
      destinationLocationCode: 'PAR',
      departureDate: new Date().toISOString().split('T')[0],
      adults: '1',
    },
    flightStatus: {
      carrierCode: 'AA',
      flightNumber: '319',
      scheduledDepartureDate: new Date().toISOString().split('T')[0],
    },
    airportsAndCities: {
      subType: 'AIRPORT',
      keyword: 'YORK',
    },
    hotels: {
      keyword: 'YORK',
      subType: 'HOTEL_LEISURE',
    },
    hotelRatings: {
      hotelIds: 'ICNYCCF8',
    },
    touristSpots: {
      latitude: '40.7448170',
      longitude: '-74.0005255',
    },
    toursAndActivities: {
      latitude: '40.7448170',
      longitude: '-74.0005255',
    },
    tripPurpose: {
      originLocationCode: 'NYC',
      destinationLocationCode: 'PAR',
      departureDate: new Date().toISOString().split('T')[0],
      returnDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
    },
    tripRecommendations: {
      cityCodes: 'NYC',
    },
  };

  const results = {};
  for (const [key, endpoint] of Object.entries(endpoints)) {
    results[key] = await fetchFromAmadeus(endpoint, queryParameters[key]);
  }
  return results;
}

export default AmadeusApp;
