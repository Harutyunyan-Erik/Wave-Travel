import { Button, Card, Divider, List, Typography } from 'antd';
import './index.css';

const { Text, Title } = Typography;

const Offers = () => {
    return (
        <div className="special_main_container">
            <h2 className="text_special">Special Offers</h2>
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
                            src="https://www.guardianglass.com/content/guardianindustriesholdings/me-africa/me/en/projects/project-details/address-beach-resort/_jcr_content/root/responsivegrid/project_hero/image.coreimg.jpeg/1721058476765/adrs-bch-rsrt-0448.jpeg"
                        />
                    }
                >
                    <div className="card_content">
                        <Title level={4}>Dubai Jumeirah Beach</Title>
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
        </div>
    )
}

export default Offers;
