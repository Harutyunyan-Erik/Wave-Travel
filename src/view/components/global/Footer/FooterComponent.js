import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import logo from '../../../../core/images/logo2.jpg';
import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';  // Importing icons for social media
import './Footer.css';  // Import the CSS file

const { Footer } = Layout;
const { Text, Title } = Typography;

const FooterComponent = () => {
  return (
    <Footer className="footer">
      <Row justify="center" align="middle">
        {/* Adjusted Logo Size */}
        <Col xs={24} sm={12} md={8} className="footer-logo">
          <img src={logo} alt="Wave Travel Logo" />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Title level={4} className="footer-title">Wave Travel Agency</Title>
          <Text className="footer-text">Your trusted partner for unforgettable travel experiences.</Text>
          <br />
          {/* Clickable phone number */}
          <a href="tel:+37498862862" className="phone-number">Phone: +374-98-862-862</a>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Title level={5} className="footer-connect-title" >Connect with Us</Title>
          <Space size="large" className="footer-icons">
            <a href="https://www.instagram.com/wave.travelagency?igsh=emlwYmRydW1peTE3" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={25} />
            </a>
            <a href="https://t.me/m/EgUhwPETMmM6" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane size={25} />
            </a>
          </Space>
        </Col>
      </Row>
      <Row justify="center" className="footer-bottom-text">
        <Col>
          {/* Footer copyright text */}
          <Text className="footer-copyright">© 2024 Wave Travel Agency. All rights reserved.</Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
