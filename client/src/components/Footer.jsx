import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-100 py-4 text-center">
            <p>© {new Date().getFullYear()} Kaustubh Labs. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
