import React, { useState } from 'react';
import './navbar.css';
import logo from '../img/logo.png';
import 'primeicons/primeicons.css';
import { Link, useNavigate } from "react-router-dom";
import ButtonGroup from "./button.jsx";
const Navbar = ({ cartItems = [] }) => {
  const [searchVisible, setSearchVisible] = useState(false); // Toggle search bar visibility

  const navigate = useNavigate();

  const toggleSearch = () => {
    setSearchVisible(!searchVisible); // Toggle the search visibility on icon click
  };

  function scrol() {
    window.scrollY(0,0);
    
  }

  return (
    <>
      <div className='bloc_complait_nav'>
        <div className="bloc_navbar">
          
          <div className="logo">
            <Link to="/" style={{ textDecoration: "none" }} onClick={scrol} >
              <img src={logo} className="logi_img" alt="Logo" />
              <h1 className="titre">
                THE ONE
              </h1>
            </Link>
          </div>

          <div className="bloc_sersh_visible">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
              />
              <button className="search-button">
                <i className="pi pi-search icon_serche_nav-bar"></i>
              </button>
            </div>
          </div>

        </div>

        <div className="footer">
          {/* Search icon to toggle visibility */}
          <i className="pi pi-search" onClick={toggleSearch}></i>
          
          {/* Home link */}
          <Link to="/" className="pi pi-home"></Link>
          
          {/* Cart icon with item count */}
          <div className="bloc_button_card">
            <div 
              className="pi pi-shop shopicon_navbar" 
              onClick={() => navigate('/cart', { state: { cartItems } })}
            >
              {cartItems.length > 0 && (
                <span className="cart-count" style={{
                  fontSize: "11px", marginLeft: "3px",
                  border: "transparent solid 2px", borderRadius: "50px",
                  padding: "5px", fontWeight: "700", fontFamily: "sans-serif",
                  backgroundColor: "black", color: "white", cursor: "pointer"
                }}>
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Promo banner */}
      <div className='blocremiz'>
        <p className='pargremiz'>Livraison gratuite sur les achats de 50 dinars ou plus</p>
      </div>
      <br /> <br /> <br /> <br />
  
  <ButtonGroup />
  
    </>
  );
};

export default Navbar;
