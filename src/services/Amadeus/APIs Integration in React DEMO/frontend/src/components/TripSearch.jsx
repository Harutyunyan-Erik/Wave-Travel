import React, { useState, useEffect } from 'react';
import useFetch from "../hooks/useFetch";
import Select from 'react-select';
import cityAndAirportCodes from './CityAndAirportCodes';
import countryCodes from './CountryCodes';
import {lowerCase, startCase} from 'lodash';

const TripSearch = () => {
    const [url, setUrl] = useState(null); 
    const [travelData, setTravelData] = useState(null);
    const [city , setCity] = useState('');
    const [source , setSource] = useState('');
    const [destination , setDestination] = useState('');
    
    // Setting API call options
    const options = {
        method: 'GET'
    };
    
    const optionsStr = JSON.stringify(options);
    const { data, responseStatus, error } = useFetch(url, optionsStr);    
    const [alertText , setAlertText] = useState('');
    const [flag , setFlag] = useState(false);

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
        tempObj['value'] = value
        return tempObj;
    });

    let cCodes = [];
    cCodes = Object.entries(JSON.parse((JSON.stringify(countryCodes)))).map(([key, value]) => 
    { 
        let tempObj = {}; 
        tempObj['label'] = key;
        tempObj['value'] = value
        return tempObj;
    });

    const handleSubmit = async (x) => {
        x.preventDefault();
        setFlag(true);
        setAlertText('');

        if (typeof city.value !== 'undefined') {
            const endpointUrl = new URL(`https://ed-4905316290002944.educative.run/tripsearch`);
            
            let queryParameters = new URLSearchParams({
                cityCodes: city.value,
            });

            if (typeof source.value !== 'undefined')
                queryParameters.append('travelerCountryCode', source.value)
            if (typeof destination.value !== 'undefined') 
                queryParameters.append('destinationCountryCodes', destination.value)
        
            endpointUrl.search = queryParameters;
            setUrl(endpointUrl);
        }
        else {
            setTravelData(null);
            setFlag(false);
            setAlertText("Please select city!");
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
                                <div class="bg-dark p-2 text-dark bg-opacity-10"><h4>Get Trip Recommendations</h4></div>
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
                        <p>Fill the form below to get trip recommendations.</p>            
                        <form onSubmit={(x) => {handleSubmit(x)}}>
                            <div className="row g-3 mt-3">
                                <div className="col-md-3">
                                    <strong><label for="city" className="form-label">City<span class='text-danger'> *</span></label></strong>
                                    <Select 
                                        onChange={setCity}
                                        options={caCodes}
                                        placeholder="Select city"
                                        required
                                    />
                                    <span><i>Search cities like</i></span>
                                </div>
                            </div>
                            <div className="row g-3 mt-3">
                                <div className="col-md-3">
                                    <strong><label for="source" className="form-label">Origin</label></strong>
                                    <Select 
                                        onChange={setSource}
                                        options={cCodes}
                                        placeholder="Select a source"
                                    />
                                    <span><i>Departure from</i></span>
                                </div>
                                <div className="col-md-3">
                                    <strong><label for="destination" className="form-label">Destination</label></strong>
                                    <Select 
                                        onChange={setDestination}
                                        options={cCodes}
                                        placeholder="Select a destination"
                                    />
                                    <span><i>Arrival at</i></span>
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
                                    <div class="bg-dark p-2 text-dark bg-opacity-10"><h4>Trip Recommendations</h4></div>                                    
                                </div>
                            </div>

                            <div class="row text-center justify-content-center">
                                {alertText ?
                                    <div class="col-6">
                                        <div class={`alert alert-danger mt-4`} role="alert">
                                            {alertText}
                                        </div>
                                    </div> : <h6>Here are a few places you should consider visiting.</h6>
                                }
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-10">
                                    <div class="accordion accordion-flush border mt-5" id="accordionFlushExample">
                                        {travelData['Data']['data'].map((obj, index) => {
                                            return (
                                                <div class="accordion-item">
                                                    <h2 class="accordion-header" id={`flush-heading${index}`}>
                                                    <button class="accordion-button collapsed bg-dark text-bg-dark bg-gradient" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index}`} aria-expanded="false" aria-controls={`flush-collapse${index}`}>
                                                        <h5 className='mt-1'>{obj['name']}</h5><small><em>&ensp;&ensp;{obj['iataCode']}</em></small>
                                                    </button>
                                                    </h2>
                                                    <div id={`flush-collapse${index}`} class="accordion-collapse collapse" aria-labelledby={`flush-heading${index}`} data-bs-parent="#accordionFlushExample">
                                                        <div class="accordion-body bg-light bg-gradient">
                                                            <div class="row">
                                                                <div class="col-sm-6">
                                                                    <p class="card-text"><strong>Location Type: </strong>{startCase(lowerCase(obj['subtype']))}</p>
                                                                    <p class="card-text"><strong>Geographical Coordinates: </strong>{obj['geoCode']['latitude'].toFixed(4)}, {obj['geoCode']['longitude'].toFixed(4)}</p>
                                                                    <p class="card-text"><strong>Relevance: </strong>{obj['relevance'] >= 0.7 ? <span class='badge bg-success'>High</span> : obj['relevance'] >= 0.4 ? <span class='badge bg-warning'>Moderate</span> : <span class='badge bg-danger'>Low</span>}</p>
                                                                    <a href={`https://maps.google.com/?q=${obj['geoCode']['latitude']},${obj['geoCode']['longitude']}`} className="btn btn-primary mt-3" target="_blank" rel="noreferrer">View on Google Maps</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <a href="/" className="btn btn-danger mt-5">Back</a>
                                </div>
                            </div>
                        </div>
                    </main>        
                </div>
            );
        }
    }
}
 
export default TripSearch;