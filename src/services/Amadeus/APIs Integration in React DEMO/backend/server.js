import fetch from "node-fetch";
import express from "express";
import url from 'url';

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

// Function to make API call
async function getData(url, options) {
  try {
    const response = await fetch(url, options);
    const content = await response.json();
    const status = response.status;

    return [ status, content ];

  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

async function getHotelRatings(hotelId, dataOptions) {
  const hotelRatingsUrl = `https://test.api.amadeus.com/v2/e-reputation/hotel-sentiments?hotelIds=${hotelId}`;
  var hotelRatingsData = await getData(hotelRatingsUrl, dataOptions);
  return hotelRatingsData;
}

app.get("/tripplan", async function (req, res) {
  let parsedUrl = url.parse(req.originalUrl);

  const authorizationUrl = `https://test.api.amadeus.com/v1/security/oauth2/token`;
  const hotelsDataUrl = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${req.query.destinationLocationCode}&radius=5&radiusUnit=KM&hotelSource=ALL`;
  const flightsDataUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?${parsedUrl.query}`;
  
  // Define header parameters here
  const headerParameters = {
    contentType: 'application/json',
  };

  // Define body parameters here
  const bodyParameters = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'RQursV2oo3cP2aRqEtL7ogzGcYxr9ngW',
    client_secret: 'NgjcYauVGrMBfbpM'
  });

  // Setting API call options
  const authorizationOptions = {
    method: 'POST',
    headers: headerParameters,
    body: bodyParameters,
  };

  // Calling function to make API call
  var credentials = await getData(authorizationUrl, authorizationOptions);

  // Define header parameter here
  headerParameters['authorization'] = 'Bearer ' + credentials[1]['access_token'];
  
  // Setting API call options
  const dataOptions = {
    method: "GET",
    headers: headerParameters,
  };

  const tripItinerary = {
    originLocationCode: req.query.originLocationCode,
    destinationLocationCode: req.query.destinationLocationCode,
    departureDate: req.query.departureDate,
    adults: req.query.adults
  };

  var finalResponse = {
    'TripItinerary': tripItinerary
  }

  var hotelsData = await getData(hotelsDataUrl, dataOptions);
  var flightsData = await getData(flightsDataUrl, dataOptions);

  finalResponse['HotelsDataStatus'] = hotelsData[0];
  finalResponse['HotelsData'] = hotelsData[1];
  finalResponse['FlightsDataStatus'] = flightsData[0];
  finalResponse['FlightsData'] = flightsData[1];

  if (hotelsData[0] === 200 && hotelsData[1]['data'].length) {
    let clone = await Promise.all(hotelsData[1]['data'].map((obj) =>
      getHotelRatings(obj['hotelId'], dataOptions).then((hotelRatingsData) => {
        obj.hotelRatings = hotelRatingsData[1]['data'];
        return obj;
      })
    ));
    finalResponse['HotelsData'] = clone;
  }

  if (hotelsData[0] === 200 && flightsData[0] === 200)
    finalResponse['Status'] = 200;
  else
    finalResponse['Status'] = 503;

  console.log(JSON.stringify(finalResponse['Status']));
  res.end(JSON.stringify(finalResponse));
});

app.get("/tripsearch", async function (req, res) {
  let parsedUrl = url.parse(req.originalUrl);

  const authorizationUrl = `https://test.api.amadeus.com/v1/security/oauth2/token`;
  const dataUrl = `https://test.api.amadeus.com/v1/reference-data/recommended-locations?${parsedUrl.query}`;
  
  // Define header parameters here
  const headerParameters = {
    contentType: 'application/json',
  };

  // Define body parameters here
  const bodyParameters = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: 'RQursV2oo3cP2aRqEtL7ogzGcYxr9ngW',
    client_secret: 'NgjcYauVGrMBfbpM'
  });
  
  // Setting API call options
  const authorizationOptions = {
    method: 'POST',
    headers: headerParameters,
    body: bodyParameters,
  };

  // Calling function to make API call
  var credentials = await getData(authorizationUrl, authorizationOptions);

  // Define header parameter here
  headerParameters['authorization'] = 'Bearer ' + credentials[1]['access_token'];
  
  // Setting API call options
  const dataOptions = {
    method: "GET",
    headers: headerParameters,
  };

  var data = await getData(dataUrl, dataOptions);

  var finalResponse = {
    'Status': data[0], 
    'Data': data[1]
  }
  
  console.log(JSON.stringify(finalResponse['Status']));
  res.end(JSON.stringify(finalResponse));
});

app.listen(port);
console.log("Server started at https://ed-4905316290002944.educative.run:" + port);