import './navbar.css';
import { useState, useEffect, useRef } from 'react';
import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import "primereact/resources/themes/lara-light-cyan/theme.css";

import logo from '../img/logo.png';
import 'primeicons/primeicons.css';
import { Link, useNavigate } from "react-router-dom";
import ButtonGroup from "./button.jsx";


const Navbar = ({ cartItems = [] }) => {
  const [searchVisible, setSearchVisible] = useState(false); // Toggle search bar visibility
  const searchRef = useRef(null); // Ref for the search container
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
  const list = ["naruto", "onepiece", "hxh", "Car"];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // تصفية العناصر بناءً على النص المدخل
    if (value.trim() === "") {
      setFilteredItems([]);
    } else {
      const filtered = list.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };
  const handleItemClick = (category) => {
    navigate("/shop", { state: { selectedCategory: category } });
    setOpen(false);

  };




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();





  useEffect(() => {
    // Update window width when screen size changes
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSearch = () => {
    setSearchVisible(prev => !prev); // Toggle between true/false
  }

  
  useEffect(() => {
    // If window width exceeds 768px and search is visible, hide it
    if (windowWidth > 768 && searchVisible) {
      setSearchVisible(false);
    }
  }, [windowWidth, searchVisible]); // Re-run whenever windowWidth or searchVisible changes

   // Close search when clicking outside the search container


    

  
  function scrol() {
    window.scrollY(0,0);
    
  }


  const phrases = [
    "  Naruto",
     "  One Piece",
    "  Hunter X Hunter",
    "  Car",
  ];

  // حالة لتخزين الـ placeholder الحالي
  const [placeholder, setPlaceholder] = useState(phrases[0]);

  useEffect(() => {
    // تغيير الـ placeholder كل 2 ثانية
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = phrases.indexOf(prev);
        return phrases[(currentIndex + 1) % phrases.length];
      });
    }, 1800);

    // تنظيف الـ interval عند تدمير المكون
    return () => clearInterval(interval);
  }, []);



  return (
    <>
      <div className='bloc_complait_nav'>
        <div className="bloc_navbar">
          
          <div className="logo">
            <Link to="/" style={{ textDecoration: "none" }} onClick={scrol} >
              <img src={logo} className="logi_img" alt="Logo" />
              <p className="titre">
                THE ONE
              </p>
            </Link>
          </div>

          <div className="bloc_sersh_visible">
          <div className="card">
           

           
        

            
        </div>
        
        <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        style={{position:"absolute",top:"-00px" }}
      >
<i className="pi pi-times" 
  onClick={handleClose} 
     style={{ 
     fontSize: '1.5rem', 
     position: 'absolute', 
     top: '3%', 
     color:"black",
     right: '10px',  // Adjust to your preference
     transform: 'translateY(-50%)', // Center vertically
     border: '0px solid black', 
     width: '40px', 
     height: '40px',
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
    
   }}>
</i><br /><br />

          <DialogContentText  className='bloc_dialog'>


          <div>
  <div className="search-container_dialog">

    <input
      type="text"
      className="search-input"
      placeholder={placeholder}
      
      value={searchTerm}
      style={{ position: "relative", top: "-0px", color: "black", fontWeight: "500" }}
      onChange={handleSearch}
    />
    <button className="search-button">
      <i className="pi pi-search icon_serche_nav-bar" style={{ position: 'relative', top: '5px' }}></i>
    </button>
  </div>
  <br />
  <br />
  <br />
  
  <div className="search-popup" style={{ border: "transparent solid" }}>

    <p className='titre_res'>
      Résulta de recherche de " {searchTerm.trim() === "" ? "..." : searchTerm} "
    </p>
    <ul>
  {/* عرض العناصر المفلترة */}
  {filteredItems.length > 0 ? (
    filteredItems.map((item, index) => (
      <li key={index} className='resulta_rech' onClick={() => handleItemClick(item)}>
        <i className="pi pi-search" style={{ fontSize: '1rem' }}></i> {item}
      </li>
    ))
  ) : (
    // في حال عدم وجود أي فئة مطابقة وكان searchTerm غير فارغ، نعرض الرسالة
    searchTerm && (
      <p style={{
        color: 'black',
        fontSize: '16px',
        fontWeight: '500',
        marginTop: "-2px",
        border: "black solid 0px",
        maxWidth: "90%",
        wordWrap: "break-word", // Ensure long words break to the next line
        whiteSpace: "normal" // Allow text to wrap normally
      }}>
        Aucune catégorie trouvée avec le nom "{searchTerm}"
      </p>
    )
  )}
</ul>

  </div>
</div>

            
                  </DialogContentText>
      
      </Dialog>
        </React.Fragment>
        
            <div className="search-container">

              <input
              onClick={handleClickOpen}
                type="text"
              style={{position:"relative",top:"-0px",color:"black ",fontWeight:"0"}}
              className="search-input"
              placeholder={placeholder}
              />
              <button className="search-button" >
                <i className="pi pi-search icon_serche_nav-bar"></i>
              </button>
              
            </div>


          </div>


   
  
        </div>
        <div className="footer">
          {/* Search icon to toggle visibility */}
<br />  
          <i className="pi pi-search sershfooter"  onClick={handleClickOpen}   ></i>
          
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
