import useAuth from "./hooks/useContext";
import { IcurrentUser, Iparam } from "./types/types";

const App = () => {
  const { currentUser }: Iparam = useAuth();

  console.log(currentUser);
  return <div>Welcome back, {(currentUser as IcurrentUser).name}</div>;
};

export default App;
