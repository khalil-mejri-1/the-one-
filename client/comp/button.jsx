import React from 'react';
import './button.css';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const ButtonGroup = () => {
  const navigate = useNavigate();

  // عند النقر على زر، نقوم بالتنقل إلى صفحة "التسوق" مع تمرير الفئة عبر state
  const handleItemClick = (category) => {
    navigate("/shop", { state: { selectedCategory: category } });
  };

  return (
    <>
      <ScrollPanel style={{ width: '100%', height: '100px' }}>
        <div className='bloc-button'>
          <button className="category-button_navbar b1" onClick={() => handleItemClick("Naruto")}>Naruto</button>
          <button className="category-button_navbar b2" onClick={() => handleItemClick("One Piece")}>One Piece</button>
          <button className="category-button_navbar b3" onClick={() => handleItemClick("Art Numérique")}>Art Numérique </button>
          <button className="category-button_navbar b4" onClick={() => handleItemClick("Film")}>Film</button>
          <button className="category-button_navbar b5" onClick={() => handleItemClick("Viking")}>Viking</button>
          <button className="category-button_navbar b6" onClick={() => handleItemClick("Football")}>Football</button>
          <button className="category-button_navbar b7" onClick={() => handleItemClick("Hunter X Hunter")}>Hunter X Hunter</button>
          <button className="category-button_navbar b9" onClick={() => handleItemClick("Kimetsu")}>Kimetsu</button>
          <button className="category-button_navbar b11" onClick={() => handleItemClick("Death Note")}>Death Note</button>
        </div>
      </ScrollPanel>
    </>
  );
};

export default ButtonGroup;
