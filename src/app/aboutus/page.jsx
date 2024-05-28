import React from "react";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* About Us Section */}
      <div className="bg-black text-white py-10 px-6 md:px-20">
        <Link href="/" className="text-white ">
          Back to home
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold mt-6 md:mt-10">
          About{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Us
          </span>
        </h1>
        <p className="text-base md:text-lg mt-4 md:w-3/4">
          Welcome to Gamely, your ultimate destination for all things gaming!
          Founded in [2024], Gamely was born out of our passion for gaming and
          our desire to create a vibrant and inclusive community where gamers of
          all levels can come together to explore, connect, and elevate their
          gaming experiences.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="py-8 px-6 md:px-20">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Our Mission</h2>
        <p className="text-sm md:text-base">
          At Gamely, our mission is simple: to provide gamers with a one-stop
          destination for discovering and enjoying the latest games, while
          fostering a welcoming and supportive community that celebrates the
          diversity and creativity of the gaming world.
        </p>
      </div>

      {/* Values Section */}
      <div className="py-8 px-6 md:px-20">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Values</h2>
        <p className="text-sm md:text-base">At the heart of Gamely are our core values:</p>

        <ul className="list-disc pl-4 md:w-3/4">
          <li className="text-sm md:text-base my-2">
            <span className="font-medium">Authenticity</span>: We believe in providing gamers with genuine, high-quality products and experiences.
          </li>
          <li className="text-sm md:text-base my-2">
            <span className="font-medium">Exclusivity</span>: We strive to create a welcoming environment where everyone feels represented and valued.
          </li>
          <li className="text-sm md:text-base my-2">
            <span className="font-medium">Excellence</span>: We are committed to delivering exceptional customer service and exceeding expectations at every turn.
          </li>
          <li className="text-sm md:text-base my-2">
            <span className="font-medium">Innovation</span>: We embrace innovation and creativity, constantly seeking new ways to enhance the gaming experience for our community.
          </li>
        </ul>
      </div>

      {/* Why Choose Gamely Section */}
      <div className="py-8 px-6 md:px-20">
        <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Why Choose Gamely?</h2>
        <p className="text-sm md:text-base">What sets Gamely apart from other gaming marketplaces? It's simple:</p>

        <ul className="list-disc pl-4 md:w-3/4">
          <li className="text-sm md:text-base my-2">
            <span className="font-medium">Wide Selection</span>: With a vast collection of game keys and gaming accessories, Gamely offers something for every type of gamer.
          </li>
          <li className="text-sm md:text-base my-2">
            <span className="font-medium">Quality Assurance</span>: We source our products from trusted distributors and publishers, ensuring that you receive legitimate and fully functional game keys.
          </li>
          <li className="text-sm md:text-base my-2">
            <span className="font-medium">Community Focus</span>: Gamely isn't just a marketplace; it's a community. Join us to connect with fellow gamers, share experiences, and discover new adventures together.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
