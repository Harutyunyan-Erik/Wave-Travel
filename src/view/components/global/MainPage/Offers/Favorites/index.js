import React, { useState } from 'react';
import { Button, Card, Divider, List, Typography, Modal, Form, Input, InputNumber, DatePicker, Radio, Select, message } from 'antd';
import emailjs from 'emailjs-com';  // Import EmailJS SDK

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Favorites = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState({});  // State to store selected hotel data
    const [form] = Form.useForm();

    const hotels = [
        {
            title: 'Khalidiya Palace Rayhaan by Rotana',
            location: 'Abu Dhabi',
            description: 'Cast away in the turquoise waters of the Arabian Gulf Sea and conveniently located near the breath-taking Presidential Palace...',
            beachfront: 'Yes',
            price: 99,
            img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/407265190.jpg?k=a42550a313b9a2e5f570ec93871273f2d0bf4fd9da872f47ac4ec789467bdb86&o=&hp=1'
        },
        {
            title: 'Jumeirah Saadiyat Island',
            location: 'Abu Dhabi',
            description: 'Set in the Saadiyat Island district of Abu Dhabi, Jumeirah at Saadiyat Island Resort offers a fitness centre...',
            beachfront: 'Yes',
            price: 150,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4gDqEyweVS1J5aqsU1zBu1zbmyvHjgBotw&s'
        },
        {
            title: 'Atlantis The Royal',
            location: 'Dubai, The Palm Jumeirah',
            description: 'Located on Palm Island in Dubai, Atlantis The Royal offers access to Aquaventure Waterpark, 17 restaurants...',
            beachfront: 'Yes',
            price: 150,
            img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/534061997.jpg?k=9b47f6c7e61f2be60830d61c1f5d9562dd51a6f9288240653cc4e0515a3e4941&o=&hp=1'
        },
        {
            title: 'Address Sky View',
            location: 'Dubai',
            description: 'Located in central Dubai, Address Sky View offers modern, air-conditioned rooms with free WiFi, private parking...',
            beachfront: 'No',
            price: 150,
            img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/257803292.jpg?k=78e57c0acabe8fdac0557960f051e755880276c4934436d58f1e8d26464c8ddc&o=&hp=1'
        }
    ];

    const showModal = (hotelData) => {
        setSelectedHotel(hotelData);  // Store hotel data in the state
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();  // Trigger form submission manually
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // Handle form submission
    const onFinish = (values) => {
        const emailParams = {
            email: values.email,
            phone: values.phoneNumber,
            region: selectedHotel.location,  // Take the region from the selected card
            hotel: selectedHotel.title,  // Take the hotel name from the selected card
            dates: values.dates ? values.dates.map(date => date.format('YYYY-MM-DD')).join(' to ') : '',
            budget: `$${values.budget}`,
            adults: values.adults,
            children: values.children,
            babies: values.babies,
            transfer: values.transfer,
            mealType: values.mealType,
        };

        // Send email using EmailJS
        emailjs.send(
            'service_9fvj11g', // Replace with your EmailJS service ID
            'template_fap3hbl', // Replace with your EmailJS template ID
            emailParams,
            'pR1fDCCAAF0bsRn8O' // Replace with your EmailJS user ID
          )
        .then(() => {
            message.success('Your travel request has been submitted and emailed!');
            setIsModalOpen(false);
        })
        .catch((error) => {
            message.error('Failed to send the email. Please try again later.');
            console.error('EmailJS error:', error);
        });
    };

    return (
        <div className="card_grid">
            {/* Render each card from the hotels array */}
            {hotels.map(hotel => (
                <Card
                    hoverable
                    className="card_container"
                    key={hotel.title}
                    cover={<img alt="hotel" src={hotel.img} />}
                >
                    <div className="card_content">
                        <Title level={4}>{hotel.title}</Title>
                        <Divider style={{ width: "100%" }} />
                        <List
                            dataSource={[
                                `Location: ${hotel.location}`,
                                `BeachFront: ${hotel.beachfront}`,
                                `Description: ${hotel.description}`,
                                `Price: Starting from $${hotel.price} per night for 2 adults`
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                    <Text strong>{item}</Text>
                                </List.Item>
                            )}
                        />
                        <Button type="primary" onClick={() => showModal(hotel)}>
                            More
                        </Button>
                    </div>
                </Card>
            ))}

            {/* Modal for sending a request */}
            <Modal 
                title="Send Request" 
                open={isModalOpen} 
                onOk={handleOk}  // When OK is clicked, submit the form
                onCancel={handleCancel}
                okText="OK"  // Label for the submit button
                cancelText="Cancel"  // Label for the cancel button
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        email: '',
                        phoneNumber: '',
                        region: selectedHotel.location,  // Pre-filled from the selected card
                        hotel: selectedHotel.title,  // Pre-filled from the selected card
                        adults: 1,
                        children: 0,
                        babies: 0,
                        transfer: 'No',
                        mealType: 'BB',
                    }}
                >
                    <h2>Send Request</h2>

                    {/* Email */}
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input the email!' }]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    {/* Phone Number */}
                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input the phone number!' }]}
                    >
                        <Input placeholder="Enter phone number" />
                    </Form.Item>

                    {/* Region/City */}
                    <Form.Item
                        name="region"
                        label="Region/City"
                        initialValue={selectedHotel.location}  // Pre-fill with the selected hotel's location
                    >
                        <Input placeholder="Enter region or city" />
                    </Form.Item>

                    {/* Hotel Name */}
                    <Form.Item
                        name="hotel"
                        label="Hotel Name"
                        initialValue={selectedHotel.title}  // Pre-fill with the selected hotel's title
                    >
                        <Input placeholder="Enter hotel name" />
                    </Form.Item>

                    {/* Check-in and Check-out Dates */}
                    <Form.Item
                        name="dates"
                        label="Check-in and Check-out Dates"
                        rules={[{ required: true, message: 'Please select your check-in and check-out dates!' }]}
                    >
                        <RangePicker style={{ width: '100%' }} />
                    </Form.Item>

                    {/* Budget */}
                    <Form.Item
                        name="budget"
                        label="Budget"
                        rules={[{ required: true, message: 'Please input your budget!' }]}
                    >
                        <InputNumber
                            min={0}
                            max={100000}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            placeholder="Enter your budget"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    {/* Number of Persons */}
                    <Form.Item label="Number of Persons">
                        <Form.Item
                            name="adults"
                            label="Adults (12+)"
                            rules={[{ required: true, message: 'Please input the number of adults!' }]}
                            style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
                        >
                            <InputNumber min={1} max={10} style={{ width: '80%' }}/>
                        </Form.Item>
                        <Form.Item
                            name="children"
                            label="Children (2-11)"
                            style={{ display: 'inline-block', width: 'calc(33% - 8px)', margin: '0 8px' }}
                        >
                            <InputNumber min={0} max={10} style={{ width: '80%' }}/>
                        </Form.Item>
                        <Form.Item
                            name="babies"
                            label="Babies (0-2)"
                            style={{ display: 'inline-block', width: 'calc(33% - 8px)' }}
                        >
                            <InputNumber min={0} max={5} style={{ width: '80%' }}/>
                        </Form.Item>
                    </Form.Item>

                    {/* Transfer */}
                    <Form.Item
                        name="transfer"
                        label="Transfer"
                        rules={[{ required: true, message: 'Please select if you need a transfer!' }]}
                    >
                        <Radio.Group>
                            <Radio value="Yes">Yes</Radio>
                            <Radio value="No">No</Radio>
                        </Radio.Group>
                    </Form.Item>
                    

                    {/* Meal Types */}
                    <Form.Item
                        name="mealType"
                        label="Meal Type"
                        rules={[{ required: true, message: 'Please select a meal type!' }]}
                    >
                        <Select>
                            <Option value="BB">BB (Bed & Breakfast)</Option>
                            <Option value="HB">HB (Half Board)</Option>
                            <Option value="FB">FB (Full Board)</Option>
                            <Option value="AI">AI (All Inclusive)</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Favorites;
