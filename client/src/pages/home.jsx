import React, { useState, useEffect, createContext } from "react";
import Caroussel from "../../comp/carousel.jsx";
import Navbar from '../../comp/nav_bar.jsx';
import "./home.css";
import Offcanva from '../../comp/Offcanva.jsx';
import Beststick from './../../comp/besttick_pahehom.jsx';

// Context to share selected category between Home and Shop
export const CategoryContext = createContext();

const Home = () => {
    const [backtopbutton, setBacktopbutton] = useState(false);
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = sessionStorage.getItem("currentPage");
        return savedPage ? Number(savedPage) : 0;
      });
    
    const [selectedCategory, setSelectedCategory] = useState("defaultCategory"); // تعيين فئة مبدئية

    // تابع إضافة مستمع للتمرير لإظهار زر العودة إلى الأعلى
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setBacktopbutton(true);
            } else {
                setBacktopbutton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // تنظيف مستمع التمرير عند الخروج من الصفحة
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // دالة التمرير إلى أعلى الصفحة
    const scrollup = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // التعامل مع تغيير الفئة وإعادة تعيين الصفحة إلى 0
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        sessionStorage.setItem("selectedCategory", category);  // Save selected category to sessionStorage
        setCurrentPage(0); // Reset page to 0 when changing category
      };
    
    // عند النقر على زر أو إجراء آخر، إعادة تعيين الصفحة إلى 0

    return (
        <div>
            {/* زر العودة إلى الأعلى */}
            <div>
                {backtopbutton && (
                    <button type="button" className="button_up" onClick={scrollup}>
                        <i className="pi pi-angle-up" style={{ fontSize: '2rem', color: "white" }}></i>
                    </button>
                )}
            </div>

            {/* مكون Offcanva لعرض الفئات */}
            <Offcanva currentPage={currentPage} setSelectedCategory={handleCategoryChange} />

            {/* شريط التنقل */}
            <Navbar />
            
            {/* زر لتغيير الصفحة */}

            <br /> <br /> <br /> <br />
            <br />

            {/* الكاروسيل و أفضل المنتجات */}
            <Caroussel />
            <Beststick />
        </div>
    );
}

export default Home;
