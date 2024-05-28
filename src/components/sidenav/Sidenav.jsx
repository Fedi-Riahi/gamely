import Link from "next/link";

const Sidenav = ({ handleShowWishlist, handleShowSellerProducts, handleShowOrders }) => {
  return (
    <nav className="bg-black/90 w-1/5 min-h-screen p-4 flex flex-col justify-start">
      <ul className="flex flex-col items-center w-full">
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowSellerProducts();
            }}
            className="block text-white hover:bg-black/30 py-3 px-4 rounded"
          >
            Products
          </Link>
        </li>
        <li className="w-full">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowWishlist();
            }}
            className="block text-white hover:bg-black/30 py-3 px-4 rounded"
          >
            Wishlist
          </Link>
        </li>
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowOrders();
            }}
            className="block text-white hover:bg-black/30 py-3 px-4 rounded"
          >
            Orders
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
