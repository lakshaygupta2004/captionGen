import { useEffect, useState } from "react";
import AuthModal from "./components/AuthModal";
import Header from "./components/Header";
import Upload from "./components/Upload";
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from "react-router";
import EditPage from "./components/EditPage";
import ErrorPage from "./components/ErrorPage";
import Cookies from "js-cookie";

const App = () => {
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token"); // 'token' should match your cookie name
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">


      <ToastContainer />

      <Routes>
        <Route path="/" element={
          <>
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
              setIsAuthenticated={setIsAuthenticated}
            />
          </>
        } />

        <Route path="/uploads" element={<EditPage onOpenModal={setModalType}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}/>}/>

        <Route path="*" element={<ErrorPage />}/>
      </Routes>

    </div>
  );
};


export default App;