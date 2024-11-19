import "./beststick_pagehome.css";
import beststickres from "../api/bestcategory/beststickres.json";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";

const BesttickPahehom = () => {
  // Pagination State
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loadingStickerId, setLoadingStickerId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const totalPages = Math.ceil(beststickres.length / itemsPerPage);

  const displayedStickers = beststickres.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigate = useNavigate();

  const openProductPage = (sticker) => {
    navigate('/product', { state: { ...sticker } });
  };

  // Function to add item to cart and save to localStorage
  const addToCart = (sticker) => {
    const isAlreadyInCart = cartItems.some(item => item.id === sticker.id);

    if (isAlreadyInCart) {
      setMessageContent("Le sticker est déjà dans le panier."); // رسالة المنتج موجود
    } else {
      const updatedCart = [...cartItems, sticker];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // حفظ السلة في localStorage
      setMessageContent("Le sticker a été ajouté au panier."); // رسالة النجاح
    }

    setShowMessage(true);
    setLoadingStickerId(sticker.id);

    setTimeout(() => {
      setShowMessage(false);
      setMessageContent(""); // إعادة تعيين محتوى الرسالة
      setLoadingStickerId(null);
    }, 1300); // تختفي الرسالة بعد 1.3 ثانية
  };

  // Function to open cart page
  const openCartPage = () => {
    navigate('/cart', { state: { cartItems } });
  };

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  return (
    <>
      {showMessage && (
        <div className="alert alert-success">
          <span className="titre_succses">{messageContent}</span>
          <i className="pi pi-cart-arrow-down"></i>
        </div>
      )}

      {/* Cart Icon navbar */}
      <div className="bloc_button_card">
        <div className="pi pi-shop shopicon_navbar" onClick={openCartPage}>
          {cartItems.length > 0 && (
            <span className="cart-count" style={{
         
              fontSize: "11px",
              marginLeft: "3px",
              border: "transparent solid 2px",
              borderRadius: "50px",
              padding: "5px",
              fontWeight: "700",
              fontFamily: "sans-serif",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer"
            }}>
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      {/* Cart Icon footer */}
      <div className="bloc_footer2">
        <div className="pi pi-shop shopicon_footer2" onClick={openCartPage}>
          {cartItems.length > 0 && (
            <span className="cart-count" style={{
          
              fontSize: "10px",
              marginLeft: "3px",
              border: "transparent solid 0px",
              borderRadius: "50px",
              padding: "5px",
              fontWeight: "500",
              fontFamily: "sans-serif",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer"
            }}>
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      <br /><br /><br />
      <div className='blocbeststick'>
        <div className="stickres_bloc_page_home">
          <div className="product-grid_page_home">
            <h3 className='titrebeststick'>Les stickers les plus vendus</h3>
            <div className='bloc_5at'></div>

            {displayedStickers.map((sticker) => (
              <div key={sticker.id} className="product-card_pagehome" onClick={() => openProductPage(sticker)}>
                <Card className="product-card">
                  <div className="img-container">
                    <Card.Img className="img_stckres" src={sticker.image} />
                  </div>
                  <Card.Body>
                    <p className="truncate">{sticker.title}</p>
                    <Card.Text className="product-price">
                      <span className="original-price">{sticker.originalPrice} DT</span>
                      <span className="discounted-price">{sticker.price} DT</span>
                    
                    
                      <button  style={{backgroundColor:"transparent",border:"transparent ", position:"relative",top:"50px"}}   onClick={(e) => { 
    e.stopPropagation(); 
    if (!loadingStickerId) { // تحقق إذا لم يكن في حالة تحميل
      addToCart(sticker); 
    } 
  }}
  disabled={loadingStickerId === sticker.id} // تعطيل الزر أثناء التحميل
>
  {loadingStickerId === sticker.id ? (
    <i className="pi pi-spin pi-spinner iconcard" ></i>
  ) : (
<i className="pi pi-shopping-cart iconcard" ></i>  )} </button>
                   
                    </Card.Text>

                  


                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <div className="bloc_pagination">
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 0} className="button_pagination buttonPrevious_pagehome">
                <i className="pi pi-angle-left" style={{ fontSize: '1.4rem', position: "relative", top: "3px", marginRight: "5px" }}></i>
                <span className="nome_buttonPrécédente">Précédente</span>
              </button>
              <span style={{ position: "relative", top: "135px", color: "#444444", fontWeight: "500", textAlign: "center" }}>
                Page {currentPage + 1} sur {totalPages}
              </span>
              <button onClick={nextPage} disabled={currentPage === totalPages - 1} className="button_pagination buttonNextpagehome">
                <span className="nome_buttonSuivante">Suivante</span>
                <i className="pi pi-angle-right" style={{ fontSize: '1.4rem', position: "relative", top: "3px", marginLeft: "5px" }}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <br /><br /><br />
    </>
  );
}

export default BesttickPahehom;
