import React, { createContext, useContext, useState } from 'react';

const FormValuesContext = createContext();

const HotelSearchProvider = ({ children }) => {
    const [formValues, setFormValues] = useState(null);

    return (
        <FormValuesContext.Provider value={{ formValues, setFormValues }}>
            {children}
        </FormValuesContext.Provider>
    );
};

const useFormValues = () => useContext(FormValuesContext);

export { HotelSearchProvider, useFormValues };
