import { Carousel } from 'antd';
import image1 from '../../../../../core/images/SliderJPG/1.jpg';
import image2 from '../../../../../core/images/SliderJPG/2.jpg';
import image3 from '../../../../../core/images/SliderJPG/3.jpg';
import image4 from '../../../../../core/images/SliderJPG/4.jpg';
import image5 from '../../../../../core/images/SliderJPG/5.jpg';
import image6 from '../../../../../core/images/SliderJPG/6.jpg';
import image7 from '../../../../../core/images/SliderJPG/7.jpg';
import './index.css';

const Slider = () => {
    return (
        <div>
            <Carousel autoplay className="carousel_container" dots={true}>
                <div>
                    <img src={image1} alt="maldives" />
                </div>   
                <div>
                    <img src={image2} alt="dubai" />
                </div>
                <div>
                    <img src={image3} alt="egypt" />
                </div>                
                <div>
                    <img src={image4} alt="thailand" />
                </div>                
                <div>
                    <img src={image5} alt="bali" />
                </div>                
                <div>
                    <img src={image6} alt="rome" />
                </div>                
                <div>
                    <img src={image7} alt="prague" />
                </div>
            </Carousel>
        </div>
    );
};


export default Slider;
