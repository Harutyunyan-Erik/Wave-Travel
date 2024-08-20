// "https://test.api.amadeus.com/v1/shopping/activities";

// RESPONSE 1

// Define API keys here
const API_KEY = 'RQursV2oo3cP2aRqEtL7ogzGcYxr9ngW';
const API_SECRET = 'NgjcYauVGrMBfbpM';

// Define endpoint URL here
const endpointUrl = new URL('https://test.api.amadeus.com/v1/shopping/activities');

// Define header parameter here
const headerParameter = {
  'Content-Type': 'application/json'
};

// Define query parameters here
const latitude = 40.7448170;
const longitude = -74.0005255;

const queryParameters = new URLSearchParams({
  latitude: latitude.toString(),
  longitude: longitude.toString()
});

// Setting API call options
const options = {
  method: 'GET',
  headers: headerParameter,
};

// Function to get the access token
async function getAccessToken(apiKey, apiSecret) {
  const tokenEndpoint = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  const tokenResponse = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: apiKey,
      client_secret: apiSecret
    })
  });
  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

// Function to print response
function printResponse(response) {
  response.json().then(data => console.log(data));
}

// Function to print error
function printError(error) {
  console.error('Error:', error);
}

// Function to make API call
async function getToursAndActivities() {
  try {
    // Define access token here
    const ACCESS_TOKEN = await getAccessToken(API_KEY, API_SECRET);
    if (!ACCESS_TOKEN) 
      return;
    options.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    endpointUrl.search = queryParameters;
    const response = await fetch(endpointUrl, options);
    // Printing response
    if (response.ok) {
      printResponse(response);
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    // Printing error message
    printError(error);
  }
}

// Calling function to make API call
getToursAndActivities();









// RESPONSE 2

// // Define API keys here
// const API_KEY = 'RQursV2oo3cP2aRqEtL7ogzGcYxr9ngW';
// const API_SECRET = 'NgjcYauVGrMBfbpM';

// // Define endpoint URL here
// const endpointUrl = new URL('https://test.api.amadeus.com/v1/shopping/activities');

// // Define header parameter here
// const headerParameter = {
//   'Content-Type': 'application/json'
// };

// // Define query parameters here
// const latitude = 40.7448170;
// const longitude = -74.0005255;

// const queryParameters = new URLSearchParams({
//   latitude: latitude.toString(),
//   longitude: longitude.toString()
// });

// // Setting API call options
// const options = {
//   method: 'GET',
//   headers: headerParameter,
// };

// // Function to make API call
// async function getToursAndActivities() {
//   try {
//     // Define access token here
//     const ACCESS_TOKEN = await getAccessToken(API_KEY, API_SECRET);
//     if (!ACCESS_TOKEN) 
//       return;
//     options.headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
//     endpointUrl.search = queryParameters;
//     const response = await fetch(endpointUrl, options);
//     // Handling the response
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//     } else {
//       console.error(`Error: ${response.status} - ${response.statusText}`);
//     }
//   } catch (error) {
//     // Printing error message
//     console.error('Error:', error);
//   }
// }

// // Calling function to make API call
// getToursAndActivities();
