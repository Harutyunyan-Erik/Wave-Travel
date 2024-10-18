import { Button, Card, Divider, List, Typography } from 'antd';

const { Text, Title } = Typography;

const Favorites = () => {
    return (
            <div className="card_grid">

                <Card
                    hoverable
                    className="card_container"
                    cover={
                        <img 
                            alt="example" 
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/407265190.jpg?k=a42550a313b9a2e5f570ec93871273f2d0bf4fd9da872f47ac4ec789467bdb86&o=&hp=1"
                        />
                    }
                >
                    <div className="card_content">
                        <Title level={4}>Khalidiya Palace Rayhaan by Rotana</Title>
                        <Divider style={{ width: "100%" }} />
                        <List
                            dataSource={[
                                'Location: Abu Dhabi',
                                'BeachFront: Yes',
                                'Description: Cast away in the turquoise waters of the Arabian Gulf Sea and conveniently located near the breath-taking Presidential Palace, Khalidiya Palace Rayhaan by Rotana is the first property to open in Abu Dhabi under Rayhaan Hotels & Resorts by Rotana brand.',
                                "Price: Starting from $99 per night for 2 adults"
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                    <Text strong>{item}</Text>
                                </List.Item>
                            )}
                        />
                        <Button type="primary">More</Button>
                    </div>
                </Card>

                <Card
                    hoverable
                    className="card_container"
                    cover={
                        <img 
                            alt="example" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4gDqEyweVS1J5aqsU1zBu1zbmyvHjgBotw&s"
                        />
                    }
                >
                    <div className="card_content">
                        <Title level={4}>Jumeirah Saadiyat Island</Title>
                        <Divider style={{ width: "100%" }} />
                        <List
                            dataSource={[
                                'Location: Abu Dhabi',
                                'BeachFront: Yes',
                                'Description: Set in the Saadiyat Island district of Abu Dhabi, Jumeirah at Saadiyat Island Resort offers a fitness centre. Boasting a 24-hour front desk, this property also provides guests with a restaurant. The property is 5 km from Louvre Abu Dhabi and 5 km from Boutik Mall.',
                                "Price: Starting from $150 per night for 2 adults"
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                    <Text strong>{item}</Text>
                                </List.Item>
                            )}
                        />
                        <Button type="primary">More</Button>
                    </div>
                </Card>

                <Card
                    hoverable
                    className="card_container"
                    cover={
                        <img 
                            alt="example" 
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/534061997.jpg?k=9b47f6c7e61f2be60830d61c1f5d9562dd51a6f9288240653cc4e0515a3e4941&o=&hp=1"
                        />
                    }
                >
                    <div className="card_content">
                        <Title level={4}>Atlantis The Royal</Title>
                        <Divider style={{ width: "100%" }} />
                        <List
                            dataSource={[
                                'Location: Dubai, The Palm Jumeirah',
                                'BeachFront: Yes',
                                'Description: Located on Palm Island in Dubai, Atlantis The Royal offers access to Aquaventure Waterpark, 17 restaurants, beach clubs, pools, a spa, and free parking. The 5-star resort includes free WiFi, a sky pool, private beach, 24-hour front desk, and select rooms with kitchens and minibars.',
                                "Price: Starting from $150 per night for 2 adults"
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                    <Text strong>{item}</Text>
                                </List.Item>
                            )}
                        />
                        <Button type="primary">More</Button>
                    </div>
                </Card>

                <Card
                    hoverable
                    className="card_container"
                    cover={
                        <img 
                            alt="example" 
                            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/257803292.jpg?k=78e57c0acabe8fdac0557960f051e755880276c4934436d58f1e8d26464c8ddc&o=&hp=1"
                        />
                    }
                >
                    <div className="card_content">
                        <Title level={4}>Address Sky View</Title>
                        <Divider style={{ width: "100%" }} />
                        <List
                            dataSource={[
                                'Location: Dubai',
                                'BeachFront: No',
                                'Description: Located in central Dubai, Address Sky View offers modern, air-conditioned rooms with free WiFi, private parking, and 24-hour room service. Guests can enjoy a seasonal outdoor pool, a fully equipped fitness center, a relaxing sauna, and complimentary bike rentals to explore the city.',
                                "Price: Starting from $150 per night for 2 adults"
                            ]}
                            renderItem={item => (
                                <List.Item style={{ padding: '4px 0', margin: 0 }}>
                                    <Text strong>{item}</Text>
                                </List.Item>
                            )}
                        />
                        <Button type="primary">More</Button>
                    </div>
                </Card>

            </div>
    )
}

export default Favorites;
