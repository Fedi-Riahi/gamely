"use client"
import React, { useContext } from 'react';
import Image from 'next/image';
import { Context } from '@/app/context/page';

function GiftCard({ gift }) {
  const { handleAddToCart } = useContext(Context);

  const addToCart = () => {
    handleAddToCart(gift);
    // Additional logic like notification or UI update can be added here
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden relative">
      <div className="relative">
        <div className="w-full h-full relative">
          <Image
            src={gift.productImage[0]}
            alt={gift.name}
            width={300}
            height={400}
            className="object-cover"
          />
          
        </div>
        <div className="flex flex-col absolute bottom-0 w-full bg-black bg-opacity-40 text-white p-4 backdrop-blur-md">
          <h2 className="text-lg font-medium mb-2 text-start">{gift.name}</h2>
          
          <span className="text-lg text-start">${gift.price} USD</span>
          <button
            onClick={addToCart}
            className="mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-700 hover:from-blue-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-2 px-8 rounded-tl-lg rounded-br-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GiftCard;
