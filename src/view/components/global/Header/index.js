import { Layout, Button, Space } from 'antd';
import  myLogo  from '../../../../core/images/logo2.jpg'
import './index.css';

const Header = () => {
    return (
        <Layout.Header className="main_header">
            <img src={myLogo} alt="My Logo" className="logo" />
            
           <Space>
                About
                Contact
                <Button>
                    Login
                </Button>
           </Space>
        </Layout.Header>
        
    )
}

export default Header