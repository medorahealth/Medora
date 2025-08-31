import React, { useState, useEffect } from 'react';
import CartPanel from './CartPanel.jsx';

export default function Navbar() {
    const [session, setSession] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        // Load cart items from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }

        // Check for session (simplified for now)
        const checkSession = async () => {
            try {
                const response = await fetch('/auth/session');
                if (response.ok) {
                    const sessionData = await response.json();
                    setSession(sessionData.user ? sessionData : null);
                }
            } catch (error) {
                console.log('No session found');
            }
        };
        checkSession();
    }, []);

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedCart = cartItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeFromCart = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const signOut = async () => {
        try {
            await fetch('/auth/signout', { method: 'POST' });
            setSession(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <>
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <a href="/" className="text-xl font-bold text-blue-600">
                            Lab Test Website
                        </a>

                        <div className="flex items-center space-x-4">
                            <a href="/" className="text-gray-600 hover:text-gray-900">
                                Home
                            </a>
                            <a href="/women-health" className="text-gray-600 hover:text-gray-900">
                                Women Health
                            </a>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative text-gray-600 hover:text-gray-900"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
                                    </span>
                                )}
                            </button>
                            {session ? (
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                                        <span>{session.user.name}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                                        <button
                                            onClick={signOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <a
                                    href="/login"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Login
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <CartPanel
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />
        </>
    );
}
