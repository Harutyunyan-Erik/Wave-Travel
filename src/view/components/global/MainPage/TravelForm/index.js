import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Radio, Select, message } from 'antd';
import emailjs from 'emailjs-com'; 
import './index.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Function to disable past dates in RangePicker
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < new Date().setHours(0, 0, 0, 0);
};

const TravelForm = () => {
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = (values) => {
    console.log('Received values from form: ', values);

    // Prepare email parameters
    const emailParams = {
      email: values.email,                 // Corresponds to {{email}} in the template
      phone: values.phoneNumber,           // Corresponds to {{phone}} in the template
      region: values.region,               // Corresponds to {{region}} in the template
      hotel: values.hotel,                 // Corresponds to {{hotel}} in the template
      dates: values.dates ? values.dates.map(date => date.format('YYYY-MM-DD')).join(' to ') : '',
      budget: `$${values.budget}`,         // Corresponds to {{budget}} in the template
      adults: values.adults,               // Corresponds to {{adults}} in the template
      children: values.children,           // Corresponds to {{children}} in the template
      babies: values.babies,               // Corresponds to {{babies}} in the template
      transfer: values.transfer,           // Corresponds to {{transfer}} in the template
      tickets: values.tickets,             // Corresponds to {{tickets}} in the template
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
    })
    .catch((error) => {
      message.error('Failed to send the email. Please try again later.');
      console.error('EmailJS error:', error);
    });
  };

  return (
    <div className="form-container">
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
          <RangePicker 
            style={{ width: '100%', display: "flex", alignItems: "center" }} 
            popupClassName="custom-range-picker"
            disabledDate={disabledDate}  // Apply disabledDate function to disable past dates
            dropdownStyle={{ zIndex: 1000, maxWidth: '100%' }}  // Ensures the dropdown is properly layered and fits the screen  
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
            rules={[{ required: true, message: 'Please select if you need tickets!' }]}
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

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TravelForm;
