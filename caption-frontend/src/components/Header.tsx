import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

type Props = {
  onOpenModal: (type: 'login' | 'signup') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const Header: React.FC<Props> = ({ onOpenModal, isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, { withCredentials: true });
    setIsAuthenticated(false);
  };
const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md">
      {/* rest of your JSX */}
       <div onClick={() => navigate("/")} className="text-2xl cursor-pointer font-bold text-gray-800">
        <span className="text-blue-500">caption</span>Gen
      </div>
      <div className="space-x-4">
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
    </header>
  );
};


export default Header;