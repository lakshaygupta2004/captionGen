import { useState } from "react";
import AuthModal from "./components/AuthModal";
import Header from "./components/Header";
import Upload from "./components/Upload";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // <--- Add this

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ToastContainer />
      <Header
        onOpenModal={setModalType}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Upload />
      <AuthModal
        type={modalType}
        onOpenModal={setModalType}
        onClose={() => setModalType(null)}
        setIsAuthenticated={setIsAuthenticated} // <--- Pass it here
      />
    </div>
  );
};


export default App;