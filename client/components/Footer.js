// components/Footer.js
import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#f2f2f2',
    padding: '16px',
    textAlign: 'center',
  };

  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} Kaustubh Labs. All rights reserved.</p>
    </footer>
  );
}

export default Footer;