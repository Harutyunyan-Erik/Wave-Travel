import { useState } from 'react';
import { Dropdown, Checkbox, Button, Menu } from 'antd';

const checkboxOptions = [
    { label: "Room Only", value: "RO" },
    { label: "Bed & Breakfast", value: 'BB' },
    { label: "Half Board", value: 'HB' },
    { label: "Full Board", value: 'FB' },
    { label: "All Inclusive", value: 'AI' }
];

const MealTypeDropdown = ({ onMealTypeChange }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const onCheckboxChange = (checkedValues) => {
        setSelectedItems(checkedValues);
        onMealTypeChange(checkedValues); // Pass selected items to parent
    };

    const renderButtonText = () => {
        if (selectedItems.length > 0) {
            return `${selectedItems.join(', ')}`;
        }
        return "Select Meal Type";
    };

    const menu = (
        <Menu>
            <Checkbox.Group
                options={checkboxOptions}
                value={selectedItems}
                onChange={onCheckboxChange}
                style={{ display: 'flex', flexDirection: 'column' }}
            />
        </Menu>
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={['click']}
            visible={dropdownVisible}
            onVisibleChange={(flag) => setDropdownVisible(flag)}
        >
            <Button onClick={() => setDropdownVisible(!dropdownVisible)}>
                {renderButtonText()}
            </Button>
        </Dropdown>
    );
};

export default MealTypeDropdown;
