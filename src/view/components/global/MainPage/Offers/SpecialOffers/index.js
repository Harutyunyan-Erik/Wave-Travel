import { Button, Card, Divider, List, Typography } from 'antd';

const { Text, Title } = Typography;

const SpecialOffers = () => {
    return (
            <div className="card_grid">
                <Card
                    hoverable
                    className="card_container"
                    cover={
                        <img 
                            alt="example" 
                            src="https://www.ahstatic.com/photos/b801_ho_00_p_1024x768.jpg"
                        />
                    }
                >
                    <div className="card_content">
                        <Title level={4}>Rixos Marina</Title>
                        <Divider style={{ width: "100%" }} />
                        <List
                            dataSource={[
                                'City: Abu Dhabi',
                                'Travel Nights: 7',
                                'Room Type: Classic Sea View',
                                'Meal Plan: All Inclusive',
                                'Price for: 2 Adults',
                                "Price: $2,590"
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
                            src="https://www-addresshotels-com.azureedge.net/wp-content/uploads/2021/03/ADBCH-Exterior-Day-75-1.jpg"
                        />
                    }
                >
                    <div className="card_content">
                        <Title level={4}>Address Dubai Jumeirah Beach</Title>
                        <Divider style={{ width: "100%" }} />
                        <List
                            dataSource={[
                                'City: Dubai',
                                'Travel Nights: 7',
                                'Room Type: Classic Sea View',
                                'Meal Plan: Half Board',
                                'Price for: 2 Adults',
                                "Price: $2,940"
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
                            src="https://www.ahstatic.com/photos/c320_ho_00_p_1024x768.jpg"
                        />
                    }
                >
                    <div className="card_content">
                        <Title level={4}>Rixos Premium Resort</Title>
                        <Divider style={{ width: "100%" }} />
                        <List
                            dataSource={[
                                'City: Alamain',
                                'Travel Nights: 8',
                                'Room Type: Classic Sea View',
                                'Meal Plan: All Inclusive',
                                'Price for: 2 Adults',
                                "Price: $2,600"
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

export default SpecialOffers;
