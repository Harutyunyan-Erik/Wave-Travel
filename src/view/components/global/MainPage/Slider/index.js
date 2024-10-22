import { Carousel } from 'antd';
import image2 from '../../../../../core/images/Slider/2.png';
import image3 from '../../../../../core/images/Slider/3.png';
import image4 from '../../../../../core/images/Slider/4.png';
import image5 from '../../../../../core/images/Slider/5.png';
import image6 from '../../../../../core/images/Slider/6.png';
import image7 from '../../../../../core/images/Slider/7.png';
import './index.css';

const Slider = () => {
    return (
        <div>
            <Carousel autoplay className="carousel_container" dots={true}>
                <div>
                    <img src={image2} alt="dubai" />
                </div>                <div>
                    <img src={image3} alt="egypt" />
                </div>                <div>
                    <img src={image4} alt="thailand" />
                </div>                <div>
                    <img src={image5} alt="bali" />
                </div>                <div>
                    <img src={image6} alt="rome" />
                </div>                <div>
                    <img src={image7} alt="prague" />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;
