import { useState, useEffect } from "react";

const useFetch = (url, optionsStr) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [responseStatus, setStatus] = useState(0);

    useEffect(() => {

        let success = true;

        const fetchData = async () => {
            
            try {
                const options = JSON.parse(optionsStr);
                const response = await fetch(url, options);

                setStatus(response.status);
                
                if (!response.ok) {
                    throw new Error(
                      `${response.status} ${response.statusText}`
                    );
                }

                const content = await response.json();
                
                if(success) {
                    setData(content);
                    setError(null);
                }   
            }
            catch(err) {
                setError(err.message);
            }
          };
      
        if (url) {
            fetchData();
        }
       
        return () => {
            success = false;
            console.log('unmount');
        };
    
      }, [url, optionsStr]);

    return {data, responseStatus, error};
    
};

export default useFetch;