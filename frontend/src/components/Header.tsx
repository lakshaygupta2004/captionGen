import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react'; // install lucide-react for icons or use any other icon lib

type Props = {
  onOpenModal: (type: 'login' | 'signup') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const Header: React.FC<Props> = ({ onOpenModal, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, { withCredentials: true });
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md relative">
      <div onClick={() => navigate("/")} className="text-2xl cursor-pointer font-bold text-gray-800">
        <span className="text-blue-500">caption</span>Gen
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="bg-red-200 px-4 py-1 rounded-full text-sm">
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => onOpenModal('login')} className="text-sm cursor-pointer">Log in</button>
            <button onClick={() => onOpenModal('signup')} className="bg-gray-200 px-4 py-1 rounded-full text-sm cursor-pointer">
              Sign up
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="absolute top-full right-0 w-full bg-white shadow-md flex flex-col items-end px-6 py-4 space-y-2 md:hidden z-50">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-200 px-4 py-1 rounded-full text-sm w-full text-right">
              Logout
            </button>
          ) : (
            <>
              <button onClick={() => onOpenModal('login')} className="text-sm w-full text-center">Log in</button>
              <button onClick={() => onOpenModal('signup')} className="bg-gray-200 px-4 py-1 rounded-full text-sm w-full text-center">
                Sign up
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;