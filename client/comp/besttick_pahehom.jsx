import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // Added useLocation
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import beststickres from "../api/bestcategory/beststickres.json";
import "./beststick_pagehome.css";
import "./carousel.css";
const BestStickPageHome = () => {  // Corrected the component name
  const [cartItems, setCartItems] = useState([]);
  const [loadingStickerId, setLoadingStickerId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [shuffledStickers, setShuffledStickers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();  // UseLocation to access the current location
  
  const [selectedCategory, setSelectedCategory] = useState(
    sessionStorage.getItem("selectedCategory") || location.state?.selectedCategory || "naruto"
  );

  // Function to chunk the array into pages
  const chunk = (array, size) => {
    return array.reduce((acc, _, index) => {
      if (index % size === 0) acc.push(array.slice(index, index + size));
      return acc;
    }, []);
  };

  // Shuffle the array to display products randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Update the number of items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        setItemsPerPage(4);
      } else if (screenWidth <= 900) {
        setItemsPerPage(6);
      } else if (screenWidth <= 1308) {
        setItemsPerPage(12);
      } else {
        setItemsPerPage(14);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  // Shuffle the stickers when the component is loaded
  useEffect(() => {
    setShuffledStickers(shuffleArray([...beststickres]));
  }, []);

  // Group stickers for pagination
  const groupedStickers = chunk(shuffledStickers, itemsPerPage);

  const addToCart = (sticker) => {
    setLoadingStickerId(sticker.id); // تعيين الحالة للعنصر الذي يتم التعامل معه
  
    // التأكد من إضافة الفئة إذا كانت موجودة
    const productWithCategory = {
      ...sticker,  // نسخ جميع الخصائص الموجودة في sticker
      category: sticker.category || selectedCategory // إضافة الفئة (إما من المنتج أو من الفئة المحددة)
    };
  
    const isAlreadyInCart = cartItems.some((item) => item.id === productWithCategory.id);
  
    if (isAlreadyInCart) {
      setMessageContent("Le sticker est déjà dans le panier.");
    } else {
      const updatedCart = [...cartItems, productWithCategory];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setMessageContent("Le sticker a été ajouté au panier.");
    }
  
    setShowMessage(true);
  
    setTimeout(() => {
      setShowMessage(false);
      setMessageContent("");
      setLoadingStickerId(null); // إعادة تعيين الحالة بعد ثانية
    }, 400);
  };
  
  // Navigate to the product page
  const openProductPage = (sticker) => {
    navigate(`/product/${selectedCategory}/${sticker.id}`, { state: { ...sticker } });
  };

  // Open the cart page
  const openCartPage = () => {
    navigate("/cart", { state: { cartItems } });
  };

  // Load cart items from localStorage
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
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

      <div className="bloc_button_card">
        <div className="pi pi-shop shopicon_navbar" onClick={openCartPage}>
          {cartItems.length > 0 && (
            <span
              className="cart-count"
              style={{
                fontSize: "11px",
                marginLeft: "3px",
                border: "transparent solid 2px",
                borderRadius: "50px",
                padding: "5px",
                fontWeight: "700",
                fontFamily: "sans-serif",
                backgroundColor: "black",
                color: "white",
                cursor: "pointer",
              }}
            >
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

     

  

      <h3 className="titrebeststick" style={{marginLeft:"30px"}}>Les stickers les plus vendus</h3>
      <br />
      <Carousel data-bs-theme="dark" interval={null}>

        {groupedStickers.map((group, groupIndex) => (
          <Carousel.Item key={groupIndex}>

            <div className="blocbeststick">
              
              <div className="stickres_bloc_page_home">
                <div className="product-grid_page_home">
                  {group.map((sticker) => (
                    <div
                      key={sticker.id}
                      className="product-card_pagehome"
                      onClick={() => openProductPage(sticker)}
                    >
                      <Card className="product-card">
                        <div className="img-container">
                          <Card.Img
                            className="img_stckres"
                            src={sticker.image}
                            alt={sticker.title}
                          />
                        </div>
                        <Card.Body>
                          <p className="truncate">{sticker.title}</p>
                          <Card.Text className="product-price">
                            <span className="original-price">
                              {sticker.originalPrice} DT
                            </span>
                            <span className="discounted-price">
                              {sticker.price} DT
                            </span>













                            <button
    style={{
      backgroundColor: "transparent",
      border: "transparent",
      position: "relative",
      top: "50px",
    }}
    onClick={(e) => {
      e.stopPropagation();
      if (loadingStickerId !== sticker.id) {
        addToCart(sticker);
      }
    }}
    disabled={loadingStickerId === sticker.id} // تعطيل الزر أثناء التحميل
  >
    {loadingStickerId === sticker.id ? (
      <i className="pi pi-spin pi-spinner iconcard"></i> // أيقونة الانتظار أثناء إضافة العنصر
    ) : cartItems.some((item) => item.id === sticker.id) ? (
      <i className="pi pi-check-circle iconcard" style={{ color: "#f7184c" }}></i> // أيقونة check-circle إذا كان العنصر في السلة
    ) : (
      <i className="pi pi-shopping-cart iconcard"></i> // أيقونة السلة إذا لم يكن العنصر في السلة
    )}
  </button>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <br />
      <br />
      <br />
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
    </>
  );
};

export default BestStickPageHome;
