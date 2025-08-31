import React, { useState } from "react";
import { useRouter } from 'next/router';

const TestCard = ({ test }) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  const addToCart = () => {
    const existingCart = localStorage.getItem('cart');
    let cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    const existingItemIndex = cartItems.findIndex(item => item.id === test.id);
    
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
    } else {
      cartItems.push({ ...test, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cartItems));
    router.push('/cart');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-1.5 line-clamp-1">{test.name}</h3>
        <p className="text-sm text-gray-600 mb-2.5 line-clamp-2">{test.description}</p>
        
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center text-sm text-gray-600 shrink-0">
            <span className="whitespace-nowrap">{test.parameters} Parameters</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 shrink-0">
            <span className="whitespace-nowrap">Report in {test.reportTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-baseline gap-1.5 shrink-0">
            <span className="text-lg font-bold text-gray-900">₹{test.discountedPrice}</span>
            <span className="text-sm text-gray-500 line-through">₹{test.price}</span>
            {test.discount && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                {test.discount} OFF
              </span>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => setShowDetails(!showDetails)} 
              className="px-2.5 py-1.5 text-sm font-medium text-red-500 hover:text-red-600 border border-red-500 rounded hover:bg-red-50 whitespace-nowrap"
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
            <button 
              onClick={addToCart} 
              className="px-2.5 py-1.5 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 whitespace-nowrap"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2 text-sm">Package Includes:</h4>
            <ul className="space-y-1.5">
              <li className="flex items-center text-sm text-gray-600">
                <span>Home sample collection</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span>{test.parameters} test parameters</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span>Digital reports within {test.reportTime}</span>
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <span>Free doctor consultation</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCard; 