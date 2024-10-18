import { Carousel } from 'antd';
import './index.css';

const Slider = () => {
    return (
        <div>
            <Carousel autoplay className="carousel_container" dots={true}>
                <div>
                    <img src="https://media.istockphoto.com/id/1331100622/photo/view-of-buildings-streets-beautiful-in-various-angles-in-dubai.jpg?s=612x612&w=0&k=20&c=M5GXmSOPo8VljM06CIJqKRgAlEPZkqwmNP-_rtzScec=" alt="example" />
                </div>

                <div>
                    <img src="https://cdn.britannica.com/74/194374-131-40F15D56/pyramid-sunset-egypt.jpg" alt="example" />
                </div>

                <div>
                    <img src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="example" />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;
