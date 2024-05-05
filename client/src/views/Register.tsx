import { Navigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import useAuth from "../hooks/useContext";
import { Iparam } from "../types/types";

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
    return <div>Loading...</div>;
  }

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <form
        onSubmit={handleRegistration}
        className="flex flex-col items-center justify-center p-8 gap-4"
      >
        <div className="login-title">
          <h1 className="text-2xl font-bold">Register</h1>
        </div>
        <div className="relative ">
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="myinput"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <div className="relative">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="off"
            className="myinput"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col items-end gap-4">
          <button type="submit" className="btn w-full sign-in-btn">
            Sign In
          </button>
        </div>
        {err && <div className="text-red-500">{err}</div>}
      </form>
    </div>
  );
};

export default Register;
