import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import useAuth from "../hooks/useContext";
import { Iparam } from "../types/types";

const Login = () => {
  const { currentUser }: Iparam | any = useAuth();

  const { handleLogin, email, setEmail, password, setPassword, err } =
    useLogin();

  if (currentUser && currentUser == "loading") {
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center justify-center p-8 gap-4"
      >
        <div className="login-title">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <div className="relative ">
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            className="myinput"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            className="myinput"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col items-end gap-4">
          <button type="submit" className="btn w-full sign-in-btn">
            Sign In
          </button>
          <Link
            to={`/forgotpassword`}
            className="small font-bold text-palette3"
          >
            Forgot password?
          </Link>
        </div>
        {err && <div className="text-red-500">{err}</div>}
      </form>
    </div>
  );
};

export default Login;