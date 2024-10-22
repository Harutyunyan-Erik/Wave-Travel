import { Carousel } from 'antd';
import image1 from '../../../../../core/images/Slider/1.png';
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
                    <img src={image1} loading="lazy" alt="maldives" />
                </div>   
                <div>
                    <img src={image2} loading="lazy" alt="dubai" />
                </div>                <div>
                    <img src={image3} loading="lazy" alt="egypt" />
                </div>                <div>
                    <img src={image4} loading="lazy" alt="thailand" />
                </div>                <div>
                    <img src={image5} loading="lazy" alt="bali" />
                </div>                <div>
                    <img src={image6} loading="lazy" alt="rome" />
                </div>                <div>
                    <img src={image7} loading="lazy" alt="prague" />
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;
