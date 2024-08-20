// "https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments";

// Define API keys here
const API_KEY = 'RQursV2oo3cP2aRqEtL7ogzGcYxr9ngW';
const API_SECRET = 'NgjcYauVGrMBfbpM';

// Define endpoint URL here
const endpointUrl = new URL('https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments');

// Define header parameter here
const headerParameter = {
  'Content-Type': 'application/json'
};

// Define query parameter here
const hotelIds = 'ICNYCCF8';

const queryParameter = new URLSearchParams({
  hotelIds: hotelIds,
});

// Setting API call options
const options = {
  method: 'GET',
  headers: headerParameter,
};

// Function to make API call
async function getHotelRatings() {
  try {
    // Define access token here
    const ACCESS_TOKEN = await getAccessToken(API_KEY, API_SECRET);
    if (!ACCESS_TOKEN) 
      return;
    options.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    endpointUrl.search = queryParameter;
    const response = await fetch(endpointUrl, options);
    // Handling the response
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    // Printing error message
    console.error('Error:', error);
  }
}

// Calling function to make API call
getHotelRatings();
