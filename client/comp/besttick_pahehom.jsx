import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";  // Added useLocation
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./beststick_pagehome.css";
import "./carousel.css";
import axios from 'axios';
import Card from "react-bootstrap/Card";

const BestStickPageHome = () => {  
  const [cartItems, setCartItems] = useState([]);
  const [loadingStickerId, setLoadingStickerId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isAddingToCartId, setIsAddingToCartId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();  // UseLocation to access the current location
  
  const [selectedCategory, setSelectedCategory] = useState(""); // Initialize selectedCategory


  useEffect(() => {
    // Example: If you pass the category via URL or another source
    const categoryFromUrl = new URLSearchParams(location.search).get("category");
    setSelectedCategory(categoryFromUrl || 'beststckres'); // Use default if not found
  }, [location]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://the-one-opal.vercel.app/beststckres');

        // Ensure the response is valid JSON
        if (response.status === 200) {
          // Check if the response data is a valid array or object
          if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            setError('Invalid product data format.');
          }
        } else {
          setError('Failed to fetch products: ' + response.statusText);
        }
      } catch (err) {
        // Log the error and provide feedback to the user
        console.error('Error fetching products:', err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state
  }

  // Add to Cart Function
  const addToCart = (sticker) => {
    setIsAddingToCartId(sticker._id);

    const productWithCategory = {
      ...sticker,
      category: sticker.category || selectedCategory,
    };

    if (cartItems.some((item) => item._id === sticker._id)) {
      setMessageContent("Le sticker est déjà dans le panier.");
    } else {
      const updatedCart = [...cartItems, productWithCategory];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setMessageContent("Le sticker a été ajouté au panier.");
    }

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setMessageContent("");
      setIsAddingToCartId(null);
    }, 900);
  };
  
  // Navigate to the product page
  const openProductPage = (sticker) => {
    console.log('Selected Category:', selectedCategory);  // Check the category
    console.log('Sticker:', sticker);  // Check the sticker object
  
    if (!selectedCategory || !sticker._id) {
      console.error('Selected category or sticker ID is missing.');
      return; // Prevent navigation if data is invalid
    }
  
    // تنقل إلى صفحة المنتج مع إضافة بيانات المنتج في الـ state
    navigate(`/product/${selectedCategory}/${sticker._id}`, { state: { ...sticker } });
  
    // Scroll to the top of the page
    window.scrollTo(0, 0);  // Scroll to the top (0,0) is the correct value)
  };
  
  
  // Open the cart page
  const openCartPage = () => {
    navigate("/cart", { state: { cartItems } });
  };


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
      <br /> <br />
      <Carousel data-bs-theme="dark" interval={null}>
        <div>
          <br />          <br />
          <br />
          <br />

          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card_pagehome">
             
                <Card className="product-card" onClick={() => openProductPage(product)}>
                 
                  <div className="img-container">
                    <Card.Img
                      className="img_stckres"
                      src={product.image || '/path/to/fallback-image.jpg'}
                      alt={product.title}
                      onError={(e) => e.target.src = '/path/to/fallback-image.jpg'}
                    />
                  </div>
                  <Card.Body>
                    <p className="truncate">{product.title}</p>
                    <Card.Text className="product-price">
                      <span className="original-price">{product.originalPrice} DT</span>
                      <span className="discounted-price">
                        {product.originalPrice * (1 - product.discount / 100)} DT
                      </span>
                    </Card.Text>

                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "transparent",
                        position: "relative",
                        top: "35px",
                        float: "right",
                        right: "-20px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isAddingToCartId !== product._id) {
                          addToCart(product);
                        }
                      }}
                      disabled={isAddingToCartId === product._id}
                    >
                      {isAddingToCartId === product._id ? (
                        <i className="pi pi-spin pi-spinner iconcard"></i>
                      ) : cartItems.some((item) => item._id === product._id) ? (
                        <i className="pi pi-check-circle iconcard" style={{ color: "#f7184c" }}></i>
                      ) : (
                        <i className="pi pi-shopping-cart iconcard"></i>
                      )}
                    </button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
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
