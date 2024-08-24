import React from 'react';
import { useFormValues } from './HotelSearchProvider'; 
import { useNavigate } from 'react-router-dom';
import SelectedHotel from './SelectedHotel';
import { Typography, Button, Col, Row } from 'antd';

const { Title, Paragraph } = Typography;

const HotelSearch = () => {
    const { formValues } = useFormValues();
    const navigate = useNavigate();
    
    // Use default values if formValues is null or undefined
    const city = formValues?.city || 'Unknown';
    const dates = formValues?.dates;
    const formattedDates = dates
        ? `${dates[0].format('DD/MM/YYYY')} -- ${dates[1].format('DD/MM/YYYY')}`
        : 'N/A';
    const adults = formValues?.adults || 0;
    const children = formValues?.children?.count || 0;
    const infants = formValues?.infants || 0;

    return (
        <div style={{ padding: '20px', maxWidth: '1200px' }}>
            <Row>
                <Col span={24}><Title level={3}>Search Results</Title></Col>
            </Row>
            <Row>
                <Col>
                    <Paragraph><strong>City:</strong> {city.toUpperCase()}</Paragraph>
                    <Paragraph><strong>Dates:</strong> {formattedDates}</Paragraph>
                    <Paragraph><strong>Adults:</strong> {adults}</Paragraph>
                    <Paragraph><strong>Children:</strong> {children}</Paragraph>
                    <Paragraph><strong>Infants:</strong> {infants}</Paragraph>
                    
                    <Title level={3}>Selected Hotel</Title>
                </Col>
            </Row>
            <Row justify="space-around" style={{ width: '600px' }}>
                <Col span={12}><SelectedHotel /></Col>
            </Row>
            <Row justify="end">
                <Button type="primary" onClick={() => navigate('/')}>Back to Search</Button>
            </Row>
        </div>
    );
};

export default HotelSearch;
