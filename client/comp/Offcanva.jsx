import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Offcanva.css";
import hxh from "../api/anime/hxh.json";
import naruto from "../api/anime/naruto.json";
import onepiece from "../api/anime/onepiece.json";
import kimetsu from "../api/anime/kimetsu.json";
import death_note from "../api/anime/death_note.json";
import attackontitan from "../api/anime/attackontitan.json";
import berserk from "../api/anime/berserk.json";
import bokonohero from "../api/anime/bokonohero.json";
import bleach from "../api/anime/bleach.json";
import conan from "../api/anime/conan.json";
import dragonboll from "../api/anime/dragonboll.json";
import ippo from "../api/anime/ippo.json";
import jujutsu from "../api/anime/jujutsu.json";
import OnePunchMan from "../api/anime/OnePunchMan.json";
import sololeveling from "../api/anime/sololeveling.json";
import vinlandsaga from "../api/anime/vinlandsaga.json";
import img1 from "../img/1.jpg";

const Offcanva = ({ currentPage, setSelectedCategory }) => {
  const [showMainOffcanvas, setShowMainOffcanvas] = useState(false);
  const [showAnimeOffcanvas, setShowAnimeOffcanvas] = useState(false);
  const [stickers, setStickers] = useState([]);
  const [selectedCategory, setSelectedCategoryState] = useState("naruto"); // حالة لتخزين الفئة المحددة
  const navigate = useNavigate();

  // التحكم في إظهار وإخفاء النوافذ الجانبية
  const toggleMainOffcanvas = () => setShowMainOffcanvas((prev) => !prev);
  const toggleAnimeOffcanvas = () => {
    setShowAnimeOffcanvas((prev) => !prev);
    setShowMainOffcanvas(false);
  };

  useEffect(() => {
    // تحميل البيانات بناءً على الفئة
    const fetchStickers = (category) => {
      switch (category) {
        case "naruto":
          return naruto;
        case "hxh":
          return hxh;
        case "onepiece":
          return onepiece;
        case "kimetsu":
          return kimetsu;
        case "death_note":
          return death_note;
        case "attackontitan":
          return attackontitan;
        case "berserk":
          return berserk;
        case "bokonohero":
          return bokonohero;
        case "bleach":
          return bleach;
        case "conan":
          return conan;
        case "dragonboll":
          return dragonboll;
        case "ippo":
          return ippo;
        case "jujutsu":
          return jujutsu;
        case "OnePunchMan":
          return OnePunchMan;
        case "sololeveling":
          return sololeveling;
        case "vinlandsaga":
          return vinlandsaga;
        default:
          return naruto;
      }
    };
    setStickers(fetchStickers(selectedCategory)); // استخدام الفئة المحددة
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategoryState(category); // تغيير الفئة المحددة
    setSelectedCategory(category); // تحديث الفئة في المكون الأب
    navigate("/shop", { state: { selectedCategory: category } });
    toggleAnimeOffcanvas();
  };

  return (
    <div>
      {/* زر فتح النافذة الرئيسية */}
      <div className="bloc_button_catg_navbar">
        <button onClick={toggleMainOffcanvas} className="button_catag_navbar">
          <i className="pi pi-align-center">
            <span
              className="titre_button_catalg"
              style={{ marginLeft: "5px", position: "relative", top: "-3px" }}
            >
              Categories
            </span>
          </i>
        </button>
      </div>

      <div className="footer_2">
        <button onClick={toggleMainOffcanvas} className="button_catag">
          <i className="pi pi-align-center"></i>
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
        <Offcanvas.Body>
          <ul>
            <li>
              <span
                className={`caret ${showAnimeOffcanvas ? "caret-down" : ""}`}
                onClick={toggleAnimeOffcanvas}
              >
                <br /> <br /> <br />
                <p className="name_categ">
                  <i
                    className="pi pi-angle-right"
                    style={{
                      fontSize: "25px",
                      position: "relative",
                      top: "2px",
                      marginRight: "5px",
                    }}
                  ></i>

                  Anime
                </p>
              </span>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* نافذة الأنميات */}
      <Offcanvas
        show={showAnimeOffcanvas}
        onHide={toggleAnimeOffcanvas}
        placement="start"
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <div className="img_offcanves">
              <img src={img1} alt="Anime" style={{ width: "100%", height: "100%" }} />
            </div>
          </Offcanvas.Title>
          <button
            onClick={() => {
              toggleAnimeOffcanvas();
              setShowMainOffcanvas(true);
            }}
            className="btn btn-link"
            style={{ textDecoration: "none", color: "#FF416C", fontSize: "1.2rem" }}
          >
            <i className="pi pi-angle-left"></i>
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <br />
          <br />
          <br />
          <br />
          <ul style={{ marginTop: "10px" }}>
            <li>
              <i
                className="pi pi-angle-right"
                style={{
                  fontSize: "25px",
                  position: "relative",
                  top: "2px",
                }}
              ></i>
              <button
                className={`anime-item ${selectedCategory === "naruto" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("naruto")}
              >
                Naruto
              </button>
              <br />
              <i
                className="pi pi-angle-right"
                style={{
                  fontSize: "25px",
                  position: "relative",
                  top: "2px",
                }}
              ></i>
              <button
                className={`anime-item ${selectedCategory === "onepiece" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("onepiece")}
              >
                One Piece
              </button>
              <br />
              <i
                className="pi pi-angle-right"
                style={{
                  fontSize: "25px",
                  position: "relative",
                  top: "2px",
                }}
              ></i>
              <button
                className={`anime-item ${selectedCategory === "hxh" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("hxh")}
              >
                HxH
              </button>

              <br />
              <i
                className="pi pi-angle-right"
                style={{
                  fontSize: "25px",
                  position: "relative",
                  top: "2px",
                }}
              ></i>
              <button
                className={`anime-item ${selectedCategory === "kimetsu" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("kimetsu")}
              >
                Kimetsu
              </button>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Offcanva;
