import './cartpage.css';
import Navbar from "../../comp/nav_bar.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"; 
import Offcanva from "../../comp/Offcanva.jsx";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialCartItems = location.state?.cartItems || [];
  const [cartItems, setCartItems] = useState(
    initialCartItems.map(item => ({
      ...item,
      quantity: typeof item.quantity === 'number' ? item.quantity : 1,
    }))
  );

  const [products, setProducts] = useState([]); // حالة المنتجات

  const [removingItemId, setRemovingItemId] = useState(null);
  const [tlf, setPhoneNumber] = useState('');
  const [nom, setName] = useState('');

  const [isNameValid, setIsNameValid] = useState(true);



  const [errorMessage, setErrorMessage] = useState('');
  const [vraisMessage, setVraisMessage] = useState(false);
  const [confermation, setconfermation] = useState(false);



  const [nb, setNb] = useState(() => {
    const storedNb = localStorage.getItem('randomNumber');
    if (storedNb) {
      return parseInt(storedNb, 10);
    } else {
      const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
      localStorage.setItem('randomNumber', randomNumber.toString());
      return randomNumber;
    }
  });

 

  const [selectedCategory, setSelectedCategory] = useState("defaultCategory"); // تعيين فئة مبدئية
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    return savedPage ? Number(savedPage) : 0;
  });
  
  const [isPhoneValid, setIsPhoneValid] = useState(true);
const[isremove,setIsRemove]=useState(false)
// إزالة عنصر من السلة













  const handleClose = () => {
    setVraisMessage(false); // إخفاء الرسالة عند النقر على أيقونة الإغلاق
  
  };

  const handleClose2 = () => {
    setconfermation(false); // إخفاء الرسالة عند النقر على أيقونة الإغلاق
  
  };








// إزالة عنصر من السلة
const removeFromCart = (productId) => {
  // تحديث حالة السلة بعد إزالة المنتج
  setCartItems(prevCartItems => {
    const updatedCartItems = prevCartItems.filter(item => item._id !== productId);
    
    // تحديث الـ localStorage بعد التحديث في السلة
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    return updatedCartItems;  // إعادة السلة المحدثة
  });

  // تحديث الـ addedProductIds (في حالة الحاجة)
  setAddedProductIds(prevAddedProductIds => {
    const updatedAddedProductIds = prevAddedProductIds.filter(id => id !== productId);
    
    // تحديث الـ localStorage بعد تحديث قائمة الـ addedProductIds
    localStorage.setItem('addedProductIds', JSON.stringify(updatedAddedProductIds));

    return updatedAddedProductIds;  // إعادة القائمة المحدثة
  });
};


