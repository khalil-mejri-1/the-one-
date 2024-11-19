import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./productpage.css";
import Navbar from "../../comp/nav_bar.jsx";
import Offcanva from '../../comp/Offcanva.jsx';

const ProductPage = () => {
  const location = useLocation();
  const { image, title, price, originalPrice } = location.state || {};
  
  const [cartItems, setCartItems] = useState([]);
  const [isAdding, setIsAdding] = useState(false);  // حالة لعرض الأيقونة الانتظار
  const [messageContent, setMessageContent] = useState("");  // رسالة النجاح أو الخطأ
  const [showMessage, setShowMessage] = useState(false);  // حالة لعرض أو إخفاء الرسالة

  const navigate = useNavigate();

  // تحميل السلة من localStorage عند التحميل
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const addToCart = (sticker) => {
    // التحقق من أن المنتج غير موجود بالفعل في السلة
    const isAlreadyInCart = cartItems.some(item => item.title === sticker.title);
    
    if (isAlreadyInCart) {
      setMessageContent("Le sticker est déjà dans le panier.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);  // إخفاء الرسالة بعد 3 ثواني
      return;
    }

    // تغيير حالة الأيقونة إلى الانتظار أثناء إضافة المنتج
    setIsAdding(true);

    // محاكاة تأخير لمدة ثانية قبل إضافة المنتج للسلة
    setTimeout(() => {
      const updatedCart = [...cartItems, sticker];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));  // حفظ السلة في localStorage
      setIsAdding(false);
      setMessageContent("Le sticker a été ajouté au panier.");
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);  // إخفاء الرسالة بعد 3 ثواني
    }, 1000);  // تأخير قدره 1 ثانية لمحاكاة الإضافة
  };

  const openCartPage = () => {
    navigate('/cart', { state: { cartItems } });
  };

  return (
    <>
      {/* رسالة النجاح */}
      {showMessage && (
        <div className="alert alert-success">
          <span className="titre_succses">{messageContent}</span>
          <i className="pi pi-cart-arrow-down"></i>
        </div>
      )}

      {/* أيقونة السلة في الشريط العلوي */}
      <div className="bloc_button_card">
        <div className="pi pi-shop shopicon_navbar" onClick={openCartPage}>
          {cartItems.length > 0 && (
            <span className="cart-count" style={{ color: "black", fontSize: "11px", marginLeft: "3px", border: "transparent solid 2px", borderRadius: "50px", padding: "5px", fontWeight: "700", fontFamily: "sans-serif", backgroundColor: "black", color: "white", cursor: "pointer" }}>
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      {/* أيقونة السلة في الشريط السفلي */}
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

      <Navbar />
      <Offcanva />

      <div className="product-page">
        <div className='bloc_img_product'>
          <div className="product-image-container">
            <img src={image} alt={title} className="product-image" />
          </div>
        </div>
        <div className="product-details">
          <h1>{title}</h1>
          <p className="price">{price} DT</p>
          <p className="discount-price">{originalPrice} DT</p>
          <button className="add-to-cart" onClick={() => addToCart({ image, title, price, originalPrice })}>
            {isAdding ? <i className="pi pi-spin pi-spinner"></i> : "Add to Cart"}
          </button>
          <div className="product-characteristics">
            <h2>Caractéristiques du produit</h2>
            <div className="rating">
              ★★★★★ <span>4.66 (1828 avis)</span>
            </div>
            <ul>
              <li>Décorez et personnalisez des ordinateurs portables, des bouteilles d'eau et plus encore</li>
              <li>Sticker en vinyle demi-découpé (kiss-cut), facile à décoller.</li>
              <li>Ultra résistant, y compris à l'eau.</li>
              <li>Une bordure blanche de 3,2 mm entoure chaque design.</li>
              <li>Fini mat.</li>
              <li>Notez que si vous commandez plusieurs stickers, ils seront imprimés par deux sur une même planche pour limiter le gaspillage.</li>
              <li>Comme chaque article est fabriqué spécialement pour vous par votre fournisseur tiers local, il peut y avoir de légères différences dans le produit reçu.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
