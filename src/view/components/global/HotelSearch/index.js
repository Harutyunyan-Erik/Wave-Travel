import React from 'react';
import { useFormValues } from './HotelSearchProvider'; 
import { useNavigate } from 'react-router-dom';
import SelectedHotel from './SelectedHotel';
import { Typography, Button, Col, Row } from 'antd';

const { Title, Paragraph } = Typography;

const HotelSearch = () => {
    const { formValues } = useFormValues();
    const navigate = useNavigate();
    
    
    return (
        <div style={{ padding: '20px', "max-width": "1200px" }}>
            <Row>
                <Col span={24}><Title level={3}>Search Results</Title></Col>
            </Row>
            <Row>
                <Col>
                <Paragraph><strong>City:</strong> {formValues.city.toUpperCase()}</Paragraph>
                    <Paragraph><strong>Dates:</strong> {formValues.dates ? `${formValues.dates[0].format('DD/MM/YYYY')} -- ${formValues.dates[1].format('DD/MM/YYYY')}` : 'N/A'}</Paragraph>
                    <Paragraph><strong>Adults:</strong> {formValues.adults}</Paragraph>
                    <Paragraph><strong>Children:</strong> {formValues.children.count}</Paragraph>
                    <Paragraph><strong>Infants:</strong> {formValues.infants || 0}</Paragraph>
                    
                    <Title level={3}>Selected Hotel</Title>
                </Col>
            </Row>
            <Row justify="space-around" style={{width: "600px"}}>
                <Col span={12} ><SelectedHotel /></Col>
            </Row>
            <Row justify="end">
                <Button type="primary" onClick={() => navigate('/')}>Back to Search</Button>
            </Row>
        </div>
    );
};

export default HotelSearch;