const handlepen2 = async () => {
  setVraisMessage(true); // إخفاء الرسالة عند النقر على أيقونة الإغلاق
  setconfermation(false); // إخفاء الرسالة عند النقر على أيقونة الإغلاق

  // تجهيز البيانات لإرسالها مع تضمين الحجم
  const cartData = cartItems.map(item => ({
    id: item.id || item._id,  // تأكد من وجود الحقل id أو _id
    quantity: item.quantity || 1, // تأكد من وجود الكمية، وإذا كانت مفقودة يتم تعيينها كـ 1
    category: item.category || selectedCategory,  // إضافة فئة المنتج الخاصة به
    size: item.size || "6 cm",  // تأكد من أن كل عنصر يحتوي على الحجم المختار، وإذا لم يكن موجودًا، يتم تعيينه كـ "6 cm" افتراضيًا
  }));

  const data = {
    nom: nom,  // الاسم
    tlf: tlf,
    nb: nb,  // رقم الهاتف
    ids: cartData, // بيانات السلة مع الفئات والأحجام
  };

  console.log('Sending data:', data); // عرض البيانات المرسلة للتأكد

  try {
    const response = await axios.post('https://the-one-opal.vercel.app/commands', data);
    console.log('Data sent successfully:', response.data);
    setErrorMessage(''); // إزالة رسالة الخطأ إذا نجحت العملية

    // تحديث قيمة nb في الواجهة باستخدام القيمة المحدثة
    const updatedNb = response.data.nb;
    setNb(updatedNb);  // افترض أن لديك state مخصص لعدد الطلبات (nb)

    // حفظ القيمة الجديدة في localStorage
    localStorage.setItem('nb', updatedNb); // تخزين القيمة الجديدة في localStorage

  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      setErrorMessage(`Error: ${error.response.status} - ${error.response.data.message}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      setErrorMessage('لم يتم استلام استجابة من الخادم');
    } else {
      console.error('Request error:', error.message);
      setErrorMessage(`Request Error: ${error.message}`);
    }
  }
};

const sizePrices = {
  "6 cm": 0.6-1,  // السعر لقياس 6 سم
  "8 cm": 0.9-1,  // السعر لقياس 8 سم
  "10 cm": 1.4-1, // السعر لقياس 10 سم
  "12 cm": 1.8-1  // السعر لقياس 12 سم
};

const sizeOldPrices = {
  "6 cm": 1,  // السعر القديم لقياس 6 سم
  "8 cm": 15,  // السعر القديم لقياس 8 سم
  "10 cm": 2,  // السعر القديم لقياس 10 سم
  "12 cm": 2.5 // السعر القديم لقياس 12 سم
};

// التعامل مع اختيار الحجم
const handleSizeSelect = (itemId, size) => {
  const updatedCartItems = cartItems.map((item) => {
    if (item._id === itemId) {
      const additionalPrice = sizePrices[size] || 0; // السعر الإضافي بناءً على الحجم
      const oldPrice = sizeOldPrices[size] || item.originalPrice; // إذا كان الحجم المختار موجودًا، استخدم السعر القديم، إذا لا استخدم السعر الأصلي
      const newPrice = item.originalPrice + additionalPrice; // السعر الجديد بناءً على الحجم
      return { ...item, size: size, price: newPrice, oldPrice: oldPrice }; // إضافة السعر القديم والجديد
    }
    return item;
  });

  // تحديث السلة بعد اختيار الحجم
  setCartItems(updatedCartItems);

  // تخزين السلة في localStorage
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};




// عند تحميل الصفحة أو تهيئة الكومبوننت
useEffect(() => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
  
  if (storedCartItems) {
    setCartItems(storedCartItems); // تعيين السلة من البيانات المخزنة في localStorage
  }
}, []);



const handleSubmit = (newProducts) => {
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // التحقق من أن رقم الهاتف يحتوي فقط على أرقام
  if (!/^\d+$/.test(tlf) || tlf.length !== 8) {
    setconfermation(false); // إيقاف التأكيد إذا كان رقم الهاتف يحتوي على شيء غير الأرقام أو لا يتكون من 8 أرقام
    return;
  }
  if (!/^[a-zA-Z\s\u0600-\u06FF]+$/.test(nom)) {
    setconfermation(false); // إيقاف التأكيد إذا كان الاسم يحتوي على أي شيء غير الأحرف العربية أو الإنجليزية
    return;
  }

  if (!nom.trim() || !tlf.trim()) {
    setErrorMessage("لازم تكتب اسمك ونومرو تليفونك");
    setconfermation(false);
    return;
  }
  
  if (totalQuantity === 0) {
    setErrorMessage("السلة فارغة . لازم تختار ستيكرز");
    setconfermation(false);
    return;
  }

  // إنشاء رقم عشوائي مكون من 5 أرقام
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // قيمة عشوائية بين 10000 و 99999

  // تعيين رقم عشوائي في بيانات الطلب
  const orderData = {
    nom: nom,
    tlf: tlf,
    nb: randomNumber,  // إضافة الرقم العشوائي هنا
    ids: newProducts.map(product => ({
      id: product.id,
      quantity: product.quantity,
      category: product.category,
      size: product.size,  // إرسال الحجم مع كل منتج
    })),
  };

  console.log('Order Data:', orderData);  // للتحقق من البيانات قبل الإرسال

  setErrorMessage("");
  setconfermation(true);
  setVraisMessage(false);
  setProducts(newProducts);  // إعداد المنتجات الجديدة

  // هنا يمكنك إرسال `orderData` إلى الخادم عبر `axios` أو أي طريقة أخرى
};






  // فتح وإغلاق نافذة الفئات

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    // تحقق من طول الرقم وتحديث الحالة
    setIsPhoneValid(value.length === 8); // يجب أن يكون الطول 8 أو أكثر
};


const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    // تحقق من أن المدخل يحتوي فقط على الأحرف
    setIsNameValid(/^[a-zA-Z\s\u0600-\u06FF]+$/.test(value)); // تحقق من أن المدخل يحتوي على الأحرف العربية والإنجليزية فقط
  };

  

const handleCategoryChange = (category) => {
  setSelectedCategory(category);
  setCurrentPage(0); // إعادة تعيين الصفحة إلى 0 عند تغيير الفئة
};

// عند تحميل الصفحة، استرجاع المنتجات من localStorage
useEffect(() => {
  const storedProducts = JSON.parse(localStorage.getItem("prevProducts")) || [];
  setProducts(storedProducts); // ضبط الحالة عند بدء التشغيل
}, []);


  const removeAllStickers = () => {
    setIsRemove(true)
    setTimeout(() => {
      // إفراغ السلة (إزالة جميع العناصر)
      setCartItems([]); // تعيين السلة كقائمة فارغة
      localStorage.setItem('cartItems', JSON.stringify([])); // تحديث الـ localStorage بالقائمة الفارغة
      setRemovingItemId(null); // إعادة تعيين ID العنصر الذي يتم إزالته إذا كان هناك عنصر يتم حذفه
      setIsRemove(false)
    }, 700);
  };
  


  // جلب البيانات من localStorage إذا كانت موجودة
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);



  // إضافة كل المنتجات إلى السلة ولكن فقط المنتجات غير الموجودة بالفعل

  const [addedProductIds, setAddedProductIds] = useState([]);  // لتتبع المنتجات التي تم إضافتها مسبقًا



  // تحميل السلة من localStorage عند التحميل الأول للتطبيق
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      // إذا كانت الكمية غير موجودة، يتم تعيينها إلى 1
      const parsedCart = JSON.parse(savedCart).map((item) => ({
        ...item,
        quantity: item.quantity || 1, // الكمية الافتراضية 1
      }));
      setCartItems(parsedCart);
    }
  }, []);

  // دالة لزيادة الكمية
  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // دالة لتقليل الكمية
  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map((item) =>
      item._id === itemId && (item.quantity || 1) > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };


  const [totalPrice, setTotalPrice] = useState(0);

  // استخدام useEffect لحساب السعر الإجمالي عند تغيير عناصر السلة
  useEffect(() => {
    calculateTotalPrice(); // حساب الإجمالي كلما تغيرت السلة
  }, [cartItems]);

    // حساب السعر الإجمالي
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity); // ضرب السعر في الكمية
      }, 0);
      setTotalPrice(total); // تعيين الإجمالي
    };

  return (
    <>

 
{confermation && (
        <div className="alertpanier">
           <span className="souel">متاكد تحب تعدي الكوموند  </span>
 
 <div className='bloc_buttonconferm'>
            <Button label="Submit"  className='button_conf' onClick={handlepen2}>envoiyer</Button> 
             <Button label="anuller"  className='button_conf' onClick={handleClose2}>annuler</Button>
 
             </div>  
        </div>
      )}



{vraisMessage && (
        <div className="alertpanier">
          <span className="titresuccses">
            <i
              className="pi pi-times buttonclase"
              style={{
                fontSize: '20px',
                marginLeft: '30px',
                position: 'relative',
                float: 'right',
                top: '-2px',
              }}
              onClick={handleClose}
            ></i>
            <div style={{ border: 'black solid 0px' }}></div>
            <span style={{ marginLeft: '10px' }}>
              <div>
                <i className="pi pi-check"></i>
                الكموند متاعك وصلتلنا شوي وقت ونكلموك . شكرا على ثيقتك فينا ❤️
                <br />
                <br />
                Id de commande : {nb}
              </div>
            </span>
          </span>
        </div>
      )}

     <div className="bloc_button_card">
        <div className="pi pi-shop shopicon_navbar" onClick={() => navigate('/cart', { state: { cartItems } })}>
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

      <Navbar />
      <Offcanva currentPage={currentPage} setSelectedCategory={handleCategoryChange} />
 

      <div className="cart-container_panier">
  <div className="cart-discount_panier">
    <p>A 50% discount has been applied to small stickers.</p>
  </div>
  
  <br /><br /><br /><br />
  
  <div className="bloc_kemel">
      <div className="cart-items_panier">
     

      <div className="bloc_all_cart">
  <div>
    <br />
    {cartItems.length === 0 ? (
      <div className="empty-cart-message">
        <p>Votre panier est vide.</p>
      </div>
    ) : (
      <div className="cart-items_panier">
        <br /><br />
        <p className="votrestickers">votre stickers :</p>
        <button className="button_remove-all" onClick={removeAllStickers}>
          <span className='Supprimertout'>Supprimer tout</span>
          {isremove ? (
            <i className="pi pi-spinner pi-spin spin_card"></i>
          ) : (
            <i className="pi pi-times-circle"></i>
          )}
        </button>
        {cartItems.map((item) => (
          <div className="cart-item_panier" key={item._id}>
                <button
                onClick={() => removeFromCart(item._id)}
                className="remove-button"
                disabled={removingItemId === item._id}
              >
                {removingItemId === item._id ? (
                  <i className="pi pi-spinner pi-spin"></i>
                ) : (
                  <i className="pi pi-times"></i>
                )}
              </button>
            <img
              src={item.image}
              className="cart-item-image"
              alt={item.title}
            />
          <div className="cart-item-details">
  <h3 className="paragraphe_cart">{item.title}</h3>
  <div className="bloc_size">
    <p style={{ fontSize: "15px", fontWeight: "700" }}>Size :</p>
   
   



    <button 
      className="button_size" 
      onClick={() => handleSizeSelect(item._id, "6 cm")}
      style={{ backgroundColor: item.size === "6 cm" || !item.size ? "#ccc" : "" }}
    >
      6 cm
    </button>
    
    <button 
      className="button_size" 
      onClick={() => handleSizeSelect(item._id, "8 cm")}
      style={{ backgroundColor: item.size === "8 cm" ? "#ccc" : "" }}
    >
      8 cm
    </button>
    
    <button 
      className="button_size" 
      onClick={() => handleSizeSelect(item._id, "10 cm")}
      style={{ backgroundColor: item.size === "10 cm" ? "#ccc" : "" }}
    >
      10 cm
    </button>
    
    <button 
      className="button_size" 
      onClick={() => handleSizeSelect(item._id, "12 cm")}
      style={{ backgroundColor: item.size === "12 cm" ? "#ccc" : "" }}
    >
      12 cm
    </button>
  </div>
  
  <p style={{ marginRight: "0px", position: "relative", top: "-0px" }}>
    <span className="original-price_panier">{item.originalPrice} DT</span>
    <br /><br />
    <span className="discounted-price_panier">{item.price} DT</span> {/* عرض السعر الجديد */}
  </p>
  
  <div key={item._id} className="quantity-control">
    <button onClick={() => decreaseQuantity(item._id)}>
      <i className="pi pi-minus" style={{ fontSize: "1rem" }}></i>
    </button>
    <span>{item.quantity || 0}</span>
    <button onClick={() => increaseQuantity(item._id)}>
      <i className="pi pi-plus" style={{ fontSize: "1rem" }}></i>
    </button>
  </div>
</div>

          </div>

        ))}
      </div>
    )}
  </div>
</div>

      </div>

      <div className="bloc_input">
        <p className='infoclient' >Information de client : </p>
        {/* مدخل الاسم */}
        <TextField
          id="outlined-basic"
          label="Votre nom"
          variant="outlined"
          style={{ width: '100%' }}
          value={nom}
          onChange={handleNameChange}
          error={!isNameValid}
          helperText={isNameValid ? '' : 'الاسم لازم يحتوي على حروف فقط'}
          InputProps={{
            sx: {
              borderColor: !isNameValid ? 'red' : 'inherit',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: !isNameValid ? 'red' : 'inherit',
              },
            },
          }}
        />
        <br />
        <br />
        {/* مدخل رقم الهاتف */}
        <TextField
          type="number"
          id="outlined-basic"
          label="Numéro de téléphone"
          variant="outlined"
          style={{ width: '100%' }}
          value={tlf}
          onChange={handlePhoneChange}
          error={!isPhoneValid}
          helperText={isPhoneValid ? '' : 'رقم الهاتف لازم  يتكون من 8 أرقام'}
          InputProps={{
            sx: {
              borderColor: !isPhoneValid ? 'red' : 'inherit',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: !isPhoneValid ? 'red' : 'inherit',
              },
            },
          }}
        />
        <br />
        <br />

        {/* عرض رسالة الخطأ إذا كانت موجودة */}
        {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}

        {/* زر الإرسال */}
        <Button
          variant="contained"
          style={{ width: '100%', backgroundColor: '#FF416C', height: '50px' }}
          onClick={() =>
            handleSubmit([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }])
          }
        >
          Achat <i className="pi pi-cart-arrow-down" style={{ fontSize: '1.5em' }}></i>
        </Button>
        <br />
       
        <br />
        <p></p>
        <p className='total_price'>Prix total : <span className='pricedt'>{totalPrice.toFixed(2)} DT</span></p>


        <br />
        <br />
        <br />
      </div>

    </div>


    </div>


      <div className="bloc_footer2">
        <div className="pi pi-shop shopicon_footer2" >
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

export default Cart;
