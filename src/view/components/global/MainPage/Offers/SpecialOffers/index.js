import React, { useState } from 'react';
import { Button, Card, Divider, List, Typography, Modal, Form, Input, InputNumber, DatePicker, Radio, Select, message } from 'antd';
import emailjs from 'emailjs-com';  // Import EmailJS SDK

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const SpecialOffers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState({});  // State to store selected hotel data
    const [form] = Form.useForm();

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

    return (
        <div className="card_grid">
            {/* Card 1 */}
            <Card
                hoverable
                className="card_container"
                cover={
                    <img 
                        alt="dubai" 
                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/431155759.jpg?k=bfc9bc42830a41b20dd895f215c8e1c20736ab8e891f0fc4ca2423b81349b7cd&o=&hp=1"
                    />
                }
            >
                <div className="card_content">
                    <Title level={4}>NH COLLECTION DUBAI THE PALM</Title>
                    <Divider style={{ width: "100%" }} />
                    <List
                        dataSource={[
                            'City: Dubai',
                            'Travel Nights: 7',
                            'Room Type: Classic Sea View',
                            'Meal Plan: Half Board',
                            'Price for: 2 Adults',
                            "Price: $1,980"
                        ]}
                        renderItem={item => (
                            <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                <Text strong>{item}</Text>
                            </List.Item>
                        )}
                    />
                    <Button type="primary" onClick={() => showModal({ city: 'Dubai', hotel: 'NH COLLECTION DUBAI THE PALM' })}>
                        More
                    </Button>
                </div>
            </Card>

                        {/* Card 1 */}
                        <Card
                hoverable
                className="card_container"
                cover={
                    <img 
                        alt="alamein" 
                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/587034139.jpg?k=3b05e9897682c4a735d0f4b1ee36e46f34d51c5a87ee72ea75be0805804ef8b7&o=&hp=1"
                    />
                }
            >
                <div className="card_content">
                    <Title level={4}>Rixos Premium Alamein</Title>
                    <Divider style={{ width: "100%" }} />
                    <List
                        dataSource={[
                            'City: Alamein',
                            'Travel Nights: 7',
                            'Room Type: Classic Sea View',
                            'Meal Plan: All Inclusive',
                            'Price for: 2 Adults',
                            "Price: $2,500"
                        ]}
                        renderItem={item => (
                            <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                <Text strong>{item}</Text>
                            </List.Item>
                        )}
                    />
                    <Button type="primary" onClick={() => showModal({ city: 'Alamein', hotel: 'Rixos Premium Alamein' })}>
                        More
                    </Button>
                </div>
            </Card>
                        {/* Card 1 */}
                        <Card
                hoverable
                className="card_container"
                cover={
                    <img 
                        alt="maldives" 
                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/438558536.jpg?k=031047db0126b77b87e803329de83f7b6f797a4c05cb8f4643233d2593e7f1c8&o=&hp=1"
                    />
                }
            >
                <div className="card_content">
                    <Title level={4}>Villa Park Sun Island Resort</Title>
                    <Divider style={{ width: "100%" }} />
                    <List
                        dataSource={[
                            'City: Male, Maldives',
                            'Travel Nights: 7',
                            'Room Type: Sun Villa',
                            'Meal Plan: Full Board',
                            'Price for: 2 Adults',
                            "Price: $4,490"
                        ]}
                        renderItem={item => (
                            <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                <Text strong>{item}</Text>
                            </List.Item>
                        )}
                    />
                    <Button type="primary" onClick={() => showModal({ city: 'Male, Maldives', hotel: 'Villa Park Sun Island Resort' })}>
                        More
                    </Button>
                </div>
            </Card>
                        {/* Card 1 */}
                        <Card
                hoverable
                className="card_container"
                cover={
                    <img 
                        alt="srilanka" 
                        src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/177690675.jpg?k=ac98d25b98219d13d2e749c5fc33bdec3a87e3173685abc60c8c3bb8f3fa101e&o=&hp=1"
                    />
                }
            >
                <div className="card_content">
                    <Title level={4}>Anantara Kalutara Resort</Title>
                    <Divider style={{ width: "100%" }} />
                    <List
                        dataSource={[
                            'City: Kalutara, Sri Lanka',
                            'Travel Nights: 7',
                            'Room Type: Classic Sea View',
                            'Meal Plan: All Inclusive',
                            'Price for: 2 Adults',
                            "Price: $6,900"
                        ]}
                        renderItem={item => (
                            <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                <Text strong>{item}</Text>
                            </List.Item>
                        )}
                    />
                    <Button type="primary" onClick={() => showModal({ city: 'Kalutara, Sri Lanka', hotel: 'Anantara Kalutara Resort' })}>
                        More
                    </Button>
                </div>
            </Card>

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
                        region: selectedHotel.city,  // Pre-filled from the selected card
                        hotel: selectedHotel.hotel,  // Pre-filled from the selected card
                        adults: 1,
                        children: 0,
                        babies: 0,
                        transfer: 'Yes',
                        tickets: "Yes",
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
                        <div className="person-input-container">
                            <Form.Item
                            name="adults"
                            label="Adults (12+)"
                            rules={[{ required: true, message: 'Please input the number of adults!' }]}
                            >
                            <InputNumber min={1} max={10} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                            name="children"
                            label="Children (2-11)"
                            >
                            <InputNumber min={0} max={5} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                            name="babies"
                            label="Babies (0-2)"
                            >
                            <InputNumber min={0} max={5} style={{ width: '100%' }} />
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

            {/* Repeat the card and modal for other offers */}
        </div>
    );
};

export default SpecialOffers;