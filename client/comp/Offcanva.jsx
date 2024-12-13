import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Offcanva.css";
import { Avatar } from 'primereact/avatar';

import img1 from "../img/1.jpg";

const Offcanva = () => {
  const [showMainOffcanvas, setShowMainOffcanvas] = useState(false);
  const [showSubOffcanvas, setShowSubOffcanvas] = useState(false);
  const [subCategory, setSubCategory] = useState(""); // تحديد التصنيف الفرعي (أنمي أو فن)
  const navigate = useNavigate();

  // التحكم في إظهار وإخفاء النوافذ الجانبية
  const toggleMainOffcanvas = () => setShowMainOffcanvas((prev) => !prev);
  const toggleSubOffcanvas = (category) => {
    setSubCategory(category); // تحديد التصنيف الفرعي
    setShowSubOffcanvas(true);
    setShowMainOffcanvas(false);
  };




  
  const handleCategoryChange = (category) => {
    navigate("/shop", { state: { selectedCategory: category } });
    setShowSubOffcanvas(false);
    window.scrollTo(0, 0);
  };


  return (
    <div>
    {/* زر فتح النافذة الرئيسية */}
    <div className="bloc_button_catg_navbar">
      <button onClick={toggleMainOffcanvas} className="button_catag_navbar">
        <i className="pi pi-align-center pi-align-center1 ">
          <span
            className="titre_button_catalg"
            style={{ marginLeft: "10px", position: "relative", top: "-2px" }}
          >
            Categories
          </span>
        </i>
      </button>
    </div>

    {/* نافذة الفئات الرئيسية */}
   
    <Offcanvas show={showMainOffcanvas} onHide={toggleMainOffcanvas}>
      <Offcanvas.Header>
        <Offcanvas.Title>
          <div className="img_offcanves">
            <img src={img1} alt="Categories" style={{ width: "100%", height: "100%" }} />
          </div>
          <i
              className="pi pi-times"
              onClick={toggleMainOffcanvas}
              style={{
                fontSize: "25px",
                cursor: "pointer",
                color: "white",
                fontWeight: "700",
                position: "absolute",
                right: "25px",
                top: "25px",
              }}
            ></i>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <br />
      <br /> <br />
      <br />
      <Offcanvas.Body>
        <ul>
        
          <li>
              {/* <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i> */}
              <Avatar image="https://i.pinimg.com/736x/75/79/c2/7579c2a9b52b5730b56f1d67e93e8571.jpg" style={{position:"relative",top:"8px"}}  shape="circle" />

              <button
                className="anime-item "
                onClick={() => toggleSubOffcanvas("anime")}
              >
                Anime
              </button>
            </li>
            <li>
            <Avatar image="https://i.pinimg.com/736x/81/cf/e7/81cfe7edc34cd82e29ea06e149755105.jpg" style={{position:"relative",top:"8px"}}  shape="circle" />
            <button
                className="anime-item"
                onClick={() => toggleSubOffcanvas("art")}
              >
                Art
              </button>
            </li>

            <li>
            <Avatar image="https://i.pinimg.com/736x/d2/f6/34/d2f63477bb751b769b2bc650f775fc63.jpg" style={{position:"relative",top:"8px"}}  shape="circle" />
              <button
                className={`anime-item ${subCategory === "Fille" ? "selected" : ""}`}
                onClick={() =>{handleCategoryChange("Fille");   setShowMainOffcanvas(false)} 


                 }
              >
                Fille
              </button>
            </li>

            <li>
            <Avatar image="https://i.pinimg.com/736x/6e/83/78/6e8378ac1d42bea0338c08c28d4342c5.jpg" style={{position:"relative",top:"8px"}}  shape="circle" />
              <button
                className="anime-item "
                onClick={() => toggleSubOffcanvas("Cartoon")}
              >
                Cartoon
              </button>
            </li>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>

    {/* نافذة الفئات الفرعية */}
    <Offcanvas
      show={showSubOffcanvas}
      onHide={() => setShowSubOffcanvas(false)}
      placement="start"
    >
      <Offcanvas.Header>
        <Offcanvas.Title>
        <div className="img_offcanves">
            <img src={img1} alt="Categories" style={{ width: "100%", height: "100%" }} />
          </div>
          <i className="pi pi-arrow-left " style={{ fontSize: '1.5rem',  position:"absolute", color:"white",right:"20px", top:"25px", float:"right", fontWeight:"900" ,                cursor: "pointer",}}   onClick={() => {
              setShowMainOffcanvas(true);
              setShowSubOffcanvas(false);
            }}></i>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
      <br />    <br />
      <br />
      <br />
        {subCategory === "anime" && (
          <ul>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Naruto" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Naruto")}
              >
                Naruto
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "One Piece" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("One Piece")}
              >
                One Piece
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Hunter X Hunter" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Hunter X Hunter")}
              >
                Hunter X Hunter
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Kimetsu" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Kimetsu")}
              >
                Kimetsu
              </button>
            </li>

            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Attack On Titan" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Attack On Titan")}
              >
                Attack On Titan
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Death Note" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Death Note")}
              >
                Death Note
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Jujutsu Kaisen" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Jujutsu Kaisen")}
              >
                Jujutsu Kaisen
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Detective Conan" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Detective Conan")}
              >
                Detective Conan
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Berserk" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Berserk")}
              >
                Berserk
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Vinland Saga" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Vinland Saga")}
              >
                Vinland Saga
              </button>
            </li>
          </ul>
        )}
        {subCategory === "art" && (
          <ul>
        
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Art Numérique" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Art Numérique")}
              >
                Art numérique
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Van Gogh" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Van Gogh")}
              >
                Van Gogh
              </button>
            </li>

            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === " Monalisa" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Monalisa ")}
              >
                Monalisa
              </button>
            </li>
          
          </ul>
        )}

{subCategory === "Cartoon" && (
          <ul>
        
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "SpongeBob" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("SpongeBob")}
              >
                SpongeBob
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Van Gogh" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Van Gogh")}
              >
                Van Gogh
              </button>
            </li>

            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === " Monalisa" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Monalisa ")}
              >
                Monalisa
              </button>
            </li>
          
          </ul>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  </div>
  );
};

export default Offcanva;
