import Carousel from 'react-bootstrap/Carousel';
import   "./carousel.css";
import { Link } from "react-router-dom";

import img1 from "../img/imgcarousel/img1.jpg";

import img2 from "../img/imgcarousel/img2.jpg";
function Caroussel() {
  return (
    <div  className='carousel_home'>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block "
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <Link to="/shop"  className='button_carousel'> <span className='name_button'>Acheter maintenant</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block "
          src={img2}
          alt="First slide"
        />
        <Carousel.Caption>
          <Link to="/shop"  className='button_carousel'> <span className='name_button'>Acheter maintenant</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
     
     
    </Carousel>
    </div>
  );
}

export default Caroussel;