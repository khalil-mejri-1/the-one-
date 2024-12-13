import React, { useState, useEffect } from "react";
import './admin.css';
import axios from "axios";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate, useLocation } from "react-router-dom";

const Admin = () => {
  //aaaaaa State hooks for form data
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState(0.6);
  const [originalPrice, setOriginalPrice] = useState(1);
  const [discount, setDiscount] = useState(25);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('naruto');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [stickers, setStickers] = useState([]);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedCategory } = location.state || {};


  useEffect(() => {
    fetchData(category);
  }, [category]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !imageUrl || !price || !title || !originalPrice || !discount) {
      setErrorMessage('جميع الحقول مطلوبة');
      return;
    }

    try {
      const response = await fetch(`https://the-one-opal.vercel.app/api/${category}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageUrl,
          price: parseFloat(price),
          title,
          originalPrice: parseFloat(originalPrice),
          discount: parseFloat(discount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('تمت إضافة العنصر بنجاح');
        setCategory('');
        setImageUrl('');
        setPrice('');
        setOriginalPrice('');
        setDiscount('');
        setTitle('');
        setErrorMessage('');
        window.location.reload();
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.message || 'حدث خطأ أثناء إضافة العنصر'}`);
      }
    } catch (error) {
      setErrorMessage('حدث خطأ أثناء إرسال البيانات إلى الخادم');
      console.error('Error:', error);
    }
  };

  // State for Offcanvas visibility and sub-category
  const [showMainOffcanvas, setShowMainOffcanvas] = useState(false);
  const [showSubOffcanvas, setShowSubOffcanvas] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [error, setError] = useState(null); // لعرض الأخطاء إذا كانت موجودة

  const toggleMainOffcanvas = () => setShowMainOffcanvas((prev) => !prev);
  const toggleSubOffcanvas = (category) => {
    setSubCategory(category);
    setShowSubOffcanvas(true);
    setShowMainOffcanvas(false);
  };

  const handleCategoryChange = (category) => {
    navigate("/admin", { state: { selectedCategory: category } });
    setShowSubOffcanvas(false);
    window.scrollTo(0, 0);
    setShowMainOffcanvas(false);

  };
  


  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);  // تحديد الفئة التي تم اختيارها
    }
  }, [selectedCategory]);
  
  useEffect(() => {
    fetchData(category); // تحميل المنتجات عند تغيير الفئة
  }, [category]);
  
  const fetchData = (category) => {
    if (!category) return; // تأكد من وجود الفئة
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
  

    // دالة حذف العنصر
   // دالة حذف العنصر
const handleRemove = async (_id, category) => {
    try {
      // إرسال طلب حذف باستخدام الـ category و الـ id في الرابط
      const response = await axios.delete(`https://the-one-opal.vercel.app/products/${category}/${_id}`);
      
      if (response.status === 200) {
        // بعد الحذف، نقوم بتحديث الواجهة بإزالة العنصر من القائمة
        setStickers((prevStickers) => prevStickers.filter(sticker => sticker._id !== _id));
      } else {
        console.error("Error deleting product:", response.data);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  
  const [clickedId, setClickedId] = useState(null);
  const [productErrors, setProductErrors] = useState({}); // لتخزين الأخطاء لكل منتج
  
  const checkIfProductExists = async (productId) => {
    try {
      const response = await fetch(`https://the-one-opal.vercel.app/check-product/${productId}`, {
        method: 'GET',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.exists);
        return data.exists;
      } else {
        console.error('Failed to check product.');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  };
  
  const addToDatabase = async (_id) => {
    setLoading(true);
    
    // تحقق إذا كان المنتج موجودًا بالفعل
    const productExists = await checkIfProductExists(_id);
    if (productExists) {
      setLoading(false);
      setProductErrors(prevErrors => ({
        ...prevErrors,
        [_id]: 'This product already exists in the database.',
      }));
      return;
    }
  
    try {
      const response = await fetch(`https://the-one-opal.vercel.app/add-product/${category}/${_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Product added successfully!');
        setClickedId(_id);
        setProductErrors(prevErrors => {
          const { [_id]: removed, ...rest } = prevErrors; // إزالة الخطأ في حال تم إضافة المنتج
          return rest;
        });
      } else {
        console.error('Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {/* Main Categories Button */}
        <div className="bloc_button_catg_navbar">
          <button onClick={toggleMainOffcanvas} className="button_catag_navbar">
            <i className="pi pi-align-center pi-align-center1 ">
              <span className="titre_button_catalg" style={{ marginLeft: "10px", position: "relative", top: "-2px" }}>
                Categories
              </span>
            </i>
          </button>
        </div>

        {/* Main Categories Offcanvas */}
        <Offcanvas show={showMainOffcanvas} onHide={toggleMainOffcanvas}>
          <Offcanvas.Header>
            <Offcanvas.Title>
              <div className="img_offcanves">
                <img alt="Categories" style={{ width: "100%", height: "100%" }} />
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
            {/* <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i> */}

            <button
              className="anime-item "
              onClick={() => handleCategoryChange("beststckres")}
            >
              best stickres
            </button>
          </li>
        <li>
            {/* <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i> */}

            <button
              className="anime-item "
              onClick={() => toggleSubOffcanvas("anime")}
            >
              Anime
            </button>
          </li>
          <li>
          <button
              className="anime-item"
              onClick={() => toggleSubOffcanvas("art")}
            >
              Art
            </button>
          </li>

          <li>
            <button
              className={`anime-item ${subCategory === "Fille" ? "selected" : ""}`}
              onClick={() =>{handleCategoryChange("Fille");   setShowMainOffcanvas(false)} 


               }
            >
              Fille
            </button>
          </li>

          <li>
            <button
              className="anime-item "
              onClick={() => toggleSubOffcanvas("Cartoon")}
            >
              Cartoon
            </button>
          </li>
      </ul>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Subcategories Offcanvas */}
        <Offcanvas show={showSubOffcanvas} onHide={() => setShowSubOffcanvas(false)} placement="start">
          <Offcanvas.Header>
            <Offcanvas.Title>
              <div className="img_offcanves">
                <img alt="Categories" style={{ width: "100%", height: "100%" }} />
              </div>
              <i
                className="pi pi-arrow-left "
                style={{ fontSize: '1.5rem', position: "absolute", color: "white", right: "20px", top: "25px", cursor: "pointer" }}
                onClick={() => {
                  setShowMainOffcanvas(true);
                  setShowSubOffcanvas(false);
                }}
              ></i>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          {subCategory === "anime" && (
          <ul>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Naruto" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Naruto")}
              >
                Naruto
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "One Piece" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("One Piece")}
              >
                One Piece
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Hunter X Hunter" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Hunter X Hunter")}
              >
                Hunter X Hunter
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Kimetsu" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Kimetsu")}
              >
                Kimetsu
              </button>
            </li>

            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Attack On Titan" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Attack On Titan")}
              >
                Attack On Titan
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Death Note" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Death Note")}
              >
                Death Note
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Jujutsu Kaisen" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Jujutsu Kaisen")}
              >
                Jujutsu Kaisen
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Detective Conan" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Detective Conan")}
              >
                Detective Conan
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Berserk" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Berserk")}
              >
                Berserk
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Vinland Saga" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Vinland Saga")}
              >
                Vinland Saga
              </button>
            </li>
          </ul>
        )}
        {subCategory === "art" && (
          <ul>
        
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Art Numérique" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Art Numérique")}
              >
                Art numérique
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Van Gogh" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Van Gogh")}
              >
                Van Gogh
              </button>
            </li>

            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === " Monalisa" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Monalisa ")}
              >
                Monalisa
              </button>
            </li>
          
          </ul>
        )}

{subCategory === "Cartoon" && (
          <ul>
        
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "SpongeBob" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("SpongeBob")}
              >
                SpongeBob
              </button>
            </li>
            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === "Van Gogh" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Van Gogh")}
              >
                Van Gogh
              </button>
            </li>

            <li>
              <i className="pi pi-angle-right" style={{ marginRight: "5px" }}></i>
              <button
                className={`anime-item ${subCategory === " Monalisa" ? "selected" : ""}`}
                onClick={() => handleCategoryChange("Monalisa ")}
              >
                Monalisa
              </button>
            </li>
          
          </ul>
        )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <div id="admin-container">
        <h1 id="admin-title">Admin Page</h1>

        {/* Error or success message */}
        {errorMessage && <p id="error-message">{errorMessage}</p>}
        {successMessage && <p id="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* Category selection */}
          <div>
            <label htmlFor="category">Category:</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {[
                 "Naruto", 
  "One Piece", 
  "Hunter X Hunter", 
  "Kimetsu", 
  "Attack On Titan", 
  "Death Note", 
  "Jujutsu Kaisen", 
  "Detective Conan", 
  "Berserk", 
  "Vinland Saga",

  "Monalisa",
  "Fille",
  "SpongeBob",
  "beststckres"


].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Other fields */}
          <div>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
          <div>
            <label htmlFor="originalPrice">Original Price:</label>
            <input
              type="number"
              id="originalPrice"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter original price"
            />
          </div>
          <div>
            <label htmlFor="discount">Discount:</label>
            <input
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount"
            />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>

          <button type="submit">Add Item</button>
        </form>

        {/* Product Cards */}
      
      </div>
<br /><br /><br /><br /><br /><br /><br /><br />



<div className="product-grid">
  {loading ? (
    <p>Loading...</p>
  ) : (
    stickers.map((sticker) => (
      <Card key={sticker.id} style={{ width: '15rem' }}>
        <Card.Img variant="top" src={sticker.image} />
        <Card.Body>
          <Card.Text>{sticker.description}</Card.Text>
          <div style={{display:'flex', gap:"10px"}}>

            <button
              onClick={() => handleRemove(sticker._id, category)}
              style={{
                padding:"5px",
                borderRadius:"10px",
                backgroundColor:"red",
                color:"wheat",
                border:"transparent solid",
                width:"100%"
              }}
            >
              Remove
            </button>

         

          </div>
        </Card.Body>
      </Card>
    ))
  )}
</div>
    </>
  );
};

export default Admin;
