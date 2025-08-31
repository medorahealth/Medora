import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function CartPanel({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const { data: session } = useSession();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.discountedPrice * (item.quantity || 1)), 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => 
      total + ((item.price - item.discountedPrice) * (item.quantity || 1)), 0
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-500">Your cart is empty</p>
                <Link 
                  href="/" 
                  onClick={onClose}
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-blue-600">₹{item.discountedPrice}</span>
                        {item.price !== item.discountedPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{item.price}</span>
                        )}
                        {item.price !== item.discountedPrice && (
                          <span className="text-xs text-green-600 font-semibold">
                            {Math.round(((item.price - item.discountedPrice) / item.price) * 100)}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{item.quantity || 1}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal ({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} items)</span>
                  <span>₹{cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-₹{calculateDiscount()}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total Amount</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
              <Link
                href={session ? "/checkout" : "/login?callbackUrl=/checkout"}
                onClick={onClose}
                className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Proceed to Checkout
              </Link>
              {!session && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Please <Link href="/login" className="text-blue-600 hover:text-blue-800">login</Link> to continue
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 