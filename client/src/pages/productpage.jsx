import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./productpage.css";
import Navbar from "../../comp/nav_bar.jsx";
import Offcanva from '../../comp/Offcanva.jsx';
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Skeleton from '@mui/material/Skeleton';  // If you are using Material UI

const ProductPage = () => {
  const  prix=0.6;
  const  oldprixe=1;
  const location = useLocation();
  const { image, title, price, originalPrice } = location.state || {};
  const [isAddingToCartId, setIsAddingToCartId] = useState(null);

  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cartItems")) || []);
  const [isAdding, setIsAdding] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingStickerId, setLoadingStickerId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default to 5 items per page
  const [shuffledStickers, setShuffledStickers] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 0;
  });
  const [selectedCategory, setSelectedCategory] = useState("");


  const navigate = useNavigate();
  const category = location.pathname.split("/")[2];
 
  useEffect(() => {
    if (category) {
      setSelectedCategory(category); // تعيين الفئة المستخرجة من الرابط
    }
  }, [category]);

  useEffect(() => {
    if (category) {
      fetch(`https://the-one-opal.vercel.app/product/${category}`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch(error => {
          console.error("Error fetching products:", error);
          setLoading(false); // Also set loading to false in case of an error
        });
    }
  }, [category]);
  
  // Shuffle the stickers to display them randomly
  useEffect(() => {
    if (products.length) {
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setShuffledStickers(shuffled);
    }
  }, [products]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        setItemsPerPage(4);
      } else if (screenWidth <= 900) {
        setItemsPerPage(6 );
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

  const [selectedSize, setSelectedSize] = useState("6 cm"); // الحالة لحجم المنتج المختار



  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  

const addToCart = (sticker) => {
  setLoadingStickerId(sticker._id); // حدد العنصر الجاري إضافته
  
  // التحقق إذا كان العنصر موجودًا بالفعل في السلة
  const isAlreadyInCart = cartItems.some((item) => item._id === sticker._id);
  
  if (isAlreadyInCart) {
    setMessageContent("Le sticker est déjà dans le panier."); // عرض رسالة
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setMessageContent("");
      setLoadingStickerId(null);
    }, 900);

    return;
  }
  
  // إنشاء نسخة محدثة للمنتج مع الحجم المختار
  const updatedSticker = {
    ...sticker,
    category: selectedCategory,
    size: selectedSize || "6 cm", // استخدام الحجم المختار أو القيمة الافتراضية
    quantity: 1,
  };

  // تحديث السلة
  const updatedCart = [...cartItems, updatedSticker];
  setCartItems(updatedCart);
  
  // تخزين السلة في Local Storage
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  
  setMessageContent("Le sticker a été ajouté au panier.");
  setShowMessage(true);

  setTimeout(() => {
    setShowMessage(false);
    setMessageContent("");
    setLoadingStickerId(null);
  }, 900);
};

  
  
  
  
  const openCartPage = () => {
    navigate('/cart', { state: { cartItems } });
  };

  const openProductPage = (sticker) => {
    navigate(`/product/${selectedCategory}/${sticker._id}`, { state: { ...sticker } });
    setSelectedSize("6 cm"); // تحديث الحالة محلياً

    window.scrollTo(0,0)
  };

  // Function to chunk the stickers into pages
  const chunk = (array, size) => {
    return array.reduce((acc, _, index) => {
      if (index % size === 0) acc.push(array.slice(index, index + size));
      return acc;
    }, []);
  };
  const [loading, setLoading] = useState(true);

  const groupedStickers = chunk(shuffledStickers, itemsPerPage);
 

  if (loading) {
    return (
      <div> 
        
        <Navbar />
        <Offcanva  />
        <div className="product-page">
  <div className="bloc_img_product">
    <div className="product-image-container">
    <Skeleton sx={{width:"90%",height:"1200px",position:"relative",top:"-200px"}} />

    </div>
  </div>
  <div className="product-details">
  <Skeleton sx={{width:"90%",height:"60px"}} />

  <p className="price">{prix} DT</p>
  <p className="discount-price">{oldprixe} DT</p>
  {/* <div className='bloc_size'> 
          <p style={{fontSize:"15px", fontWeight:"700"}}>Size :</p>
          <button 
            className='button_size' 
            onClick={() => handleSizeSelect("6 cm")} 
            style={{ backgroundColor: selectedSize === "6 cm" ? "#ccc" : "" }}
          >
            6 cm
          </button>
          <button 
            className='button_size' 
            onClick={() => handleSizeSelect("8 cm")} 
            style={{ backgroundColor: selectedSize === "8 cm" ? "#ccc" : "" }}
          >
            8 cm
          </button>
          <button 
            className='button_size' 
            onClick={() => handleSizeSelect("10 cm")} 
            style={{ backgroundColor: selectedSize === "10 cm" ? "#ccc" : "" }}
          >
            10 cm
          </button>
          <button 
            className='button_size' 
            onClick={() => handleSizeSelect("12 cm")} 
            style={{ backgroundColor: selectedSize === "12 cm" ? "#ccc" : "" }}
          >
            12 cm
          </button>
        </div><br /> */}
  <button
    className="add-to-cart"
   
    
  >
           <span> Ajouter au panier <i className="pi pi-shopping-cart" style={{ color: "", marginLeft:"10px"}}></i> </span> 
  </button>

  <div className="product-characteristics">
    <h2 style={{fontWeight:"800"}}>Caractéristiques du produit</h2>
    {/* <div className="rating">
      ★★★★★ <span>4.66 (1828 avis)</span>
    </div> */}
      <br />
    <div className="rating">
    ❤️ أطلق العنان لإبداعك وزيّن حاجاتك بستيكيرات فينيل مزيانة برشا


    </div>
    <br />
    <ul>
      <li>تصاميم شيك ومميزة باش تعطي لمسة شخصية لحاسوبك ،قرورات الماء، التليفونات، موتورات ،حتى بيتك</li>
      <li>سهلة في اللصق والتقليع، لصق وزين منغير تعب</li>
      <li>جودة عالية برشا، تقاوم الماء والخدوش، وتعيش معاك مدة طويلة.</li>
      <li>يعطي شكل راقي وجديد لحاجاتك.</li>
      <li>مصنوعة باحسن نوعية للناس الي تحب التفاصيل الفريدة</li>
    </ul>
  </div>
</div>



</div>
         </div>
    );
  }

  
  const handleCategoryChange = (category) => {
    sessionStorage.setItem("selectedCategory", category);  // Save selected category to sessionStorage
    setCurrentPage(0); // Reset page to 0 when changing category
  };


  
  return (
    <>
      {showMessage && (
        <div className="alert alert-success">
          <span className="titre_succses">{messageContent}</span>
          <i className="pi pi-cart-arrow-down"></i>
        </div>
      )}

      {/* Cart icon in the top navbar */}
      <div className="bloc_button_card">
        <div className="pi pi-shop shopicon_navbar" onClick={openCartPage}>
          {cartItems.length > 0 && (
            <span className="cart-count" style={{ color: "black", fontSize: "11px", marginLeft: "3px", border: "transparent solid 2px", borderRadius: "50px", padding: "5px", fontWeight: "700", fontFamily: "sans-serif", backgroundColor: "black", color: "white", cursor: "pointer" }}>
              {cartItems.length}
            </span>
          )}
        </div>
      </div>

      {/* Cart icon in the footer */}
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
      {/* <Offcanva setSelectedCategory={handleCategoryChange} /> */}

      <div className="product-page">
  <div className="bloc_img_product">
    <div className="product-image-container">
      <img src={image} alt={title} className="product-image" />
    </div>
  </div>
  <div className="product-details">
  <h1 style={{fontWeight:'800'}}>{title}</h1>
  <p className="price">{prix} DT</p>
  <p className="discount-price">{originalPrice} DT</p>
  {/* <div className='bloc_size'> 
          <p style={{fontSize:"15px", fontWeight:"700"}}>Size :</p>
          <button 
            className='button_size' 
            onClick={() => handleSizeSelect("6 cm")} 
            style={{ backgroundColor: selectedSize === "6 cm" ? "#ccc" : "" }}
          >
            6 cm
          </button>
          <button 
            className='button_size' 
            onClick={() => handleSizeSelect("8 cm")} 
            style={{ backgroundColor: selectedSize === "8 cm" ? "#ccc" : "" }}
          >
            8 cm
          </button>
          <button 
            className='button_size' 
            onClick={() => handleSizeSelect("10 cm")} 
            style={{ backgroundColor: selectedSize === "10 cm" ? "#ccc" : "" }}
          >
            10 cm
          </button>
          <button 
            className='button_size' 
            onClick={() => handleSizeSelect("12 cm")} 
            style={{ backgroundColor: selectedSize === "12 cm" ? "#ccc" : "" }}
          >
            12 cm
          </button>
        </div><br /> */}
  <button
    className="add-to-cart"
    onClick={() => addToCart({ 
      _id: title,  // استخدم معرّف فريد بناءً على العنوان أو _id الخاص بالمنتج إذا كان لديك
      image, 
      title, 
      selectedSize,
      price, 
      originalPrice,
    })}
    disabled={isAdding}
  >
    {cartItems.some((item) => item._id === title) ? (  // تحقق إذا كان المنتج في السلة
      <>
          <span>Le sticker a été ajouté au panier</span>  {/* النص عند إضافة المنتج */}

        <i className="pi pi-check-circle" style={{ color: "", marginLeft:"10px"}}></i> {/* أيقونة check-circle */}
      </>
    ) : isAdding ? (
      <i className="pi pi-spin pi-spinner"></i>  // أيقونة الانتظار أثناء إضافة المنتج
    ) : (
      

      <span> Ajouter au panier <i className="pi pi-shopping-cart" style={{ color: "", marginLeft:"10px"}}></i> </span> 
   
    )}
  </button>

  <div className="product-characteristics">
    <h2 style={{fontWeight:"800"}}>Caractéristiques du produit</h2>
    {/* <div className="rating">
      ★★★★★ <span>4.66 (1828 avis)</span>
    </div> */}
      <br />
    <div className="rating">
    ❤️ أطلق العنان لإبداعك وزيّن حاجاتك بستيكيرات فينيل مزيانة برشا


    </div>
    <br />
    <ul>
      <li>تصاميم شيك ومميزة باش تعطي لمسة شخصية لحاسوبك ،قرورات الماء، التليفونات، موتورات ،حتى بيتك</li>
      <li>سهلة في اللصق والتقليع، لصق وزين منغير تعب</li>
      <li>جودة عالية برشا، تقاوم الماء والخدوش، وتعيش معاك مدة طويلة.</li>
      <li>يعطي شكل راقي وجديد لحاجاتك.</li>
      <li>مصنوعة باحسن نوعية للناس الي تحب التفاصيل الفريدة</li>
    </ul>
  </div>
</div>



</div>


      {/* Displaying products in carousel */}
      <br /> <br /> <br /> <br /> <br />
      <h3 className="titrebeststick" style={{marginLeft:"30px"}}>Stickers similaires
      </h3>
      <br /> 
      <div className="bloc_carosel_product">
        <Carousel data-bs-theme="dark" interval={null}>
          {groupedStickers.map((products, groupIndex) => (
            <Carousel.Item key={groupIndex}>
              <div className="blocbeststick">
                <div className="stickres_bloc_page_home">
                  <div className="product-grid_page_home">
                    {products.map((sticker) => (
                      <div
                        key={sticker._id}
                        className="product-card_pagehome"
                        onClick={() => openProductPage(sticker)}
                      >
                        <Card className="product-card">
                          <div className="img-container">
                            <Card.Img className="img_stckres" src={sticker.image} />
                          </div>
                          <Card.Body>
                            <p className="truncat">{sticker.title}</p>
                            <br />
                            <br />
                            <Card.Text className="product-price">
                              <span className="original-price">
                                {sticker.originalPrice} DT
                              </span>
                              <span className="discounted-price">
                                {prix} DT
                              </span>
                              <button
    style={{
      backgroundColor: isAddingToCartId === sticker._id ? "gray" : "red", // لون رمادي عند تعطيله
      border: "black",
      position: "relative",
      top: "50px",
      color: isAddingToCartId === sticker._id ? "white" : "red", // تغيير لون النص عند التعطيل
      cursor: isAddingToCartId === sticker._id ? "not-allowed" : "pointer", // مؤشر مختلف عند تعطيله
    }}
    onClick={(e) => {
      e.stopPropagation();
      setIsAddingToCartId(sticker._id); // تعيين الحالة للعنصر الذي تم النقر عليه
      setTimeout(() => {
        setIsAddingToCartId(null); // إعادة الحالة بعد ثانية واحدة
        addToCart(sticker); // إضافة العنصر إلى السلة بعد ثانية
      }, 400); // بعد 1 ثانية
    }}
    disabled={isAddingToCartId === sticker._id} // تعطيل الزر إذا كان العنصر قيد التحميل
  >
    {cartItems.some((item) => item._id === sticker._id) ? (
      <i className="pi pi-check-circle iconcard" style={{ color: "#f7184c" }}></i> // أيقونة check-circle إذا كان العنصر في السلة
    ) : isAddingToCartId === sticker._id ? (
      <i className="pi pi-spin pi-spinner iconcard"></i> // أيقونة الانتظار أثناء النقر
    ) : (
      <i
        className="pi pi-shopping-cart iconcard"
        style={{
          color: "black", // اللون الافتراضي لأيقونة السلة
          cursor: "pointer",
        }}
      ></i> // أيقونة السلة إذا لم يتم النقر عليها
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
      </div>
      <br /> <br /> <br />   <br /> <br /> <br />
    </>
  );
};

export default ProductPage;
