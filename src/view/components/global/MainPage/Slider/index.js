import { Carousel } from 'antd';
import './index.css';

const Slider = () => {
    return (
        <div>
            <Carousel autoplay className="carousel_container" >
                <div>
                    <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </div>

                <div>
                    <img src="https://images.unsplash.com/photo-1600520611035-84157ad4084d?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </div>

                <div>
                    <img src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </div>
            </Carousel>
        </div>
    )
};

export default Slider;