import { useContext } from 'react';
import { Layout, Button, Space } from 'antd';
import UserProfile from '../../shared/UserProfile';
import { AuthContext } from '../../../../context/AuthContext';
import { Link } from 'react-router-dom';
import './index.css';


import  myLogo  from '../../../../core/images/logo2.jpg'

const MainHeader = () => {
    const { isAuth, setIsAuth, userProfileInfo } = useContext(AuthContext);

    return (
        <Layout.Header className="main_header">
            <Link to="/">
              <img src={myLogo} alt="My Logo" className="logo" />
            </Link>
            
           <Space>
           {
                    isAuth ? (
                        <UserProfile setIsAuth={setIsAuth} userProfileInfo={userProfileInfo} />
                    ) : (
                        <Link to="/login">
                            <Button>
                                Login
                            </Button>
                        </Link>
                    )
                }
           </Space>
        </Layout.Header>
        
    )
}

export default MainHeader