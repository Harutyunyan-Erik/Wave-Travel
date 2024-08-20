// Define API keys here
const API_KEY = 'RQursV2oo3cP2aRqEtL7ogzGcYxr9ngW';
const API_SECRET = 'NgjcYauVGrMBfbpM';

// "https://test.api.amadeus.com/v2/shopping/flight-offers"

// Define endpoint URL here
const endpointUrl = 'https://test.api.amadeus.com/v2/shopping/flight-offers';

// Define query parameters here
const originLocationCode = 'NYC';
const destinationLocationCode = 'PAR';
const departureDate = new Date().toISOString().split('T')[0];
const adults = 1;

const queryParameters = new URLSearchParams({
  originLocationCode: originLocationCode,
  destinationLocationCode: destinationLocationCode,
  departureDate: departureDate,
  adults: adults.toString()
});

// Function to get access token
async function getAccessToken(apiKey, apiSecret) {
  const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: apiKey,
    client_secret: apiSecret
  });

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    console.error('Failed to fetch access token:', response.status, response.statusText);
    return null;
  }
}

// Function to make API call
export async function getFlightOffers() {
  try {
    const accessToken = await getAccessToken(API_KEY, API_SECRET);
    if (!accessToken) return;

    const response = await fetch(`${endpointUrl}?${queryParameters}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Flight Offers:', data);
    } else {
      console.error('Failed to fetch flight offers:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Calling function to make API call
getFlightOffers();
