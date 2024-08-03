import { useState } from 'react';
import { TreeSelect, DatePicker, Button, InputNumber, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { treeData } from '../../../../core/constants/issue';
import './index.css'

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const Search = () => {
    const [value, setValue] = useState();

    const onChangePerson = (value) => {
        console.log(value, "person Value");
    }
    
    const onChangeCities = (values) => {
        setValue(values);
    }

    const onFinish = (values) => {
        console.log('Form values:', values);
      };

    return (
        <div className="search_container">
                           
                <Form layout="vertical" className="space_container" onFinish={onFinish}>
                    <Form.Item
                         label="Select City"
                         name="city"
                         style={{
                           width: '70%',
                         }}
                    >
                        <TreeSelect 
                            showSearch
                            style={{
                                width: '100%',
                            }}
                            value={value}
                            dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                            }}
                            treeData={treeData}
                            placeholder="Please select City"
                            treeDefaultExpandAll
                            onChange={onChangeCities}
                        />
                    </Form.Item>

                    <Form.Item
                         label="Check-in & Check-out"
                         name="people"
                         style={{
                           width: '70%',
                         }}
                    >
                        <RangePicker format={dateFormat} />
                    </Form.Item>

                    <Form.Item
                        label="Number of People"
                        name="people"
                        style={{
                          width: '70%',
                        }}
                    >
                        <InputNumber
                            addonBefore={<UserOutlined />}
                            min={1}
                            max={5}
                            defaultValue={2}
                            onChange={onChangePerson}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Search
                    </Button>
                </Form>
        </div>
    )
}

export default Search