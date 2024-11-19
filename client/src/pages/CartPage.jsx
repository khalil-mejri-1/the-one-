import './cartpage.css';
import Navbar from "../../comp/nav_bar.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"; 
import Offcanva from "../../comp/Offcanva.jsx";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
  const [removingItemId, setRemovingItemId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  // إزالة عنصر من السلة
  const removeFromCart = (itemId) => {
    setRemovingItemId(itemId);
    setTimeout(() => {
      const updatedCart = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setRemovingItemId(null);
    }, 700);
  };

  // زيادة كمية عنصر في السلة
  const increaseQuantity = (itemId) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // تقليل كمية عنصر في السلة
  const decreaseQuantity = (itemId) => {
    const updatedCart = cartItems.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // تحميل عناصر السلة من التخزين المحلي عند التحميل
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      const parsedItems = JSON.parse(savedCartItems).map(item => ({
        ...item,
        quantity: typeof item.quantity === 'number' ? item.quantity : 1,
      }));
      setCartItems(parsedItems);
    }
  }, []);



  // فتح وإغلاق نافذة الفئات

  const handlePhoneChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    // تحقق من طول الرقم وتحديث الحالة
    setIsPhoneValid(value.length >= 8); // يجب أن يكون الطول 8 أو أكثر
};

const [name, setName] = useState('');
const [isNameValid, setIsNameValid] = useState(true);

const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
    // تحقق من أن المدخل يحتوي فقط على الأحرف
    setIsNameValid(/^[a-zA-Z\s]*$/.test(value)); // تحقق من أن المدخل يحتوي على الأحرف فقط
};
  return (
    <>
     

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
<Offcanva/>
 

      <div className="cart-container_panier">
        <div className="cart-discount_panier">
          <p>A 50% discount has been applied to small stickers.</p>
        </div>

        <div className='bloc_kemel'>
          <div className="cart-items_panier">
            {cartItems.map((item) => (
              <div className="cart-item_panier" key={item.id}>
                <img src={item.image} className="cart-item-image" alt={item.title} />
                <div className="cart-item-details">
                  <h3 className='paragraphe_cart'>{item.title}</h3>
                  <p>
                    <span className="original-price_panier">{item.originalPrice} DT</span>
                    <br /><br />
                    <span className="discounted-price_panier">{item.price} DT</span>
                  </p>
                  <button onClick={() => removeFromCart(item._id)} className="remove-button" disabled={removingItemId === item._id}>
                    {removingItemId === item._id ? (
                      <i className="pi pi-spinner pi-spin"></i> // أيقونة الانتظار
                    ) : (
                      <i className="pi pi-times"></i> // أيقونة الحذف
                    )}
                  </button>
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      <i className="pi pi-minus" style={{ fontSize: '1rem' }}></i>
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>
                      <i className="pi pi-plus" style={{ fontSize: '1rem' }}></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='bloc_input'>
          <TextField
    id="outlined-basic"
    label="Votre nom"
    variant="outlined"
    style={{ width: "100%" }}
    value={name}
    onChange={handleNameChange}
    error={!isNameValid} // استخدم حالة التحقق
    InputProps={{
        sx: {
            borderColor: !isNameValid ? 'red' : 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: !isNameValid ? 'red' : 'inherit',
            },
        },
    }}
/>
            <br /><br />
            <TextField
    type='number'
    id="outlined-basic"
    label="Numéro de téléphone"
    variant="outlined"
    style={{ width: "100%" }}
    value={phoneNumber}
    onChange={handlePhoneChange}
    error={!isPhoneValid} // استخدم حالة التحقق
    InputProps={{
        sx: {
            borderColor: !isPhoneValid ? 'red' : 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: !isPhoneValid ? 'red' : 'inherit',
            },
        },
    }}
/>

            <br /><br />
            <Button variant="contained" style={{ width: "100%", backgroundColor: "#FF416C", height: "50px" }}>
              Achat <i className="pi pi-cart-arrow-down" style={{ fontSize: "1.5em" }}></i>
            </Button>
            <br /><br /><br />
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
