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
                                'Description: Located on the crescent of the Palm Island in Dubai, next to Atlantis, The Palm and Aquaventure Waterpark, Atlantis The Royal offers access to Aquaventure, the largest waterpark in the Middle East, 17 restaurants and bars, nightclubs, show fountain, outdoor swimming pools, beach clubs, a state-of-the-art spa, and free private parking. With free WiFi, this 5-star resort has a sky pool and a private beach, a 24-hour front desk, room service and currency exchange for guests. Selected rooms also feature a kitchen with a minibar.',
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
                                'Description: Attractively located in the centre of Dubai, Address Sky View features air-conditioned rooms with free WiFi, free private parking and room service. This 5-star hotel offers an ATM and a concierge service. The property has a seasonal outdoor pool, fitness centre, sauna and free bikes.',
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
