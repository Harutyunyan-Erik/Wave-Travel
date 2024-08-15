import React, { useState } from 'react';
import { Segmented } from 'antd';
import SpecialOffers from './SpecialOffers';
import Favorites from './Favorites';
import './index.css';

const Offers = () => {
    const [selected, setSelected] = useState("Special Offers"); 

    const handleChange = (value) => {
        setSelected(value); 
    };

    return (
        <div className="special_main_container">
            <div className="header_section">
                <Segmented
                    className="segmented_control"
                    options={["Special Offers", "Favorites"]}
                    value={selected} 
                    onChange={handleChange} 
                />
            </div>
            {selected === "Favorites" ? <Favorites /> : <SpecialOffers />}
        </div>
    );
}

export default Offers;
