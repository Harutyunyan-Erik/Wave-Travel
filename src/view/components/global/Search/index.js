import { useState } from 'react';
import { TreeSelect, DatePicker, Space, Button, InputNumber  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { treeData } from '../../../../core/constants/issue';
import './index.css'

const { RangePicker } = DatePicker;


const dateFormat = ["YYYY/MM/DD", "YYYY/MM/DD"];


const Search = () => {
    const [value, setValue] = useState();

    const onChangePerson = (value) => {
        console.log(value, "person Value");
    }
    
    const onChangeCities = (values) => {
        setValue(values);
    }

    return (
        <div className="search_container">
            <Space direction="vertical" size={12} className="space_container">
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

                <RangePicker format={dateFormat} />

                <InputNumber
                    addonBefore={<UserOutlined />}
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={onChangePerson}
                    style={{
                        width: '70%',
                    }}
                />

                <Button>
                    Search
                </Button>
            </Space>
        </div>
    )
}

export default Search