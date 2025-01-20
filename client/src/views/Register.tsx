import { Link, Navigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import useAuth from "../hooks/useContext";
import { Iparam } from "../types/types";
import { Mail, Lock, User, Loader } from 'lucide-react';

const Register = () => {
  const { currentUser }: Iparam | any = useAuth();
  const {
    handleRegistration,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    err,
  } = useRegister();

  if (currentUser && currentUser == "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          <span className="text-gray-600 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-400">
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join us to find healthcare professionals near you</p>
          </div>
          
          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="off"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="off"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {err && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
                {err}
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
              >
                Create Account
              </button>
              
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition duration-200"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
