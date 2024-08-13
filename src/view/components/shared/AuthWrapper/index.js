import React from 'react';
import './index.css';

// Default image path if no airplane image is provided
import defaultAirplaneImg from '../../../../core/images/airplane.jpg';
const AuthWrapper = ({ airplane, children }) => {
    // Use defaultAirplaneImg if airplane is not provided
    const backgroundImage = airplane ? `url(${airplane})` : `url(${defaultAirplaneImg})`;

    return (
        <div className="auth_style_wrapper">
            <div 
                className="cover_img_container"
                style={{ backgroundImage }}
            />
            <div className="form_container">
                {children}
            </div>
        </div>
    );
};

export default AuthWrapper;
