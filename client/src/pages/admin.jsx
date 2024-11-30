import React, { useState } from 'react';
import './admin.css';

const Admin = () => {
    // حالة لتخزين القيم المدخلة
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState(0.6);
    const [originalPrice, setOriginalPrice] = useState(1);
    const [discount, setDiscount] = useState(25);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('naruto'); // إضافة الفئة الافتراضية
    const [errorMessage, setErrorMessage] = useState(''); // لإظهار الأخطاء للمستخدم
    const [successMessage, setSuccessMessage] = useState(''); // لإظهار النجاح

    // دالة للتعامل مع إرسال النموذج
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // التأكد من أن جميع الحقول ليست فارغة
        if (!imageUrl || !price || !title || !originalPrice || !discount) {
            setErrorMessage('جميع الحقول مطلوبة');
            return; // عدم إرسال البيانات إذا كانت هناك حقول فارغة
        }
    
        try {
            const response = await fetch(`https://the-one-opal.vercel.app/api/kimetsu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                setImageUrl('');
                setPrice('');
                setOriginalPrice('');
                setDiscount('');
                setTitle('');
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(`Error: ${errorData.message || 'حدث خطأ أثناء إضافة العنصر'}`);
            }
        } catch (error) {
            setErrorMessage('حدث خطأ أثناء إرسال البيانات إلى الخادم');
            console.error('Error:', error);
        }
    };
    

    return (
        <div>
            <h1>Admin Page</h1>

            {/* عرض رسالة الخطأ أو النجاح */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                {/* حقل اختيار الفئة */}
                <div>
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="naruto">Naruto</option>
                        <option value="onepiece">One Piece</option>
                        <option value="hxh">Hunter x Hunter</option>
                        <option value="bleach">Bleach</option>
                        {/* إضافة فئات أخرى حسب الحاجة */}
                    </select>
                </div>

                {/* الحقول الأخرى */}
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Admin;
