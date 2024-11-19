import React, { useState, useEffect, useLayoutEffect } from "react";
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
  const [loading, setLoading] = useState(true); // Toggle search bar visibility

  const [stickers, setStickers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    sessionStorage.getItem("selectedCategory") || location.state?.selectedCategory || "naruto"
  );
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cartItems")) || []);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [loadingStickerId, setLoadingStickerId] = useState(null);

  const itemsPerPage = 40; // عدد العناصر لكل صفحة
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 0;
  });
  const [totalPages, setTotalPages] = useState(1);

  // استعادة التمرير عند تحميل الصفحة
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, Number(savedScrollPosition));
      }, 200); // تأخير التمرير قليلاً
    }
  }, []);

  // حفظ مكان التمرير في localStorage عند التمرير
  const handleScroll = () => {
    localStorage.setItem("scrollPosition", window.scrollY);
  };

  // إضافة مستمع للتمرير عند تحميل الصفحة
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // تنظيف مستمع التمرير عند الخروج من الصفحة
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // جلب البيانات عند تحميل الصفحة أو تغيير الصفحة
  useEffect(() => {
    fetchData(selectedCategory, currentPage);
  }, [currentPage, selectedCategory]);

  // حفظ رقم الصفحة في sessionStorage عند تغييره
  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  // جلب البيانات من API
  const fetchData = (category, page) => {
    axios
      .get(`http://localhost:3000/api/${category}?page=${page + 1}&limit=${itemsPerPage}`)
      .then((response) => {
        setStickers(response.data.items);
        setTotalPages(response.data.totalPages);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  
  if (loading) {
    return (
      <div>
        {/* عرض مكون Nav_bar */}
        <Nav_bar />
        <Offcanva />
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
          <h3 className="category-title">
            Categories: <span>{selectedCategory}</span>
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
  
  // التعامل مع تغيير الفئة
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(0); // إعادة تعيين الصفحة إلى 0 عند تغيير الفئة
  };
  
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // إعادة التمرير إلى أعلى الصفحة
    }
  };
  
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // إعادة التمرير إلى أعلى الصفحة
    }
  };
  
  // إضافة useEffect لمراقبة التغيرات في currentPage وتطبيق التمرير بعد التحديث

  const addToCart = (sticker) => {
    setLoadingStickerId(sticker._id);

    // التحقق إذا كان العنصر موجودًا بالفعل في العربة
    if (cartItems.some(item => item._id === sticker._id)) {
      setMessageContent("Le sticker est déjà dans le panier.");
    } else {
      const updatedCart = [...cartItems, sticker];
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setMessageContent("Le sticker a été ajouté au panier.");
    }

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setLoadingStickerId(null);
    }, 1300);
  };

  const openProductPage = (sticker) => {
    navigate('/product', { state: { ...sticker } });
  };

  const openCartPage = () => {
    navigate('/cart', { state: { cartItems } });
  };

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

      <div className="bloc_stickres_all">
        <div className="stickres_bloc">
          <br />  <br />  <br />
          <h3 className="category-title" style={{marginLeft:"10px", fontWeight:"600"}}>
            Categories: <span >{selectedCategory}</span>
          </h3>

          <div className="product-grid">
            {stickers.map((sticker) => (
             <div key={sticker.id} className="product-card_pagehome" onClick={() => openProductPage(sticker)}>
                <Card className="product-card">
                  <div className="img-container">
                    <Card.Img className="img_stckres" src={sticker.image} />
                  </div>
                  <Card.Body>
                    <p className="truncate"> {sticker.title}</p>
                    <Card.Text className="product-price">
                      <span className="original-price">{sticker.originalPrice} DT</span>
                      <span className="discounted-price">{sticker.price} DT</span>
                    </Card.Text>

                    <Button
                      variant="link"
                      className="cart-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (loadingStickerId !== sticker._id) {
                          addToCart(sticker);
                        }
                      }}
                      disabled={loadingStickerId === sticker._id}
                    >
                      {loadingStickerId === sticker._id ? (
                        <i className="pi pi-spin pi-spinner iconcard"></i>
                      ) : (
                        <i className="pi pi-shopping-cart iconcard"></i>
                      )}
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          {/* التنقل بين الصفحات */}
          <div className="bloc_pagination">
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 0} className="button_pagination buttonPrevious_pagehome">
                <i className="pi pi-angle-left" style={{ fontSize: '1.4rem', position: "relative", top: "3px", marginRight: "0px", color:"black", left:"0px" }}></i>
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
          <br />        <br />        <br />        <br />
        </div>
      </div>
    </>
  );
}

export default Shop;
