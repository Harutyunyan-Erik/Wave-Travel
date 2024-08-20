import React from 'react';

const Home = () => {
    return (
        <div className="d-flex flex-column h-100 bg-dark">
            <main className="flex-shrink-0">
                <div className="container col-10 text-center border border-secondary rounded min-vh-100 bg-light" >
                    <div className="row justify-content-center">
                        <div className="col-8 mt-4"> 
                            <hr />    
                                <img src="/amadeus.png" alt="Amadeus" className="card-img-top mb-2 mt-2 w-50" />
                            <hr />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4 mt-5"> 
                            <img src="recommendations.png" alt="Travel Recommendations" style={{width:`60%`}} /><br />
                            <a href="/tripsearch" class="btn btn-success btn-lg w-75 mt-4">Get Trip Recommendations</a>
                        </div>
                        <div className="col-4 mt-5"> 
                            <img src="planning.png" alt="Travel Planning" style={{width:`60%`}} /><br />
                            <a href="/tripplan" class="btn btn-danger btn-lg w-75 mt-4">Plan a Trip</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>   
    );
}
 
export default Home;