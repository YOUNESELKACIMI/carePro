import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import useAuth from "../hooks/useContext";
import { Iparam } from "../types/types";
import { Mail, Lock, Loader } from 'lucide-react';

const Login = () => {
  const { currentUser }: Iparam | any = useAuth();
  const { handleLogin, email, setEmail, password, setPassword, err } = useLogin();

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
    return <Navigate to="/chat" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-400">
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to access your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
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
                Sign In
              </button>
              
              <div className="text-center">
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition duration-200"
                >
                  No account yet? Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
