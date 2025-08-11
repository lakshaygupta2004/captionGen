import { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

type Props = {
  type: 'login' | 'signup' | null;
  onOpenModal: (type: 'login' | 'signup') => void;
  onClose: () => void;
  setIsAuthenticated: (val: boolean) => void; // ✅ this is correct
};


export default function AuthModal({  type, onOpenModal, onClose, setIsAuthenticated }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint =
        type === 'signup'
          ? `${import.meta.env.VITE_BASE_URL}/auth/register`
          : `${import.meta.env.VITE_BASE_URL}/auth/login`;

      const response = await axios.post(
        endpoint,
        { username: userName, password },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Success");

      setuserName('');
      setPassword('');
      if (type == 'signup') {
        onOpenModal('login');
      } else {
        setIsAuthenticated(true); 
        setTimeout(() => onClose(), 1000);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (type && modalRef.current) {
      modalRef.current.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [type]);

  if (!type) return null;

  return (
    <dialog
      ref={modalRef}
      id="auth_modal"
      className="modal transition-opacity duration-300 relative"
      onClose={onClose}
    >
      <div className="modal-box w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-xl shadow-2xl border border-gray-700">
        <h3 className="font-extrabold text-3xl text-center capitalize mb-6">
          {type === 'login' ? 'Log In' : 'Sign Up'} to your account
        </h3>

        <form className="form-control flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="Enter your Username"
            className="input input-bordered w-full bg-gray-800 border-gray-600 placeholder-gray-400 text-white shadow-inner"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="input input-bordered w-full bg-gray-800 border-gray-600 placeholder-gray-400 text-white shadow-inner"
          />

          <button
            type="submit"
            className="btn btn-primary w-full hover:scale-[1.02] transition-transform"
          >
            {type === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-sm mt-6 opacity-70">
          {type === 'login' ? (
            <p>
              Don’t have an account?{' '}
              <button
                className="text-blue-400 hover:underline"
                onClick={() => onOpenModal('signup')}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                className="text-blue-400 hover:underline"
                onClick={() => onOpenModal('login')}
              >
                Log in
              </button>
            </p>
          )}

        </div>

        <div className="modal-action justify-center mt-6">
          <form method="dialog">
            <button
              className="btn btn-sm btn-ghost hover:bg-gray-700"
              onClick={onClose}
            >
              ✕ Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}