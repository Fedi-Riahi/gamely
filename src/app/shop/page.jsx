"use client"
import React, { useState, useEffect } from 'react';
import GiftCard from '@/components/giftCard/GiftCard';
import PlatformFilter from '@/components/platformFilter/PlatformFilter'; // Import PlatformFilter component
import Link from 'next/link';
import Intro from '@/components/intro/Intro';

function GiftCardListings() {
  const [gifts, setGifts] = useState([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState([]); // State for selected platforms
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedGifts, setDisplayedGifts] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch('/api/product');
        if (!response.ok) {
          throw new Error('Failed to fetch gifts');
        }
        const data = await response.json();
        setGifts(data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);


  const handlePlatformFilterChange = (selectedPlatforms) => { // Handle platform filter change
    setFilteredPlatforms(selectedPlatforms);
  };

  const loadMoreGifts = () => {
    setDisplayedGifts(prev => prev + 6);
    const giftListContainer = document.getElementById('gift-list-container');
    if (giftListContainer) {
      giftListContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="my-28 bg-white w-full">
      <Intro />
      <div className="md:px-40 sm:px-5 w-full">
        <div className="flex items-center justify-between w-full mt-4 mb-5 md:px-40 sm:px-5">
          <div className="flex flex-col gap-1 w-2/5">
            <button
              className="block md:hidden bg-zinc text-white py-2 px-4"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </button>
          </div>
        </div>
        {showFilters && (
          <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Filters</h2>
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 mt-4">Platforms</h3> {/* Add platforms filter */}
                <PlatformFilter
                  selectedPlatforms={filteredPlatforms}
                  onChange={handlePlatformFilterChange}
                />
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="bg-zinc text-white py-2 px-4 mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex items-start justify-between mx-auto my-20 gap-5">
          <div className="hidden md:block w-1/4">
            <div className="bg-white mb-2">
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2">Platform</h3>
                <PlatformFilter
                  selectedPlatforms={filteredPlatforms}
                  onChange={handlePlatformFilterChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-center flex-col mb-40" id="gift-list-container">
            <div className="grid md:grid-cols-4 grid-cols-1 gap-5 w-full">
              {gifts
                .filter(gift =>
                  
                  (filteredPlatforms.length === 0 || filteredPlatforms.includes(gift.platform))) // Filter gifts by category and platform
                .slice(0, displayedGifts)
                .map(gift => (
                  <Link key={gift._id} href={`/product/${gift._id}`}>
                    <GiftCard gift={gift} />
                  </Link>
                ))}
            </div>
            {displayedGifts < gifts.length && (
              <button className="bg-zinc text-white py-2 px-4 mt-4" onClick={loadMoreGifts}>
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCardListings;
