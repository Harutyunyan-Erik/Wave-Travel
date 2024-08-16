import { Card, Image, List, Typography } from "antd";
import { useFormValues } from '../HotelSearchProvider';
import { hotels } from "../../../../../core/constants/issue";

const { Title, Paragraph } = Typography;

const mealPrice = (value) => {
    switch (value) {
        case "BB": return "$1,200";
        case "HB": return "$1,350";
        case "FB": return "$1,500";
        case "AI": return "$1,800";
        default: return "N/A";
    }
};

const SelectedHotel = () => {
    const { formValues } = useFormValues();
    const selectedHotel = hotels.find(hotel => hotel.value === formValues?.hotel);
    return (
        <div>
            {formValues && (
                <>
                    {selectedHotel ? (
                        <Card
                            style={{width: "500px"}}
                            title={selectedHotel.label}
                            cover={<Image alt={selectedHotel.label} src={selectedHotel.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcX5CNaeDEhVmuarGDGAetjs7nKN_xJdovMA&s"} />} // Adjust `image` field as needed
                        >
                            <Paragraph>{selectedHotel.description}</Paragraph>
                            <Title level={4}>Prices for Selected Meals</Title>
                            <List
                                dataSource={formValues.meals}
                                renderItem={meal => (
                                    <List.Item key={meal}>
                                        <Paragraph>{meal}: {mealPrice(meal)}</Paragraph>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    ) : (
                        <Paragraph>No hotel selected</Paragraph>
                    )}
                </>
            )}
        </div>
    )
}

export default SelectedHotel;