import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav_bar from "../../comp/nav_bar.jsx";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Offcanva from "../../comp/Offcanva.jsx";
import Skeleton from '@mui/material/Skeleton';
import img1 from "../../img/lod.png";
import "./shop.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [stickers, setStickers] = useState([]);

  const { selectedCategory } = location.state || {};

  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cartItems")) || []);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isAddingToCartId, setIsAddingToCartId] = useState(null);

  const itemsPerPage = 40; // عدد العناصر لكل صفحة
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 0;
  });

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (stickers && stickers.length > 0) {
      setTotalPages(Math.ceil(stickers.length / itemsPerPage));
    }
  }, [stickers]);

  const currentItems = stickers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        sessionStorage.setItem("currentPage", newPage);
        window.scrollTo(0, 0);
        return newPage;
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        sessionStorage.setItem("currentPage", newPage);
        window.scrollTo(0, 0);
        return newPage;
      });
    }
  };

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, Number(savedScrollPosition));
      }, 1000);
    }
  }, []);

  const handleScroll = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const fetchData = (category) => {
    if (!category) return; // تحقق من أن الفئة موجودة قبل الجلب
    setLoading(true);
    axios
      .get(`https://the-one-opal.vercel.app/product/${category}`)
      .then((response) => {
        setStickers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

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

  const openCartPage = () => {
    navigate('/cart', { state: { cartItems } });
  };

  const openProductPage = (sticker) => {
    // تعيين الحجم المختار مباشرة إلى "6 cm"
    setSelectedSize("6 cm");
    
    // تمرير البيانات إلى صفحة المنتج مع الحجم المحدد
    navigate(`/product/${selectedCategory}/${sticker._id}`, {
      state: { ...sticker, selectedSize: "6 cm" }, // إرسال الحجم مع باقي البيانات
    });
  };
  const handleCategoryChange = (category) => {
    sessionStorage.setItem("selectedCategory", category); // حفظ الفئة المختارة في sessionStorage
    setCurrentPage(0); // إعادة الصفحة الحالية إلى 0 عند تغيير الفئة
    fetchData(category); // جلب البيانات للفئة الجديدة
  };

  const [selectedSize, setSelectedSize] = useState("6 cm"); // الحالة لحجم المنتج المختار


  if (loading) {
    return (
      <div>
        {/* عرض مكون Nav_bar */}
        <Nav_bar />
        <Offcanva />
        <br /><br />  <br /><br />  
      

        <div className="bloc_button_card">

        <div className="pi pi-shop shopicon_navbar" >
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
       
      <div className="bloc_stickres_all">
        
        <div className="stickres_bloc">
        <h3  className="titrcat" >  Categories: <span><Skeleton variant="text" sx={{ width:"100px",marginLeft:"10px"}} /></span>  </h3>
          <h3 className="category-title">
          </h3>

          <div className="product-grid">
          <Card className="product-card">
                  <Card.Img src={img1}/>
  

                  

                  <Card.Body>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                 
                    <Card.Text className="product-prie">
                      <br />
                      <span className="original-price"><Skeleton variant="text" sx={{ width:"50px"}} />
                      </span>
                   
                      <span className="discounted-price"><Skeleton variant="text" sx={{ width:"50px"}} /></span>
                    </Card.Text>

                    
                

                    <Skeleton 
  variant="circular" 
  width={30} 
  height={30} 
  style={{ position: 'relative', top: '-55px', float:"right" }} 
/>


                    <Button
                      variant="link"
                      className="cart-icon"
                     >
                    </Button>
             

                  </Card.Body>
                </Card>
                <Card className="product-card">
                  <Card.Img src={img1}/>
  

                  

                  <Card.Body>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                 
                    <Card.Text className="product-prie">
                      <br />
                      <span className="original-price"><Skeleton variant="text" sx={{ width:"50px"}} />
                      </span>
                   
                      <span className="discounted-price"><Skeleton variant="text" sx={{ width:"50px"}} /></span>
                    </Card.Text>

                    
                

                    <Skeleton 
  variant="circular" 
  width={30} 
  height={30} 
  style={{ position: 'relative', top: '-55px', float:"right" }} 
/>


                    <Button
                      variant="link"
                      className="cart-icon"
                     >
                    </Button>
             

                  </Card.Body>
                </Card>

                <Card className="product-card">
                  <Card.Img src={img1}/>
  

                  

                  <Card.Body>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                 
                    <Card.Text className="product-prie">
                      <br />
                      <span className="original-price"><Skeleton variant="text" sx={{ width:"50px"}} />
                      </span>
                   
                      <span className="discounted-price"><Skeleton variant="text" sx={{ width:"50px"}} /></span>
                    </Card.Text>

                    
                

                    <Skeleton 
  variant="circular" 
  width={30} 
  height={30} 
  style={{ position: 'relative', top: '-55px', float:"right" }} 
/>


                    <Button
                      variant="link"
                      className="cart-icon"
                     >
                    </Button>
             

                  </Card.Body>
                </Card>
                <Card className="product-card">
                  <Card.Img src={img1}/>
  

                  

                  <Card.Body>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                 
                    <Card.Text className="product-prie">
                      <br />
                      <span className="original-price"><Skeleton variant="text" sx={{ width:"50px"}} />
                      </span>
                   
                      <span className="discounted-price"><Skeleton variant="text" sx={{ width:"50px"}} /></span>
                    </Card.Text>

                    
                

                    <Skeleton 
  variant="circular" 
  width={30} 
  height={30} 
  style={{ position: 'relative', top: '-55px', float:"right" }} 
/>


                    <Button
                      variant="link"
                      className="cart-icon"
                     >
                    </Button>
             

                  </Card.Body>
                </Card>
                <Card className="product-card">
                  <Card.Img src={img1}/>
  

                  

                  <Card.Body>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                 
                    <Card.Text className="product-prie">
                      <br />
                      <span className="original-price"><Skeleton variant="text" sx={{ width:"50px"}} />
                      </span>
                   
                      <span className="discounted-price"><Skeleton variant="text" sx={{ width:"50px"}} /></span>
                    </Card.Text>

                    
                

                    <Skeleton 
  variant="circular" 
  width={30} 
  height={30} 
  style={{ position: 'relative', top: '-55px', float:"right" }} 
/>


                    <Button
                      variant="link"
                      className="cart-icon"
                     >
                    </Button>
             

                  </Card.Body>
                </Card>
                <Card className="product-card">
                  <Card.Img src={img1}/>
  

                  

                  <Card.Body>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                 
                    <Card.Text className="product-prie">
                      <br />
                      <span className="original-price"><Skeleton variant="text" sx={{ width:"50px"}} />
                      </span>
                   
                      <span className="discounted-price"><Skeleton variant="text" sx={{ width:"50px"}} /></span>
                    </Card.Text>

                    
                

                    <Skeleton 
  variant="circular" 
  width={30} 
  height={30} 
  style={{ position: 'relative', top: '-55px', float:"right" }} 
/>


                    <Button
                      variant="link"
                      className="cart-icon"
                     >
                    </Button>
             

                  </Card.Body>
                </Card>
    

          </div>

          
        </div>
      </div>
      </div>
    );
  }
  

  
  
  return (
    <>

      {/* الرسالة */}
      {showMessage && (
        <div className="alert alert-success">
          <span className="titre_succses">{messageContent}</span>
          <i className="pi pi-cart-arrow-down"></i>
        </div>
      )}
      <div className="bloc_button_card">
        <div className="pi pi-shop shopicon_navbar" onClick={openCartPage}>
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
      <Nav_bar />
      <Offcanva currentPage={currentPage} setSelectedCategory={handleCategoryChange} />
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

      <div className="bloc_stickres_all">
        <div className="stickres_bloc">
       
            <h3  className="titrebeststick category">  Categories:  {selectedCategory} </h3>

<br /><br /><br /><br /><br />
<div className="product-grid">
  {Array.isArray(stickers) && stickers.length > 0 ? (
    stickers.map((sticker) => (
      <div key={sticker._id} className="product-card_pagehome">
     <Card
  className="product-card"
  onClick={() => {
    openProductPage(sticker); // تمرير المنتج (sticker) إلى الدالة
  }}
>
  <div className="img-container">
    <Card.Img className="img_stckres" src={sticker.image} alt={sticker.title} />
  </div>
  <Card.Body>
    <p className="truncate">{sticker.title}</p>
    <Card.Text className="product-price">
      <span className="original-price">{sticker.originalPrice} DT</span>
      <span className="discounted-price">{sticker.price} DT</span>
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
        if (isAddingToCartId !== sticker._id) {
          addToCart(sticker);
        }
      }}
      disabled={isAddingToCartId === sticker._id}
    >
      {isAddingToCartId === sticker._id ? (
        <i className="pi pi-spin pi-spinner iconcard"></i> // أيقونة الانتظار أثناء النقر
      ) : cartItems.some((item) => item._id === sticker._id) ? (
        <i className="pi pi-check-circle iconcard" style={{ color: "#f7184c" }}></i> // أيقونة check-circle إذا كان العنصر في السلة
      ) : (
        <i className="pi pi-shopping-cart iconcard"></i> // أيقونة السلة إذا لم يتم النقر عليها
      )}
    </button>
  </Card.Body>
</Card>
      </div>
    ))
  ) : (
    null


  )}
</div>


          {/* التنقل بين الصفحات */}
          {/* <div className="bloc_pagination">
        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="button_pagination buttonPrevious_pagehome"
          >
            <i className="pi pi-angle-left"></i>
            <span className="nome_buttonPrécédente">Précédente</span>
          </button>
          <span
            style={{
              position: "relative",
              top: "10px",
              color: "#444444",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Page {currentPage + 1} sur {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="button_pagination buttonNextpagehome"
          >
            <span className="nome_buttonSuivante">Suivante</span>
            <i
              className="pi pi-angle-right"
              style={{
                fontSize: "1.4rem",
                position: "relative",
                top: "3px",
                marginLeft: "5px",
              }}
            ></i>
          </button>
        </div>
      </div> */}
          <br />        <br />        <br />        <br /><br />        <br />        <br />        <br /><br />        <br />        <br />        <br />
        </div>

      </div>
    </>
  );
}

export default Shop;
