"use client"
import React, { useState, useEffect } from 'react';

const PlatformFilter = ({ selectedPlatforms = [], onChange }) => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch platforms");
        }
        const data = await response.json();
        const allPlatforms = data.products.map(product => product.platform);
        const uniquePlatforms = Array.from(new Set(allPlatforms));
        setPlatforms(uniquePlatforms);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
  }, []);

  const handlePlatformChange = (event, platform) => {
    const isChecked = event.target.checked;
    const updatedPlatforms = isChecked
      ? [...selectedPlatforms, platform]
      : selectedPlatforms.filter(plat => plat !== platform);
    onChange(updatedPlatforms);
  };

  return (
    <div> 
      <ul className="flex flex-col items-start justify-center gap-2">
        {platforms.map((platform, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`platform-${index}`}
              value={platform}
              checked={selectedPlatforms.includes(platform)}
              onChange={(event) => handlePlatformChange(event, platform)}
              className="hidden"
            />
            <label
              htmlFor={`platform-${index}`}
              className={`inline-flex text-sm items-center w-full p-2 font-normal text-gray-900 cursor-pointer `}
              style={{ width: '100%' }} // Set width to 100% for the label container
            >
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform)}
                onChange={(event) => handlePlatformChange(event, platform)}
                className="accent-gray-800 w-6 h-6 text-white border-gray-300 rounded   mr-2 peer peer-checked:bg-gray-500 peer-checked:text-gray-900"
              />
              <span className="text-md font-medium">{platform}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlatformFilter;
