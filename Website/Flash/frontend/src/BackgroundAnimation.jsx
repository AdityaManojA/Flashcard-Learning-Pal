import React from 'react';
import './Styles.css'; // Import the CSS file containing the background animation styles

function BackgroundAnimation() {
  return (
    <div className="lines" style={{ zIndex: -1 }}> 
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>    
    </div>
  );
}

export default BackgroundAnimation;
