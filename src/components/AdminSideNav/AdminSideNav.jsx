import Link from "next/link";

const AdminSidenav = ({ handleShowDashboard, handleShowProducts, handleShowFeaturedProducts, handleShowNews, handleShowUsers, handleShowOrders, handleShowAdmins }) => {
  return (
    <nav className="bg-black/90 w-1/5 min-h-screen p-4 flex flex-col justify-start">
      <ul className="flex flex-col items-center w-full">
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowDashboard();
            }}
            className="block text-white hover:bg-gray-700 py-3 px-4 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowProducts();
            }}
            className="block text-white hover:bg-gray-700 py-3 px-4 rounded"
          >
            Products
          </Link>
        </li>
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowFeaturedProducts();
            }}
            className="block text-white hover:bg-gray-700 py-3 px-4 rounded"
          >
            Featured Products
          </Link>
        </li>
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowNews();
            }}
            className="block text-white hover:bg-gray-700 py-3 px-4 rounded"
          >
            News
          </Link>
        </li>
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowUsers();
            }}
            className="block text-white hover:bg-gray-700 py-3 px-4 rounded"
          >
            Users
          </Link>
        </li>
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowOrders();
            }}
            className="block text-white hover:bg-gray-700 py-3 px-4 rounded"
          >
            Orders
          </Link>
        </li>
        <li className="w-full my-4">
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleShowAdmins();
            }}
            className="block text-white hover:bg-gray-700 py-3 px-4 rounded"
          >
            Admins
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidenav;
