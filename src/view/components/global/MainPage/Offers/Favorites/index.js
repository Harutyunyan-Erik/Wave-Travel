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
            email: values.email,                 // Corresponds to {{email}} in the template
            phone: values.phoneNumber,           // Corresponds to {{phone}} in the template
            region: values.region,               // Corresponds to {{region}} in the template
            hotel: values.hotel,                 // Corresponds to {{hotel}} in the template
            dates: values.dates ? values.dates.map(date => date.format('YYYY-MM-DD')).join(' to ') : '',
            budget: `$${values.budget}`,          // Corresponds to {{budget}} in the template
            adults: values.adults,               // Corresponds to {{adults}} in the template
            children: values.children,           // Corresponds to {{children}} in the template
            babies: values.babies,               // Corresponds to {{babies}} in the template
            transfer: values.transfer,           // Corresponds to {{transfer}} in the template
            tickets: values.tickets,
            mealType: values.mealType,           // Corresponds to {{mealType}} in the template
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

    // Function to disable past dates
    const disabledDate = (current) => {
        return current && current < new Date().setHours(0, 0, 0, 0);
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
                title={`Send Request for ${selectedHotel.title}`}  // Display the hotel name in the modal title
                open={isModalOpen} 
                onOk={handleOk}  
                onCancel={handleCancel}
                okText="OK"  
                cancelText="Cancel"  
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        adults: 1,
                        children: 0,
                        babies: 0,
                        transfer: "",
                        tickets: "",
                        mealType: 'BB',
                        region: selectedHotel.location,  // Pre-fill Region/City with selected hotel's location
                        hotel: selectedHotel.title,      // Pre-fill Hotel Name with selected hotel's title
                    }}
                >
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
                        rules={[{ required: true, message: 'Please input the region or city!' }]}
                    >
                        <Input placeholder="Enter region or city" />
                    </Form.Item>

                    {/* Hotel Name */}
                    <Form.Item
                        name="hotel"
                        label="Hotel Name"
                        rules={[{ required: true, message: 'Please input the hotel name!' }]}
                    >
                        <Input placeholder="Enter hotel name" />
                    </Form.Item>

                    {/* Check-in and Check-out Dates */}
                    <Form.Item
                        name="dates"
                        label="Check-in and Check-out Dates"
                        rules={[{ required: true, message: 'Please select your check-in and check-out dates!' }]}
                    >
                        <RangePicker 
                            style={{ width: '100%', display: "flex", alignItems: "center" }} 
                            popupClassName="custom-range-picker"
                            disabledDate={disabledDate}  // Disable past dates
                            dropdownStyle={{ zIndex: 1000, maxWidth: '100%' }}  
                        />
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
                            style={{ width: '100%', display: "flex", alignItems: "center" }}
                        />
                    </Form.Item>

                    {/* Number of Persons */}
                    <Form.Item label="Number of Persons">
                        <div className="person-input-container">
                            <Form.Item
                                name="adults"
                                label="Adults (12+)"
                                rules={[{ required: true, message: 'Please input the number of adults!' }]}
                            >
                                <InputNumber min={1} max={10} style={{ width: '100%', display: "flex", alignItems: "center" }} />
                            </Form.Item>

                            <Form.Item
                                name="children"
                                label="Children (2-11)"
                            >
                                <InputNumber min={0} max={5} style={{ width: '100%', display: "flex", alignItems: "center" }} />
                            </Form.Item>

                            <Form.Item
                                name="babies"
                                label="Babies (0-2)"
                            >
                                <InputNumber min={0} max={5} style={{ width: '100%', display: "flex", alignItems: "center" }} />
                            </Form.Item>
                        </div>
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

                    {/* Tickets */}
                    <Form.Item
                        name="tickets"
                        label="Tickets"
                        rules={[{ required: true, message: 'Please select if you need a Tickets!' }]}
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
