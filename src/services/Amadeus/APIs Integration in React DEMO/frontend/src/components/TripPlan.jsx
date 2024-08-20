import React, { useState, useEffect } from 'react';
import useFetch from "../hooks/useFetch";
import Select from 'react-select';
import cityAndAirportCodes from './CityAndAirportCodes';
import {upperFirst, lowerCase, startCase} from 'lodash';

const TripPlan = () => {
    const [url, setUrl] = useState(null); 
    const [travelData, setTravelData] = useState(null);
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [adults , setAdults] = useState('');
    const [source , setSource] = useState('');
    const [destination , setDestination] = useState('');
    const [travelClass , setTravelClass] = useState('');
    const [nonStop , setNonStop] = useState('');
    
    // Setting API call options
    const options = {
        method: 'GET',
    };
    
    const optionsStr = JSON.stringify(options);
    const { data, responseStatus, error } = useFetch(url, optionsStr);    
    const [alertText , setAlertText] = useState('');
    const [flag , setFlag] = useState(false);
    
    const handleAdultsChange = (x) => {
        setAdults(x.target.value);
    }

    const handleDepartureDateChange = (x) => {
        setDepartureDate(x.target.value);
    }

    const handleReturnDateChange = (x) => {
        setReturnDate(x.target.value);
    }

    const unique = (arr, props = []) => [...new Map(arr.map(entry => [props.map(k => entry['itineraries'][0]['segments'][0][k]).join('|'), entry])).values()];

    useEffect(() => {
        if (error || (responseStatus && responseStatus !== 200)) {
            setTravelData(null);
            setFlag(false);
            setAlertText("Request could not be processed!");
        }
        else if (data) {
            if (data['Status'] === 200) {
                setAlertText('');
                setTravelData(data);
            }
            else {
                setTravelData(null);
                setFlag(false);
                setAlertText("Request could not be processed!");
            }
        }
    }, [data, responseStatus, error]);

    let caCodes = [];
    caCodes = Object.entries(JSON.parse((JSON.stringify(cityAndAirportCodes)))).map(([key, value]) => 
    { 
        let tempObj = {}; 
        tempObj['label'] = key;
        tempObj['value'] = value;
        return tempObj;
    });

    const travelClasses = [
        {
          label: "Economy",
          value: "ECONOMY",
        },
        {
          label: "Premium Economy",
          value: "PREMIUM_ECONOMY",
        },
        {
          label: "Business",
          value: "BUSINESS",
        },
        {
          label: "First",
          value: "FIRST",
        }
    ];

    const nonStopOptions = [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        }
    ];
      
    const handleSubmit = async (x) => {
        x.preventDefault();
        setFlag(true);
        setAlertText('');

        if (typeof source.value !== 'undefined' && typeof destination.value !== 'undefined') {
            const endpointUrl = new URL(`https://ed-4905316290002944.educative.run/tripplan`);

            let queryParameters = new URLSearchParams({
                originLocationCode: source.value,
                destinationLocationCode: destination.value,
                departureDate: departureDate,
                adults: adults
            });

            if (returnDate !== '') 
                queryParameters.append('returnDate', returnDate)
            if (typeof travelClass.value !== 'undefined') 
                queryParameters.append('travelClass', travelClass.value)
            if (typeof nonStop.value !== 'undefined') 
                queryParameters.append('nonStop', nonStop.value)
        
            endpointUrl.search = queryParameters;
            setUrl(endpointUrl);
        }
        else {
            setTravelData(null);
            setFlag(false);
            setAlertText("Required field(s) missing!");
        }
    }

    if (!flag || alertText) {
        return (
            <div className="d-flex flex-column h-100 bg-dark">
                    <main className="flex-shrink-0">
                        <div className="container col-10 border border-secondary rounded min-vh-100 bg-light ps-5 pe-5">
                        
                        <div class="row text-center t-3 pb-3">
                            <div class="col">
                                <hr />    
                                <img src="/amadeus.png" alt="Amadeus" className="card-img-top mb-2 mt-2 w-25" />
                                <hr />        
                                <div class="bg-dark p-2 text-dark bg-opacity-10"><h4>Plan a Trip</h4></div>
                            </div>
                        </div>

                        <div class="row text-center justify-content-center pb-3">
                        {alertText &&
                            <div class="col-6">
                                <div class={`alert alert-danger mt-4`} role="alert">
                                    {alertText}
                                </div>
                            </div>
                        }
                        </div>
                        <p>Fill the form below to get some flight and hotel options for your trip.</p>
                        <form onSubmit={(x) => {handleSubmit(x)}}>
                            <div className="row g-3 mt-3">
                                <div className="col-md-3">
                                    <strong><label for="source" className="form-label">Origin<span class='text-danger'> *</span></label></strong>
                                    <Select 
                                        onChange={setSource}
                                        options={caCodes}
                                        placeholder="Select origin"
                                    />
                                    <span><i>Departure from</i></span>
                                </div>
                                <div className="col-md-3">
                                    <strong><label for="destination" className="form-label">Destination<span class='text-danger'> *</span></label></strong>
                                    <Select 
                                        onChange={setDestination}
                                        options={caCodes}
                                        placeholder="Select destination"
                                    />
                                    <span><i>Arrival at</i></span>
                                </div>
                            </div>
                            <div className="row g-3 mt-3">
                                <div className="col-md-3">
                                    <strong><label for="departureDate" className="form-label">Departure Date<span class='text-danger'> *</span></label></strong>
                                    <input type="date" value={departureDate} className="form-control" id="departureDate" placeholder="Enter date of departure" required onChange={(x) => {handleDepartureDateChange(x)}} />
                                    <span><i>Date of departure</i></span>
                                </div>
                                <div className="col-md-3">
                                    <strong><label for="returnDate" className="form-label">Return Date</label></strong>
                                    <input type="date" value={returnDate} className="form-control" id="returnDate" placeholder="Enter date of return" onChange={(x) => {handleReturnDateChange(x)}} />
                                    <span><i>Date of return</i></span>
                                </div>
                            </div>
                            <div className="row g-3 mt-3">
                                <div className="col-md-3">
                                    <strong><label for="adults" className="form-label">No. of Adults<span class='text-danger'> *</span></label></strong>
                                    <input type="number" value={adults} className="form-control" id="adults" placeholder="Enter no. of adults" required onChange={(x) => {handleAdultsChange(x)}} />
                                    <span><i>No. of adult passengers</i></span>
                                </div>
                                <div className="col-md-3">
                                    <strong><label for="travelClass" className="form-label">Travel Class</label></strong>
                                    <Select 
                                        onChange={setTravelClass}
                                        options={travelClasses}
                                        placeholder="Select travel class"
                                    />
                                    <span><i>Travel class</i></span>
                                </div>
                                <div className="col-md-3">
                                    <strong><label for="nonStop" className="form-label">Non-stop</label></strong>
                                    <Select 
                                        onChange={setNonStop}
                                        options={nonStopOptions}
                                        placeholder="Select option"
                                    />
                                    <span><i>Non-stop flights</i></span>
                                </div>
                            </div>
                            <div className="row g-3 mt-3">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-success">Submit</button><br /><br />
                                    <a href="/" className="btn btn-danger">Back</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        );
    } else { 
        if (travelData === null) {
            return(
                <div className="text-center" style={{ paddingTop: '300px' }}>
                    <div class="spinner-border text-dark" role="status" style={{ width: '3rem', height:'3rem' }}>
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        } else {            
            return (
                <div className="d-flex flex-column h-100 bg-dark">
                    <main className="flex-shrink-0">
                        <div className="container col-10 border border-secondary rounded min-vh-100 bg-light ps-5 pe-5">
                            <div class="row text-center t-3 pb-3">
                                <div class="col">
                                    <hr />    
                                    <img src="/amadeus.png" alt="Amadeus" className="card-img-top mb-2 mt-2 w-25" />
                                    <hr />        
                                    <div class="bg-dark p-2 text-dark bg-opacity-10"><h4>Plan a Trip</h4></div>                                    
                                </div>
                            </div>

                            <div class="row text-center justify-content-center">
                                {alertText ?
                                    <div class="col-6">
                                        <div class={`alert alert-danger mt-4`} role="alert">
                                            {alertText}
                                        </div>
                                    </div> : <h6>Below is the trip itinerary along with some flight and hotel options.</h6>
                                }
                            </div>
                            <div class="row justify-content-center mt-5">
                                <div class="col-10">
                                    <div class="card border border-dark">
                                        <h5 class="card-header bg-dark text-bg-dark text-center">Trip Itinerary</h5>
                                        <div class="card-body">
                                            <div class="container text-center">
                                                <div class="row align-items-start pt-3 pb-3">
                                                    <div class="col-5">
                                                        <h5>{Object.keys(cityAndAirportCodes).find(key => cityAndAirportCodes[key] === travelData['TripItinerary']['originLocationCode'])}</h5>
                                                    </div>
                                                    <div class="col-2">
                                                        <img src="aircraft.png" alt="Aircraft" width={70} />
                                                    </div>
                                                    <div class="col-5">
                                                        <h5>{Object.keys(cityAndAirportCodes).find(key => cityAndAirportCodes[key] === travelData['TripItinerary']['destinationLocationCode'])}</h5>
                                                    </div>
                                                </div>
                                                <div class="row align-items-start pt-3 pb-3">
                                                    <div class="col">
                                                        <div class="bg-dark p-2 text-dark bg-opacity-10"><p class="card-text"><strong>Departure Date: </strong>{travelData['TripItinerary']['departureDate']}</p></div>
                                                        <div class="bg-dark p-2 text-dark bg-opacity-10"><p class="card-text"><strong>No. of Adults: </strong>{travelData['TripItinerary']['adults']}</p></div>        
                                                    </div>
                                                </div>    
                                            </div>
                                            <hr /><br />
                                            <nav>
                                                <div class="nav nav-pills border border-primary rounded" id="nav-tab" role="tablist">
                                                    <button class="nav-link active w-50" id="nav-flight-tab" data-bs-toggle="tab" data-bs-target="#nav-flight" type="button" role="tab" aria-controls="nav-flight" aria-selected="true">Flight Options</button>
                                                    <button class="nav-link w-50" id="nav-hotel-tab" data-bs-toggle="tab" data-bs-target="#nav-hotel" type="button" role="tab" aria-controls="nav-hotel" aria-selected="false">Hotel Options</button>
                                                </div>
                                            </nav>
                                            <div class="tab-content" id="nav-tabContent">
                                                <div class="tab-pane fade show active" id="nav-flight" role="tabpanel" aria-labelledby="nav-flight-tab" tabIndex="0">
                                                    <div class="accordion accordion-flush border m-5" id="accordionFlushExample1">
                                                        {unique(travelData['FlightsData']['data'], ['carrierCode', 'number']).sort((a, b) => (parseFloat(a['price']['grandTotal']) > parseFloat(b['price']['grandTotal'])) ? 1 : -1).map((obj, index) => {
                                                            return (
                                                                <div class="accordion-item">
                                                                    <h2 class="accordion-header" id={`flush-heading${index}`}>
                                                                    <button class="accordion-button collapsed bg-dark text-bg-dark bg-gradient" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                                                                        <h5 className='mt-1'>{startCase(lowerCase(travelData['FlightsData']['dictionaries']['carriers'][obj['itineraries'][0]['segments'][0]['carrierCode']]))}</h5><small><em>&ensp;&ensp;&ensp;&ensp;Price: {obj['price']['grandTotal']} {obj['price']['currency']} | Seats left: {obj['numberOfBookableSeats']}</em></small>
                                                                    </button>
                                                                    </h2>
                                                                    <div id={`flush-collapse${index}`} class="accordion-collapse collapse" aria-labelledby={`flush-heading${index}`} data-bs-parent="#accordionFlushExample1">
                                                                        <div class="accordion-body bg-light bg-gradient">
                                                                            <p><strong>Flight No.: </strong>{obj['itineraries'][0]['segments'][0]['carrierCode']}-{obj['itineraries'][0]['segments'][0]['number']}</p>
                                                                            <p><strong>Departure Date and Time: </strong>{obj['itineraries'][0]['segments'][0]['departure']['at'].split('T')[0]}, {obj['itineraries'][0]['segments'][0]['departure']['at'].split('T')[1]}</p>
                                                                            <p><strong>Arrival Date and Time: </strong>{obj['itineraries'][0]['segments'].slice(-1)[0]['arrival']['at'].split('T')[0]}, {obj['itineraries'][0]['segments'].slice(-1)[0]['arrival']['at'].split('T')[1]}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                                <div class="tab-pane fade" id="nav-hotel" role="tabpanel" aria-labelledby="nav-hotel-tab" tabIndex="0">
                                                    <div class="accordion accordion-flush border m-5" id="accordionFlushExample2">
                                                        {travelData['HotelsData'].sort((a, b) => (parseFloat(a['distance']['value']) > parseFloat(b['distance']['value'])) ? 1 : -1).map((obj, index) => {
                                                            return (
                                                                <div class="accordion-item">
                                                                    <h2 class="accordion-header" id={`flush-heading${index}`}>
                                                                    <button class="accordion-button collapsed bg-dark text-bg-dark bg-gradient" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                                                                        <h5 className='mt-1'>{startCase(lowerCase(obj['name']))}</h5><small><em>&ensp;&ensp;&ensp;&ensp;Distance from the airport: {obj['distance']['value']} {obj['distance']['unit']}</em></small>
                                                                    </button>
                                                                    </h2>
                                                                    <div id={`flush-collapse${index}`} class="accordion-collapse collapse" aria-labelledby={`flush-heading${index}`} data-bs-parent="#accordionFlushExample2">
                                                                        <div class="accordion-body bg-light bg-gradient">
                                                                            <p><strong>Hotel ID: </strong>{obj['hotelId']}</p>
                                                                            <p><strong>Chain code: </strong>{obj['chainCode']}</p>
                                                                            <p><strong>Geographical coordinates: </strong>{obj['geoCode']['latitude']}, {obj['geoCode']['longitude']}</p>
                                                                            {obj['hotelRatings'] && <>
                                                                                <hr /> <h5 className='mb-4'>Hotel Ratings</h5>
                                                                                <div style={{columns: `2 auto`}}>
                                                                                    {Object.entries(JSON.parse((JSON.stringify(obj['hotelRatings'][0]['sentiments'])))).map(([key, value]) => {
                                                                                    return (
                                                                                        <div>
                                                                                            <strong>{upperFirst(lowerCase(key))}</strong>
                                                                                            <div class="progress w-50">
                                                                                                <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width:`${value}%`}}></div>
                                                                                            </div>
                                                                                            <br/>
                                                                                        </div>
                                                                                    );
                                                                                    })}
                                                                                </div> 
                                                                            </>
                                                                            }                                                                    
                                                                            <a href={`https://maps.google.com/?q=${obj['geoCode']['latitude']},${obj['geoCode']['longitude']}`} className="btn btn-primary mt-3" target="_blank" rel="noreferrer">View on Google Maps</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="/" className="btn btn-danger mt-5 mb-5">Back</a>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }
    }
}
 
export default TripPlan;