import { Link } from 'react-router-dom';
import { Layout, Button, Typography, Space } from 'antd';
import './index.css';

const Header = () => {
    return (
        <Layout.Header className="main_header">
           <Typography.Title level={3}>
                Wave Travel
           </Typography.Title>

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