import Carousel from 'react-bootstrap/Carousel';
import "./carousel.css";
import { Link } from "react-router-dom";
import demon from ".././img/imgcarousel/demon.mp4";
 import naruto from ".././img/imgcarousel/naruto.mp4";
 import attack from ".././img/imgcarousel/attack.mp4";
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation


import next from "../img/icon_next.gif";
function Caroussel() {


  const navigate = useNavigate();



  const handleItemClick = (category) => {
    navigate("/shop", { state: { selectedCategory: category } });
  };


  return (
    <div className="carousel_home">
      <Carousel data-bs-theme="dark">
        {/* العنصر الأول */}
       
      <Carousel.Item >
        <video
        src={demon}
        autoPlay
        loop
      muted
        style={{ width: '100%' }}
      >
        Your browser does not support the video tag.
      </video>
    
         <div className="overlay">
      <button className="button_next" onClick={() => handleItemClick("kimetsu")}>
        Demon Slayer <img className="next" src={next} alt="Next" />
      </button>
    </div>
        </Carousel.Item>

        <Carousel.Item >
        <video
        src={naruto}
        autoPlay
        loop
        muted
        style={{ width: '100%' }}
      >
        Your browser does not support the video tag.
      </video>
    
         <div className="overlay">
      <button className="button_next" onClick={() => handleItemClick("naruto")}>
       Naruto <img className="next" src={next} alt="Next"  />
      </button>
    </div>
        </Carousel.Item>

        <Carousel.Item >
        <video
        src={attack}
        autoPlay
        loop
        muted
        style={{ width: '100%' }}
      >
        Your browser does not support the video tag.
      </video>
    
         <div className="overlay">
      <button className="button_next" onClick={() => handleItemClick("attack")}>
       Attack On Titan <img className="next" src={next} alt="Next" />
      </button>
    </div>
        </Carousel.Item>


      </Carousel>
    </div>
  );
}

export default Caroussel;
