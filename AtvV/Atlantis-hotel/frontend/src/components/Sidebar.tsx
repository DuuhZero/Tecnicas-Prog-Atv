import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaBed, FaHotel, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: "/clientes", icon: <FaUsers className="text-lg" />, label: "Clientes" },
    { path: "/acomodacoes", icon: <FaBed className="text-lg" />, label: "Acomodações" },
    { path: "/hospedagens", icon: <FaHotel className="text-lg" />, label: "Hospedagens" },
    { path: "/checkin", icon: <FaSignInAlt className="text-lg" />, label: "Check-in" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 shadow-lg">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${location.pathname === item.path ? 'bg-gray-600 shadow-md' : 'hover:bg-gray-700 hover:shadow-md'}`}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium text-whitew">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}