import React, { useState, useEffect } from 'react';
import { Popover, Button, InputNumber, DatePicker, Input } from 'antd';
import './index.css';

const { RangePicker } = DatePicker;

const SearchPage = () => {
  const [rooms, setRooms] = useState([{ adults: 2, children: [] }]);
  const [dates, setDates] = useState(null); // State to store check-in & check-out dates
  const [searchInput, setSearchInput] = useState(''); // State for search input
  const [location, setLocation] = useState({ country: '', city: '' }); // New state to store location data

  const handleAdultsChange = (index, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].adults = value;
    setRooms(updatedRooms);
  };

  const handleAddChild = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].children.push(0); // Default child age is 0
    setRooms(updatedRooms);
  };

  const handleChildAgeChange = (roomIndex, childIndex, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].children[childIndex] = value;
    setRooms(updatedRooms);
  };

  const handleAddRoom = () => {
    setRooms([...rooms, { adults: 2, children: [] }]);
  };

  const handleRemoveRoom = (index) => {
    const updatedRooms = rooms.filter((_, roomIndex) => roomIndex !== index);
    setRooms(updatedRooms);
  };

  const popoverContent = (roomIndex) => (
    <div className="guest_popover_content">
      <div className="guest_item">
        <span>Adults</span>
        <InputNumber
          min={1}
          max={5}
          value={rooms[roomIndex].adults}
          onChange={(value) => handleAdultsChange(roomIndex, value)}
        />
      </div>

      {rooms[roomIndex].children.map((childAge, childIndex) => (
        <div className="guest_item" key={childIndex}>
          <span>Child {childIndex + 1} Age</span>
          <InputNumber
            min={0}
            max={16}
            value={childAge}
            onChange={(value) => handleChildAgeChange(roomIndex, childIndex, value)}
          />
        </div>
      ))}

      <Button type="link" onClick={() => handleAddChild(roomIndex)}>
        + Add Child
      </Button>

      {roomIndex > 0 && (
        <Button type="link" danger onClick={() => handleRemoveRoom(roomIndex)}>
          Remove Room
        </Button>
      )}
    </div>
  );

  // Function to get location data
  const getLocation = () => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        console.log(`Country: ${data.country_name}`);
        console.log(`City: ${data.city}`);

        // Set location state with fetched data
        setLocation({ country: data.country_name, city: data.city });

        // Set default search input to "Country, City"
        setSearchInput(`${data.country_name}, ${data.city}`);
      })
      .catch(error => console.error('Error fetching location:', error));
  };

  // Use useEffect to call getLocation when the component mounts
  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleHotelSearch = (value) => {
    setSearchInput(value);
  };

  return (
    <div className="search_page_container">
      <div className="background_image">
        <div className="content_container">
          <h1>Find Hotels</h1>

          <Input
            size="large"
            placeholder="Search Regions and Hotels"
            value={searchInput} // Set the input value to the searchInput state
            onChange={(e) => handleHotelSearch(e.target.value)}
            className="input_full_width"
          />

          <div className="form_row">
            <RangePicker
              className="date_picker"
              onChange={(dates) => setDates(dates)}
              placeholder={['Check-in', 'Check-out']}
            />

            {rooms.map((room, index) => (
              <Popover
                key={index}
                content={popoverContent(index)}
                title={`Room ${index + 1}`}
                trigger="click"
              >
                <Button className="room_button">
                  Room {index + 1}: {room.adults} adults, {room.children.length} children
                </Button>
              </Popover>
            ))}
          </div>

          <Button type="dashed" onClick={handleAddRoom} style={{ marginBottom: 20 }}>
            + Add a room
          </Button>

          <Button type="primary" className="search_button">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
