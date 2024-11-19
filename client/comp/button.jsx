import React from 'react';
import './button.css';
      
import { ScrollPanel } from 'primereact/scrollpanel';


const ButtonGroup = () => {
  return (
<>
       
          
     <ScrollPanel style={{ width: '100%', height: '100px' }} >
                        
                               
        <div className='bloc-button'>
      
      <button className="category-button_navbar b1">luffy</button>
      <button className="category-button_navbar b2">zoro</button>
      <button className="category-button_navbar b3">art</button>
      <button className="category-button_navbar b4">film</button>
      <button className="category-button_navbar b5">vaking</button>
      <button className="category-button_navbar b6">foot</button>
      <button className="category-button_navbar b7">naruto</button>
      <button className="category-button_navbar b8">ninja</button>
      <button className="category-button_navbar b9">sharingane</button>
      <button className="category-button_navbar b10">hunter x hunter</button>
      <button className="category-button_navbar b11">anime</button>
      </div>   

                      
         </ScrollPanel>
                  
               
 

                 
      </>  
  );}
export default ButtonGroup;
