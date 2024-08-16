import { useState, useEffect } from 'react';
import { TreeSelect, DatePicker, Button, InputNumber, Form, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MealTypeDropdown from './MealTypeDropdown';
import { useFormValues } from '../../HotelSearch/HotelSearchProvider'; 
import { treeData, hotels, staticChildrenCount, childrenAge } from '../../../../../core/constants/issue';
import './index.css';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const Search = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [availableHotels, setAvailableHotels] = useState([]);
    const [childrenCountValue, setChildrenCount] = useState(0);
    const [adultsCount, setAdultsCount] = useState(2);
    const [ages, setAges] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);

    const { setFormValues } = useFormValues();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCity) {
            const filteredHotels = hotels.filter(hotel => hotel.parent === selectedCity);
            setAvailableHotels(filteredHotels);
        } else {
            setAvailableHotels([]);
        }
    }, [selectedCity]);

    useEffect(() => {
        setAges(Array.from({ length: childrenCountValue }, (_, i) => i));
    }, [childrenCountValue]);

    const onChangeCities = (value) => {
        setSelectedCity(value);
    };

    const onChangeChildren = (value) => {
        setChildrenCount(value);
    };

    const onChangeAge = (index, value) => {
        setAges(prevAges => {
            const updatedAges = [...prevAges];
            updatedAges[index] = value;
            return updatedAges;
        });
    };

    const onFinish = (values) => {
        const childrenAges = ages.reduce((acc, _, index) => {
            if (values[`age_${index}`]) {
                acc[`age_${index}`] = values[`age_${index}`];
            }
            return acc;
        }, {});
    
        const formValues = {
            city: values.city,
            hotel: values.hotel,
            dates: values.dates,
            adults: adultsCount,
            children: {
                count: values.children,
                ...childrenAges,
            },
            meals: selectedMeals
        };
        console.log('Form values:', formValues);

        setFormValues(formValues);

        navigate('/hotel-search');
    };

    return (
        <div className="search_container">
            <Form
                layout="vertical"
                className="space_container"
                onFinish={onFinish}
                initialValues={{
                    adults: 2,
                    children: 0,
                    infants: 0,
                }}
            >
                <Form.Item
                    label="Select City"
                    name="city"
                    style={{ width: '70%' }}
                >
                    <TreeSelect 
                        showSearch
                        style={{ width: '80%' }}
                        value={selectedCity}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="Please select City"
                        treeDefaultExpandAll
                        onChange={onChangeCities}
                    />
                </Form.Item>

                <Form.Item
                    label="Select Hotel"
                    name="hotel"
                    style={{ width: '70%' }}
                >
                    <Select
                        showSearch
                        placeholder="Select a hotel"
                        optionFilterProp="children"
                        style={{ width: '80%' }}
                    >
                        {availableHotels.map(hotel => (
                            <Select.Option key={hotel.value} value={hotel.value}>
                                {hotel.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Meal Type"
                    name="mealType"
                    style={{ width: '70%' }}
                >
                    <MealTypeDropdown onMealTypeChange={setSelectedMeals} />
                </Form.Item>

                <Form.Item
                    label="Check-in & Check-out"
                    name="dates"
                >
                    <RangePicker format={dateFormat} />
                </Form.Item>

                <Form.Item
                    label="Number of Adults"
                    name="adults"
                    style={{ width: '70%' }}
                >
                    <InputNumber
                        addonBefore={<UserOutlined />}
                        min={1}
                        max={5}
                        onChange={(value) => setAdultsCount(value)}
                        style={{ width: '80%' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Children"
                    name="children"
                    style={{ width: '70%' }}
                >
                    <Select
                        showSearch
                        placeholder="Select number of children"
                        optionFilterProp="children"
                        onChange={onChangeChildren}
                        style={{ width: '80%' }}
                    >
                        {staticChildrenCount.map(count => (
                            <Select.Option key={count.value} value={count.value}>
                                {count.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                {ages.map((_, index) => (
                    <Form.Item
                        key={index}
                        label={`Age of Child`}
                        name={`age_${index}`}
                        style={{ width: '70%' }}
                    >
                        <Select
                            showSearch
                            placeholder="Select Age"
                            optionFilterProp="children"
                            onChange={(value) => onChangeAge(index, value)}
                            style={{ width: '80%' }}
                        >
                            {childrenAge.map(age => (
                                <Select.Option key={age.value} value={age.value}>
                                    {age.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                ))}
               
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: 100 }}
                >
                    Search
                </Button>
            </Form>
        </div>
    );
};

export default Search;
