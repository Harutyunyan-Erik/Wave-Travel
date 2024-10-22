// import { useContext } from 'react';
import { Layout,  Space } from 'antd';
import { Link } from 'react-router-dom';
import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';  // Import icons from react-icons
// import { AuthContext } from '../../../../context/AuthContext';
import myLogo from '../../../../core/images/logo2.jpg';
import './index.css';

const MainHeader = () => {
    // const { isAuth, setIsAuth, userProfileInfo } = useContext(AuthContext);

    return (
        <Layout.Header className="main_header">
            <Link to="/">
                <img src={myLogo} alt="My Logo" className="logo" />
            </Link>
            
            <Space>
                {/* Social Media Icons with Links */}
                <a href="https://t.me/m/EgUhwPETMmM6" target="_blank" rel="noopener noreferrer">
                    <FaTelegramPlane size={30} style={{ color: 'white', marginRight: '20px', marginTop: "20px" }} />
                </a>
                
                <a href="https://www.instagram.com/wave.travelagency?igsh=emlwYmRydW1peTE3" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={30} style={{ color: 'white', marginRight: '20px', marginTop: "20px" }} />
                </a>
            </Space>
        </Layout.Header>
    );
};

export default MainHeader;
