import useAuth from "./hooks/useContext";
import { IcurrentUser} from "./types/types";

const App = () => {
  const { currentUser }: IcurrentUser = useAuth();

  console.log(currentUser)
  return <div>Welcome back, {currentUser?.name}</div>;
};

export default App;
